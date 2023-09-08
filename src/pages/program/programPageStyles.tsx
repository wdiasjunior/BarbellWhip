import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    text1: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
    },
    text2: {
      color: theme.text,
    },
    noActiveProgramTextContainer: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 30,
    },
    noActiveProgramTextTitle: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "center",
    },
    noActiveProgramTextSubtitle: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
  });
}

export default styles;
