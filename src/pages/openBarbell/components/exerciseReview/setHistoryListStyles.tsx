import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: theme.textHighlight,
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 8,
    },
    sessionContainer: {
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 8,
      marginBottom: 8,
      overflow: "hidden",
    },
    sessionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    sessionDate: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "600",
    },
    setRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: theme.backgroundPrimary,
    },
    setInfo: {
      color: theme.text,
      fontSize: 13,
    },
    setDetail: {
      color: theme.textFaded,
      fontSize: 12,
    },
    repDetailRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingHorizontal: 16,
      paddingVertical: 6,
      backgroundColor: theme.backgroundPrimary,
    },
    repDetailText: {
      color: theme.textFaded,
      fontSize: 11,
    },
    noDataText: {
      color: theme.textFaded,
      fontSize: 14,
      textAlign: "center",
      paddingVertical: 20,
    },
  });
}

export default styles;
