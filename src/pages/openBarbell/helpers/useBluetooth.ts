import { useEffect, useCallback, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  obDeviceStatusAtom,
  obConnectedDeviceAtom,
  obScannedDevicesAtom,
} from "./obAtoms";
import * as BLE from "./bluetooth";
import { requestBLEPermissions } from "./obPermissions";
import type { OBDevice } from "../types/obTypes";

export const useBluetooth = (onRepReceived?: (isValid: boolean, repData: number[]) => void) => {
  const [deviceStatus, setDeviceStatus] = useAtom(obDeviceStatusAtom);
  const [connectedDevice, setConnectedDevice] = useAtom(obConnectedDeviceAtom);
  const [scannedDevices, setScannedDevices] = useAtom(obScannedDevicesAtom);
  const cleanupRef = useRef<(() => void) | null>(null);
  const onRepReceivedRef = useRef(onRepReceived);
  onRepReceivedRef.current = onRepReceived;

  useEffect(() => {
    BLE.initBLE();

    cleanupRef.current = BLE.setupBLEListeners({
      onDeviceFound: (name: string, identifier: string) => {
        setScannedDevices((prev) => {
          if (prev.some((d) => d.identifier === identifier)) return prev;
          return [...prev, { name, identifier }];
        });
      },
      onConnected: (identifier: string) => {
        setScannedDevices((prev) => {
          const device = prev.find((d) => d.identifier === identifier);
          if (device) {
            setConnectedDevice(device);
          }
          return prev;
        });
        setDeviceStatus("connected");
      },
      onDisconnected: (_identifier: string) => {
        setConnectedDevice(null);
        setDeviceStatus("disconnected");
      },
      onRepReceived: (isValid: boolean, repData: number[]) => {
        onRepReceivedRef.current?.(isValid, repData);
      },
      onBluetoothStateChange: (isOn: boolean) => {
        if (!isOn) {
          setDeviceStatus("bluetoothOff");
          setConnectedDevice(null);
        } else {
          setDeviceStatus("disconnected");
        }
      },
    });

    return () => {
      cleanupRef.current?.();
    };
  }, []);

  const startScan = useCallback(async () => {
    const granted = await requestBLEPermissions();
    if (!granted) return;

    setScannedDevices([]);
    setDeviceStatus("scanning");
    await BLE.startScan();
  }, []);

  const stopScan = useCallback(async () => {
    await BLE.stopScan();
    setDeviceStatus("disconnected");
  }, []);

  const connect = useCallback(async (device: OBDevice) => {
    setDeviceStatus("connecting");
    try {
      await BLE.connectToDevice(device.identifier);
    } catch {
      setDeviceStatus("disconnected");
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (connectedDevice) {
      await BLE.disconnectDevice(connectedDevice.identifier);
      setConnectedDevice(null);
      setDeviceStatus("disconnected");
    }
  }, [connectedDevice]);

  return {
    deviceStatus,
    connectedDevice,
    scannedDevices,
    startScan,
    stopScan,
    connect,
    disconnect,
  };
};
