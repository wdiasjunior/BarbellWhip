import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    header: {
      height: "100%",
      width: "100%",
      // flex: 1,
      flexDirection: "row",
      // justifyContent:  "center",
      // justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.backgroundSecondary,
      padding: 0,
      margin: 0,
    },
    contentLeft: {
      alignItems: "center",
    },
    contentRight: {
      width: "85%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 20,
      color: theme.text,
    },
    iconLeft: {
      // position: "absolute",
      left: -2,
      marginRight: 22,
      color: theme.text,
    },
    iconRight: {
      // position: "absolute",
      right: -10,
      width: 40,
      // backgroundColor: 'red',
      // marginRight: "auto",
      paddingLeft: 10,
      color: theme.text,
    },
  });
}

export default styles;
