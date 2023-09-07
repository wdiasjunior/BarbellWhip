import { StyleSheet } from "react-native";

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    text1: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
    },
    text2: {
      color: theme.text,
    },
    containerDrawer: {
      flex: 1,
      backgroundColor: theme.backgroundSecondary,
      justifyContent: "center",
    },
    drawerItemSelected: {
      marginHorizontal: 15,
      marginVertical: 3,
      paddingHorizontal: 15,
      backgroundColor: theme.textHighlight,
      borderRadius: 10,
      height: 40,
      justifyContent: "center",
    },
    drawerItem: {
      marginHorizontal: 15,
      marginVertical: 3,
      paddingHorizontal: 15,
      borderRadius: 10,
      height: 40,
      justifyContent: "center",
    },
    RMReview: {
      color: theme.textHighlight,
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 15,
      marginTop: 8,
      marginBottom: 10,
      paddingBottom: 10,
      borderColor: theme.textFaded,
      borderBottomWidth: 1,
      width: "90%",
    },
    weekSelectorContainer: {
      flex: 1,
    },
    titleWeekDrawer: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 15,
      marginBottom: 10,
    },
    drawerTextSelected: {
      color: theme.backgroundSecondary,
      fontWeight: "bold",
      fontSize: 16,
    },
    drawerText: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 16,
    },
    noActiveProgramTextContainer: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 30,
    },
    noActiveProgramTextTitle: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "center",
    },
    noActiveProgramTextSubtitle: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    }
  });
}

export default styles;
