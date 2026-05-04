import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.backgroundPrimary,
    },
    removedContainer: {
      opacity: 0.4,
    },
    invalidContainer: {
      opacity: 0.5,
    },
    repNumber: {
      color: theme.textHighlight,
      fontSize: 14,
      fontWeight: "bold",
      width: 30,
    },
    dataCell: {
      flex: 1,
      alignItems: "center",
    },
    dataValue: {
      color: theme.text,
      fontSize: 14,
    },
    dataValueFaded: {
      color: theme.textFaded,
      fontSize: 14,
    },
    dataLabel: {
      color: theme.textFaded,
      fontSize: 10,
      marginTop: 2,
    },
    removeButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });
}

export default styles;
