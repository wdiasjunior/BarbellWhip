import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./deviceScannerStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import { useBluetooth } from "../../helpers/useBluetooth";
import type { OBDevice } from "../../types/obTypes";

const STATUS_COLORS: Record<string, string> = {
  disconnected: "#888",
  scanning: "#f5a623",
  connecting: "#f5a623",
  connected: "#4cd964",
  bluetoothOff: "#ff3b30",
};

interface IProps {
  onRepReceived?: (isValid: boolean, repData: number[]) => void;
}

const DeviceScanner = (props: IProps) => {
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage;

  const {
    deviceStatus,
    connectedDevice,
    scannedDevices,
    startScan,
    stopScan,
    connect,
    disconnect,
  } = useBluetooth(props.onRepReceived);

  const isScanning = deviceStatus === "scanning";

  const renderDeviceItem = ({ item }: { item: OBDevice }) => (
    <View style={s.deviceItem}>
      <Text style={s.deviceName}>{item.name}</Text>
      <TouchableOpacity
        style={s.connectButton}
        onPress={() => connect(item)}
      >
        <Text style={s.connectButtonText}>{locale.connectButton}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={s.container}>
      {/* Status indicator */}
      <View style={s.statusContainer}>
        <View style={[s.statusDot, { backgroundColor: STATUS_COLORS[deviceStatus] }]} />
        <Text style={s.statusText}>
          {locale.deviceStatus[deviceStatus]}
        </Text>
      </View>

      {/* Connected device */}
      {connectedDevice && (
        <View style={s.connectedContainer}>
          <Text style={s.connectedDeviceName}>{connectedDevice.name}</Text>
          <TouchableOpacity
            style={s.disconnectButton}
            onPress={disconnect}
          >
            <Text style={s.connectButtonText}>{locale.disconnectButton}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Scan button */}
      {!connectedDevice && (
        <TouchableOpacity
          style={s.scanButton}
          onPress={isScanning ? stopScan : startScan}
        >
          <Text style={s.scanButtonText}>
            {isScanning ? locale.stopScanButton : locale.scanButton}
          </Text>
        </TouchableOpacity>
      )}

      {/* Device list */}
      {!connectedDevice && scannedDevices.length > 0 && (
        <>
          <Text style={s.sectionTitle}>{locale.deviceList}</Text>
          <FlatList
            data={scannedDevices}
            keyExtractor={(item) => item.identifier}
            renderItem={renderDeviceItem}
            scrollEnabled={false}
          />
        </>
      )}

      {/* No devices found */}
      {!connectedDevice && !isScanning && scannedDevices.length === 0 && deviceStatus === "disconnected" && (
        <Text style={s.noDeviceText}>{locale.noDeviceFound}</Text>
      )}
    </View>
  );
};

export default DeviceScanner;
