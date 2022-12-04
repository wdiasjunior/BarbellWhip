import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    item: {
      backgroundColor: theme.backgroundSecondary,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 56,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text1: {
      color: theme.text,
      fontSize: 22,
      lineHeight: 30,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    text2: {
      color: theme.text,
    },
  });
}

export default styles;
