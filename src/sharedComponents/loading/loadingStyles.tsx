import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundPrimary,
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  });
}

export default styles;
