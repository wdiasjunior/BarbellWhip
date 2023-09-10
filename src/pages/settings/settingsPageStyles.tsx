import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingHorizontal: 20,
    },
    title: {
      color: theme.textHighlight,
      fontSize: 20,
      fontWeight: "bold",
    },
    subtitle: {
      color: theme.text,
      fontSize: 16,
      marginTop: 12,
    },
    updateCheckerButton: { // TODO - add proper styling
      justifyContent: "center",
      height: 46,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: theme.textFaded,
    },
    updateCheckerButtonText: {
      fontSize: 16,
      color: theme.text,
    },
  });
}

export default styles;
