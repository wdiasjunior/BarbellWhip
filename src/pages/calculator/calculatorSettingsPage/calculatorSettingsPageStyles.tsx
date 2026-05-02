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
      paddingTop: 22,
      flexDirection: "column",
    },

    switchContainer: {},
    title: {
      fontSize: 20,
      color: theme.textHighlight,
      marginBottom: 20,
      fontWeight: "bold",
    },
    switchLabel: {
      fontSize: 20,
      color: theme.text,
    },
    switchWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 32,
    },

    formulasWrapper: {},
    itemSelect: {
      flexDirection: "row",
      alignItems: "center",
      height: 46,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: theme.placeholderText,
    },
    iconContainer: {
      marginRight: 12,
      width: 20,
    },
    icon: {
      color: theme.textHighlight,
    },
    itemSelectText: {
      fontSize: 16,
      color: theme.text,
    },
  });
}

export default styles;
