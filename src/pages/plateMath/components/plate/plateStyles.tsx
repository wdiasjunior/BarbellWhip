import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => {
  return StyleSheet.create({
    bar: {
      height: 30,
      width: 200,
      borderRadius: 3,
      borderColor: "#A0AEC0",
      borderWidth: 0.5,
      backgroundColor: "#A0AEC0",
      marginRight: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    plate: {
      height: 200,
      width: 35,
      borderRadius: 3,
      borderColor: "#A0AEC0",
      borderWidth: 0.5,
      backgroundColor: "#A0AEC0",
      marginRight: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    bumperPlate: {
      height: 200,
      width: 30,
      borderRadius: 3,
      borderColor: "#4A5568",
      borderWidth: 0.5,
      backgroundColor: "#4A5568",
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

export const plateColors = {
  kg: {
    50   : "#4A5568",
    25   : "#DC6B6B",
    20   : "#5A96D4",
    15   : "#E2CC5C",
    10   : "#52B87A",
    5    : "#E2E8F0",
    2.5  : "#CC6E76",
    2    : "#A0AEC0",
    1.5  : "#A0AEC0",
    1.25 : "#A0AEC0",
    1    : "#A0AEC0",
    0.5  : "#A0AEC0",
  },
  lbs: {
    100  : "#4A5568",
    55   : "#DC6B6B",
    45   : "#5A96D4",
    35   : "#E2CC5C",
    25   : "#52B87A",
    10   : "#E2E8F0",
    5    : "#CC6E76",
    2.5  : "#A0AEC0",
    1.25 : "#A0AEC0",
  }
}
