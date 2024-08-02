import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
    },
    setList: {
      flex: 1,
      paddingTop: 10,
    },
    inputLabel: {
      color: theme.text,
      fontSize: 16,
      paddingTop: 6,
    },
    weightText: {
      color: theme.textHighlight,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
    },
    input: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: "100%",
      minWidth: "45%",
      borderColor: theme.backgroundSecondary,
      borderWidth: 1,
      borderRadius: 12,
      marginVertical: 6,
      padding: 10,
      paddingLeft: 16,
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
    },
    inputExerciseVariationName: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: "90%",
      borderColor: theme.backgroundSecondary,
      borderWidth: 1,
      borderRadius: 12,
      marginVertical: 6,
      padding: 10,
      paddingLeft: 16,
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
    },
    exerciseItem: {
      paddingBottom: 20,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.placeholderText,
    },
    exerciseItemRemoveIconContainer: {
      width: 25,
      height: 25,
    },
    exerciseItemRemoveIcon: {
      color: theme.text,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    col: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    colWeight: {
      flexDirection: "column",
      justifyContent: "flex-start",
      minWidth: "45%",
    },
    AddExerciseButton: {
      flex: 1,
      backgroundColor: theme.active,
      borderRadius: 10,
      marginVertical: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    AddExerciseButtonText: {
      color: theme.statusBar === "dark-content" ? theme.backgroundSecondary : theme.text,
      fontSize: 16,
      lineHeight: 35,
      fontWeight: "bold",
    },
  });
}

export default styles;
