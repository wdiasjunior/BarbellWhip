import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingTop: 12,
    },
    shadowProp: {
      elevation: 2,
      shadowColor: '#171717',
      margin: 12,
    },

    programNameTextInput: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      // width: "100%",
      borderColor: theme.backgroundSecondary,
      borderWidth: 1,
      borderRadius: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      padding: 10,
      paddingLeft: 22,
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: 'bold',
    },
    oneRMTextInput: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: "100%",
      borderColor: theme.placeholderText,
      borderWidth: 1,
      borderRadius: 12,
      marginVertical: 6,
      padding: 10,
      paddingLeft: 22,
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: 'bold',
    },
    oneRMNumberInput: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: "80%",
      borderColor: theme.placeholderText,
      borderWidth: 1,
      borderRadius: 12,
      marginVertical: 6,
      alignSelf: 'flex-start',
      padding: 10,
      paddingLeft: 22,
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: 'bold',
    },

    onermItem: {
      backgroundColor: theme.backgroundSecondary,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 150,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    onermItem_InputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    onermItemText: {
      color: theme.text,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: 'bold',
    },
    onermItemIconContainer: {
      width: 30,
      height: 30,
      marginLeft: 'auto',
      marginRight: 10,
    },
    onermItemIcon: {
      color: theme.text,
    },

    AddOneRMButton: {
      backgroundColor: theme.active,
      borderRadius: 10,
      marginVertical: 12,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    AddOneRMButtonText: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 35,
      fontWeight: 'bold',
    },

    weightUnitContainer: {
      backgroundColor: theme.backgroundSecondary,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
      height: 50,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    weightUnitText: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 35,
      fontWeight: 'bold',
    },
  });
}

export default styles;
