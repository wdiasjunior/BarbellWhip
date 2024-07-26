import { StyleSheet } from "react-native";

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.backgroundPrimary,
    },
    AddWeekButton: {
      backgroundColor: theme.active,
      borderRadius: 10,
      marginVertical: 12,
      marginHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    AddWeekButtonText: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 35,
      fontWeight: "bold",
    },
    weekList: {
      width: "100%",
      height: "100%",
      paddingTop: 12,
      flex: 1,
    },
    weekItem: {
      backgroundColor: theme.backgroundSecondary,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 56,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    weekItemSelected: {
      backgroundColor: theme.active,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 56,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    weekItemText: {
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
    },
    weekSelectedItemText: {
      color: theme.backgroundSecondary,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
    },
    weekItemIconContainer: {
      width: 20,
      height: 20,
    },
    weekItemIcon: {
      color: theme.text,
    },
    title: {
      color: theme.textHighlight,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
  });
}

export default styles;
