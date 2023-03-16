import { StyleSheet } from "react-native";

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    title: {
      fontSize: 20,
      color: theme.textHighlight,
    },
    text: {
      fontSize: 20,
      color: theme.text,
    },
  });
}

export default styles;
