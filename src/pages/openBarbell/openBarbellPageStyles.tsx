import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    scrollContent: {
      padding: 20,
    },
    actionsContainer: {
      marginTop: 10,
      gap: 12,
    },
    actionButton: {
      backgroundColor: theme.active,
      paddingVertical: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    actionButtonDisabled: {
      opacity: 0.5,
    },
    actionButtonText: {
      color: theme.backgroundPrimary,
      fontSize: 16,
      fontWeight: "bold",
    },
    actionButtonSecondary: {
      backgroundColor: theme.backgroundSecondary,
      paddingVertical: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    actionButtonSecondaryText: {
      color: theme.textHighlight,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
}

export default styles;
