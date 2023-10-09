import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    header: {
      height: "100%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.backgroundSecondary,
      padding: 0,
      margin: 0,
    },
    contentLeft: {
      alignItems: "center",
    },
    contentRight: {
      width: 30,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    contentCenter: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 20,
      color: theme.text,
      maxWidth: 300,
    },
    iconLeft: {
      left: -2,
      marginRight: 22,
      color: theme.text,
    },
    iconRight: {
      width: 40,
      paddingLeft: 10,
      color: theme.text,
    },
  });
}

export default styles;
