import { StyleSheet } from "react-native";

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundSecondary,
      padding: 16,
      borderRadius: 10,
      width: "85%",
      height: 355,
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: theme.textFaded,
      borderBottomWidth: 2,
      height: 50,
      width: "100%",
      marginBottom: 30,
    },
    inputText: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 24,
      lineHeight: 24,
      color: theme.text,
      marginLeft: 25,
    },
    numpad: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
    },
    numpadButton: {
      padding: 10,
      height: 50,
      width: "33%",
    },
    numpadButtonText: {
      textAlign: "center",
      fontSize: 30,
      lineHeight: 30,
      color: theme.text,
    },
    bottomButtonsRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    bottomButtonsText: {
      fontSize: 20,
      color: theme.text,
      marginRight: 30,
    },
    icon: {
      color: theme.text,
    }
  });
}

export default styles;
