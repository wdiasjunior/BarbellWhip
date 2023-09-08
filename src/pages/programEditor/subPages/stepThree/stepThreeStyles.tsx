import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },

    exerciseList: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      justifyContent: "flex-start",
    },
    exerciseItem: {
      backgroundColor: theme.backgroundSecondary,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 56,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    exerciseItemText: {
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
      flex:1
    },
    exerciseItemIcon: {
      color: theme.text,
    },

    AddExerciseButton: {
      flex: 1,
      backgroundColor: theme.active,
      borderRadius: 10,
      marginVertical: 12,
      marginHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    AddExerciseButtonText: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 35,
      fontWeight: "bold",
    },

    RestDayText: {
      color: theme.text,
      fontSize: 20,
      lineHeight: 33,
      fontWeight: "bold",
      marginHorizontal: 20,
      textAlign: "center"
    },

    title: {
      color: theme.textHighlight,
      fontSize: 20,
      fontWeight: "bold",
    },

    modalContent: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    modalItem: {
      backgroundColor: theme.backgroundSecondary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      width: "100%",
      height: 50,
      marginVertical: 5,
    },
    modalItemText: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
}

export default styles;
