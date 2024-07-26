import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    modalContent: {
    },
    container: {
      backgroundColor: theme.backgroundPrimary,
      padding: 30,
      height: 510,
    },
    title: {
      fontWeight: "bold",
      fontSize: 22,
      lineHeight: 22,
      color: theme.text,
      paddingBottom: 10,
    },
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
    buttonRow: {
      flexDirection: "row",
      marginTop: 40,
      justifyContent: "flex-end",
    },
    buttonClose: {
      marginRight: 20,
    },
    buttonOk: {
    },
    buttonOkCloseText: {
      fontWeight: "bold",
      fontSize: 18,
      lineHeight: 22,
      color: theme.text,
    },
  });
}

export default styles;
