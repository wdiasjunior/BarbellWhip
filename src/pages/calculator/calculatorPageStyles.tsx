import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },

    cardWarning: {
      backgroundColor: theme.textHighlight,
      padding: 16,
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 130,
      justifyContent: "center",
      alignItems: "center",
    },
    textWarning: {
      color: theme.backgroundPrimary,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },

    cardIncrement: {
      backgroundColor: theme.backgroundSecondary,
      padding: 22,
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 240,
      justifyContent: "center", // TODO - check this
      alignItems: "center",
      justifyContent: "space-between", // TODO - check this
    },
    title: {
      color: theme.text,
      fontSize: 12,
    },
    rowWrapper: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
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
    repsSets: {
      color: theme.text,
      fontSize: 24,
      margin: 20,
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

    card1RM: {
      backgroundColor: theme.backgroundSecondary,
      padding: 22,
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 10,
      height: "auto",
      flex: 0,
    },
    cardPercentage: {
      backgroundColor: theme.backgroundSecondary,
      padding: 22,
      marginHorizontal: 20,
      marginVertical: 20,
      borderRadius: 10,
      height: "auto",
      flex: 0,
    },
    title1RM: {
      color: theme.textHighlight,
      fontSize: 16,
      fontWeight: "bold",
    },
    card1RMRow1: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      marginTop: 20,
      paddingBottom: 16,
      borderBottomWidth: 2,
      borderColor: theme.textFaded,
    },
    card1RMRow2: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      marginTop: 16,
    },
    card1RMCol: {
      flexDirection: "column",
      alignItems: "center",
    },
    weightTop: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 6,
      color: theme.text,
    },
    card1RMColContentRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    weightBottom: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    weightSubTop: {
      color: theme.text,
    },
    weightSubBottom: {
      marginRight: 10,
      color: theme.text,
    },
    modalContent: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
}

export default styles;
