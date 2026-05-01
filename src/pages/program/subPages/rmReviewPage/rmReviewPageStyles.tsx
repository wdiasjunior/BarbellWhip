import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    wrapper: {
      flex: 1,
      paddingTop: 10,
    },
    item: {
      backgroundColor: theme.backgroundSecondary,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 80,
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    title: {
      color: theme.text,
      fontSize: 28,
      lineHeight: 32,
      fontWeight: "bold",
      marginRight: 12,
    },
    weight: {
      color: theme.textHighlight,
      fontSize: 28,
      lineHeight: 32,
      fontWeight: "bold",
    },
  });
}

export default styles;
