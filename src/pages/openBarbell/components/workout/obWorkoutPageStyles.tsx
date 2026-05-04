import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    listContent: {
      padding: 16,
      paddingBottom: 100,
    },
    sectionTitle: {
      color: theme.textHighlight,
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 8,
      marginTop: 12,
      textTransform: "uppercase",
    },
    bottomBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.backgroundSecondary,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      gap: 12,
    },
    newSetButton: {
      flex: 1,
      backgroundColor: theme.active,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    newSetButtonText: {
      color: theme.backgroundPrimary,
      fontSize: 14,
      fontWeight: "bold",
    },
    endWorkoutButton: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.active,
    },
    endWorkoutButtonText: {
      color: theme.active,
      fontSize: 14,
      fontWeight: "bold",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    startButton: {
      backgroundColor: theme.active,
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 8,
    },
    startButtonText: {
      color: theme.backgroundPrimary,
      fontSize: 18,
      fontWeight: "bold",
    },
    restTimerContainer: {
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    restTimerText: {
      color: theme.textHighlight,
      fontSize: 20,
      fontWeight: "bold",
    },
    restTimerLabel: {
      color: theme.textFaded,
      fontSize: 12,
    },
  });
}

export default styles;
