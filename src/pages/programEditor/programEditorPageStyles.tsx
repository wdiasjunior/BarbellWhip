import { StyleSheet } from "react-native";

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingTop: 12,
    },

    noProgramListTextContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      flex: 1,
    },
    noProgramListText: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "center",
    },

    shadowProp: {
      elevation: 3,
      shadowColor: "#171717",
    },
    FabButton: {
      backgroundColor: theme.active,
      borderRadius: 80,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 20,
      right: 20,
      zIndex: 999999,
    },
    FabButtonText: {
      color: theme.text,
      fontSize: 20,
      lineHeight: 25,
    },

    programList: {
      width: "100%",
      height: "100%",
      flex: 1,
    },
    programItem: {
      marginHorizontal: 20,
      backgroundColor: theme.backgroundSecondary,
      color: theme.text,
      paddingLeft: 15,
      marginVertical: 5,
      borderRadius: 10,
      height: 56,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    programItemSelected: {
      marginHorizontal: 20,
      backgroundColor: theme.active,
      color: theme.text,
      paddingLeft: 15,
      marginVertical: 5,
      borderRadius: 10,
      height: 56,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    programItemText: {
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
    },
    iconRight: {
      width: 36,
      color: theme.text,
    },

    modalContent: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    modalItem: {
      backgroundColor: theme.backgroundSecondary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      width: "100%",
      height: 50,
      marginVertical: 5,
    },
    modalItemText: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
}

export default styles;
