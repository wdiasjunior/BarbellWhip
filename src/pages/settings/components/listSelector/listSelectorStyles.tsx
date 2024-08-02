import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    listSelectorContainer: {
      marginTop: 20,
    },
    listSelectorTitle: {
      color: theme.textHighlight,
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
    },
    listSelectorItem: {
      flexDirection: "row",
      alignItems: "center",
      height: 46,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: theme.placeholderText,
    },
    listSelectorIconContainer: {
      marginRight: 12,
      width: 20,
    },
    listSelectorIcon: {
      color: theme.textHighlight,
    },
    listSelectorItemText: {
      fontSize: 16,
      color: theme.text,
    },
  });
}

export default styles;
