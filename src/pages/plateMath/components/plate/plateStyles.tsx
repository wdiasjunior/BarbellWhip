import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => {
  return StyleSheet.create({
    bar: {
      height: 30,
      width: 200,
      borderRadius: 3,
      borderColor: "#cccccc",
      borderWidth: 0.5,
      backgroundColor: "#cccccc",
      marginRight: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    plate: {
      height: 200,
      width: 35,
      borderRadius: 3,
      borderColor: "#cccccc",
      borderWidth: 0.5,
      backgroundColor: "#cccccc",
      marginRight: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    bumperPlate: {
      height: 200,
      width: 30,
      borderRadius: 3,
      borderColor: "#8c8c8c",
      borderWidth: 0.5,
      backgroundColor: "#8c8c8c",
      marginRight: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      backgroundColor: "transparent",
      textAlign: "center",
      fontSize: 16,
      lineHeight: 16,
      width: "100%",
      color: theme.statusBar === "light-content" ? theme.backgroundSecondary : theme.text,
    },
  });
}

// TODO - change colors to better match the overall themes (?)
export const plateColors = {
  kg: {
    50   : "#8c8c8c",
    25   : "#FF9999",
    20   : "#588dff",
    15   : "#FFFF99",
    10   : "#7FBF7F",
    5    : "#FFFFFF",
    2.5  : "#FFC0CB",
    2    : "#8c8c8c",
    1.5  : "#8c8c8c",
    1.25 : "#8c8c8c",
    1    : "#8c8c8c",
    0.5  : "#8c8c8c",
  },
  lbs: {
    100  : "#8c8c8c",
    55   : "#FF9999",
    45   : "#588dff",
    35   : "#FFFF99",
    25   : "#7FBF7F",
    10   : "#FFFFFF",
    5    : "#FFC0CB",
    2.5  : "#8c8c8c",
    1.25 : "#8c8c8c",
  }
}
