import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      // backgroundColor: 'red',
      // width: '100%',
      flexDirection: 'row',
      marginBottom: 10,
    },
    tabItem: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: 80,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: theme.backgroundSecondary,
    },
    tabItemSelected: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: 80,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: theme.textHighlight,
    },
    text: {
      color: theme.text,
      fontSize: 18,
      lineHeight: 30,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    textSelected: {
      color: theme.textHighlight,
      fontSize: 18,
      lineHeight: 30,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
  });
}

export default styles;
