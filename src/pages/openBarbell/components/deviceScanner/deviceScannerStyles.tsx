import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    scanButton: {
      backgroundColor: theme.active,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 16,
    },
    scanButtonText: {
      color: theme.backgroundPrimary,
      fontSize: 16,
      fontWeight: "bold",
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    statusText: {
      color: theme.text,
      fontSize: 14,
    },
    sectionTitle: {
      color: theme.textHighlight,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    deviceItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.backgroundSecondary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 8,
    },
    deviceName: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "600",
      flex: 1,
    },
    connectButton: {
      backgroundColor: theme.active,
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    connectButtonText: {
      color: theme.backgroundPrimary,
      fontSize: 13,
      fontWeight: "bold",
    },
    disconnectButton: {
      backgroundColor: theme.inactive,
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    connectedContainer: {
      backgroundColor: theme.backgroundSecondary,
      padding: 16,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    connectedDeviceName: {
      color: theme.textHighlight,
      fontSize: 15,
      fontWeight: "bold",
    },
    noDeviceText: {
      color: theme.textFaded,
      fontSize: 14,
      textAlign: "center",
      marginTop: 12,
    },
  });
}

export default styles;
