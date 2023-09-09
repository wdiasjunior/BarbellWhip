import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    modalContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: theme.backgroundPrimary,
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    text: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 24,
      lineHeight: 24,
      color: theme.text,
    },
  });
}

export default styles;
