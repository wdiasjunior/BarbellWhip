import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      paddingTop: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: theme.textHighlight,
      fontSize: 20,
      fontWeight: 'bold',
    },
    subtitle: {
      color: theme.text,
      fontSize: 16,
    },
  });
}

export default styles;
