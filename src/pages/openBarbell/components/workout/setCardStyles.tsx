import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 8,
      marginBottom: 12,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerTitle: {
      color: theme.textHighlight,
      fontSize: 16,
      fontWeight: "bold",
    },
    headerSummary: {
      color: theme.textFaded,
      fontSize: 13,
    },
    formContainer: {
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    formRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 10,
    },
    inputContainer: {
      flex: 1,
    },
    inputLabel: {
      color: theme.textFaded,
      fontSize: 12,
      marginBottom: 4,
    },
    textInput: {
      backgroundColor: theme.backgroundPrimary,
      color: theme.text,
      fontSize: 15,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
    },
    repsContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.backgroundPrimary,
    },
    repsHeader: {
      flexDirection: "row",
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    repsHeaderLabel: {
      flex: 1,
      textAlign: "center",
      color: theme.textFaded,
      fontSize: 11,
      fontWeight: "bold",
    },
    repsHeaderFirst: {
      width: 30,
      textAlign: "left",
    },
    noRepsText: {
      color: theme.textFaded,
      fontSize: 13,
      textAlign: "center",
      paddingVertical: 16,
    },
    todoContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: theme.backgroundPrimary,
    },
    todoText: {
      color: theme.textFaded,
      fontSize: 11,
      fontStyle: "italic",
    },
    collapsedSummary: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    summaryChip: {
      color: theme.text,
      fontSize: 13,
    },
  });
}

export default styles;
