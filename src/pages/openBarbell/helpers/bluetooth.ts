import { NativeModules, NativeEventEmitter, Platform } from "react-native";
import BleManager from "react-native-ble-manager";
import * as RepDataMap from "./repDataMap";

const BleManagerModule = NativeModules.BleManager;
const bleEmitter = new NativeEventEmitter(BleManagerModule);

const SERVICE_UUID = "2220";
const CHARACTERISTIC_UUID = "2221";

export interface BLECallbacks {
  onDeviceFound: (name: string, identifier: string) => void;
  onConnected: (identifier: string) => void;
  onDisconnected: (identifier: string) => void;
  onRepReceived: (isValid: boolean, repData: number[]) => void;
  onBluetoothStateChange: (isOn: boolean) => void;
}

let repData: number[] = [];
let endBulkDataWasReceived = false;
let listeners: ReturnType<typeof bleEmitter.addListener>[] = [];

const resetRep = () => {
  repData.length = 0;
  endBulkDataWasReceived = false;
};

const queuedDataIsCorrupted = (data: number[]): boolean => {
  if (data.length > 1) return true;
  if (data.length === 1) {
    return !RepDataMap.START_FLAGS.includes(data[0]);
  }
  return false;
};

export const initBLE = async (): Promise<void> => {
  try {
    await BleManager.start({ showAlert: false });
  } catch (error) {
    console.error("BLE init error:", error);
  }
};

export const setupBLEListeners = (callbacks: BLECallbacks): (() => void) => {
  // Clean up any existing listeners
  removeListeners();

  listeners = [
    bleEmitter.addListener("BleManagerDiscoverPeripheral", (args) => {
      if (args.name) {
        callbacks.onDeviceFound(args.name, args.id);
      }
    }),

    bleEmitter.addListener("BleManagerDidUpdateState", (args) => {
      callbacks.onBluetoothStateChange(args.state === "on");
    }),

    bleEmitter.addListener("BleManagerDisconnectPeripheral", (args) => {
      callbacks.onDisconnected(args.peripheral);
    }),

    bleEmitter.addListener("BleManagerConnectPeripheral", async (args) => {
      try {
        await BleManager.retrieveServices(args.peripheral);
        await BleManager.startNotification(args.peripheral, SERVICE_UUID, CHARACTERISTIC_UUID);
        callbacks.onConnected(args.peripheral);
      } catch (error) {
        console.error("Error setting up BLE service after connect:", error);
      }
    }),

    bleEmitter.addListener("BleManagerDidUpdateValueForCharacteristic", (args) => {
      const data = new Float32Array(new Uint8Array(args.value).buffer)[0];

      // Start flag received — check if previous data was corrupted
      if (RepDataMap.START_FLAGS.includes(data)) {
        if (queuedDataIsCorrupted(repData)) {
          callbacks.onRepReceived(RepDataMap.isValidData(repData), [...repData]);
        }
        resetRep();
      }

      repData.push(data);

      // After end bulk data flag, next value is battery — rep is complete
      if (endBulkDataWasReceived) {
        callbacks.onRepReceived(RepDataMap.isValidData(repData), [...repData]);
        resetRep();
      } else {
        endBulkDataWasReceived = data === RepDataMap.END_BULK_FLAG;
      }
    }),
  ];

  return removeListeners;
};

const removeListeners = () => {
  listeners.forEach((l) => l.remove());
  listeners = [];
};

export const startScan = async (): Promise<void> => {
  try {
    await BleManager.scan([SERVICE_UUID], 30, false);
  } catch (error) {
    console.error("BLE scan error:", error);
  }
};

export const stopScan = async (): Promise<void> => {
  try {
    await BleManager.stopScan();
  } catch (error) {
    console.error("BLE stop scan error:", error);
  }
};

export const connectToDevice = async (identifier: string): Promise<void> => {
  try {
    await BleManager.connect(identifier);
  } catch (error) {
    console.error("BLE connect error:", error);
    throw error;
  }
};

export const disconnectDevice = async (identifier: string): Promise<void> => {
  try {
    await BleManager.disconnect(identifier);
  } catch (error) {
    console.error("BLE disconnect error:", error);
  }
};

export const getDeviceVersion = (deviceName: string): number => {
  if (deviceName.length >= 4) {
    const versionChar = deviceName.charAt(3);
    const version = parseInt(versionChar, 10);
    if (version >= 1 && version <= 3) return version;
  }
  return 1;
};
