import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    plateWrap: {
      height: "75%",
      paddingTop: 45,
      marginBottom: 40,
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
}

export default styles;
