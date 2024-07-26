import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    modalContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: theme.backgroundPrimary,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: 180,
    },
    text: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 22,
      lineHeight: 22,
      color: theme.text,
    },
    spinner: {
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
      marginLeft: 12,
      top: -2,
      position: "relative",
    },
    row: {
      flexDirection: "row",
    },
    buttonRow: {
      flexDirection: "row",
      marginTop: 40,
      justifyContent: "flex-end",
    },
    buttonClose: {
      marginLeft: 30,
    },
    button: {
    },
  });
}

export default styles;
