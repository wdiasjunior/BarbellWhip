import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    // container: {
    //   backgroundColor: "#000",
    //   flex: 1,
    // },
    plateWrap: {
      height: '75%',
      paddingTop: 45,
      // marginTop: 10,
      marginBottom: 40,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // transform: [ { rotate: '-90deg' } ],
    },
  });
}

export default styles;
