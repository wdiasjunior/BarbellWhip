import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    scrollContent: {
      padding: 16,
    },
    noDataContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    noDataText: {
      color: theme.textFaded,
      fontSize: 16,
      textAlign: "center",
    },
  });
}

export default styles;
