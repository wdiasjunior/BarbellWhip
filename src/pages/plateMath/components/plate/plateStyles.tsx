import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    bar: {
      height: 30,
      width: 200,
      borderRadius: 3,
      borderColor: '#bbb',
      borderWidth: 0.5,
      backgroundColor: '#ccc',
      marginRight: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    plate: {
      height: 200,
      width: 30,
      borderRadius: 3,
      borderColor: '#bbb',
      borderWidth: 0.5,
      backgroundColor: '#ccc',
      marginRight: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      backgroundColor: 'transparent',
      // backgroundColor: 'white',
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 16,
      // height: 25,
      width: '100%',
      color: theme.backgroundSecondary,
    }
  });
}

export default styles;

// nord theme
// defaultPlates: Array<{ value: number, quantity: number, plateColor: string}> = [
//   { value: 25, quantity: 10, plateColor: "#FF9999"},
//   { value: 20, quantity: 10, plateColor: "#588dff"},
//   { value: 15, quantity: 2, plateColor: "#FFFF99"},
//   { value: 10, quantity: 2, plateColor: "#7FBF7F"},
//   { value: 5, quantity: 4, plateColor: "#FFFFF"},
//   { value: 2.5, quantity: 2, plateColor: "#FFC0CB"}
// ]
