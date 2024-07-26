import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    wrapper: {
      flex: 1,
      paddingHorizontal: 22,
    },
    title: {
      fontSize: 20,
      color: theme.textHighlight,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      flexDirection: "column",
    },
    inputGroup: {
      flex: 1,
      width: "100%",
      paddingVertical: 22,
      borderColor: theme.textFaded,
      borderBottomWidth: 1,
    },
    inputGroupSwitches: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      paddingVertical: 22,
      borderColor: theme.textFaded,
      borderBottomWidth: 1,
    },
    inputGroupSwitch: {
    },
    inputGroupLast: {
      flex: 1,
      width: "100%",
      paddingVertical: 22,
    },
    inputGroupTitle: {
      fontSize: 20,
      color: theme.textHighlight,
      marginBottom: 20,
      fontWeight: "bold",
    },
    inputLabel: {
      fontSize: 20,
      color: theme.text,
      minWidth: 47,
    },
    switchLabel: {
      fontSize: 20,
      color: theme.text,
    },
    inputWeightRackRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    inputWeightRackColumn: {
      flexDirection: "column",
    },
    shadowProp: {
      elevation: 2,
      shadowColor: "#171717",
    },
    input: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: 60,
      borderColor: theme.backgroundSecondary,
      borderWidth: 1,
      borderRadius: 15,
      padding: 10,
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}

export default styles;
