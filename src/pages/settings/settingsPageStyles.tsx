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
    weightRoundingTextContainer: {
      flex: 1,
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
    updateCheckerButton: {
      color: theme.text,
      justifyContent: "center",
      height: 46,
      marginTop: 20,
      marginBottom: 6,
    },
    appVersionText: {
      fontSize: 14,
      color: theme.text,
    },
    updateCheckerButtonText: {
      fontSize: 18,
      color: theme.text,
      fontWeight: "bold",
    },
  });
}

export default styles;
