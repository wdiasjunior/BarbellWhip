import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    rowContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    title: {
      color: theme.textHighlight,
      fontSize: 20,
      fontWeight: "bold",
    },
    subtitle: {
      color: theme.text,
      fontSize: 16,
    },
  });
}

export default styles;
