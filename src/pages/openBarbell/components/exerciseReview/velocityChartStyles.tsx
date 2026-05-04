import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    title: {
      color: theme.textHighlight,
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 12,
    },
    noDataText: {
      color: theme.textFaded,
      fontSize: 13,
      textAlign: "center",
      paddingVertical: 20,
    },
  });
}

export default styles;
