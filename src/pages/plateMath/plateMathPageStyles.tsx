import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    wrapper: {
      flex: 1,
    },
    controlsContainer: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    cardIncrement: {
      backgroundColor: theme.backgroundSecondary,
      padding: 22,
      borderRadius: 10,
      height: 500,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      color: theme.text,
      fontSize: 12,
    },
    bumperLabel: {
      color: theme.text,
      fontSize: 16,
      marginTop: 20,
    },
    rowWrapper: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
    },
    incrementWrapper: {
      width: 60,
      height: 60,
      backgroundColor: theme.backgroundSecondary,
      borderColor: theme.active,
      borderWidth: 2,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    incrementText: {
      color: theme.text,
      fontSize: 16,
    },
    weight: {
      color: theme.text,
      fontSize: 24,
      textAlign: "center",
    },
    weightConverted: {
      color: theme.text,
      fontSize: 12,
      textAlign: "center",
    },
    info: {
      color: theme.text,
      fontSize: 18,
      marginBottom: 10,
      textAlign: "center",
    },
    infoWeight: {
      color: theme.textHighlight,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    cardWarning: {
      backgroundColor: theme.textHighlight,
      padding: 16,
      marginBottom: 20,
      borderRadius: 10,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    textWarning: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    modalContent: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
}

export default styles;
