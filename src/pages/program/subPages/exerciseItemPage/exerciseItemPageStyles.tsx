import { StyleSheet } from "react-native";

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingHorizontal: 20,
    },
    content: {
      flex: 1,
      paddingTop: 10,
    },
    setList: {
      flex: 1,
      paddingTop: 10,
    },
    setListItem: {
      paddingBottom: 20,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.textFaded,
    },
    setListItemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    title: {
      color: theme.textHighlight,
      fontSize: 26,
      fontWeight: "bold",
      paddingBottom: 8,
    },
    label: {
      color: theme.text,
      fontSize: 16,
      marginTop: 8,
    },
    data: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
    },
    weightText: {
      color: theme.textHighlight,
      fontSize: 24,
      fontWeight: "bold",
    },
    description: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
}

export default styles;
