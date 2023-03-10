import { StyleSheet } from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    setList: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 60,
    },
    inputLabel: {
      color: theme.text,
      fontSize: 16,
      paddingTop: 6,
    },
    weightText: {
      color: theme.textHighlight,
      fontSize: 20,
      lineHeight: 30,
      fontWeight: 'bold',
    },

    input: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: "100%",
      minWidth: "45%",
      borderColor: theme.backgroundSecondary,
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
    inputExerciseVariationName: {
      backgroundColor: theme.backgroundSecondary,
      height: 50,
      width: "80%",
      borderColor: theme.backgroundSecondary,
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

    exerciseItem: {
      paddingBottom: 20,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.textFaded,
    },
    exerciseItemRemoveIconContainer: {
      width: 25,
      height: 25,
      marginLeft: "auto",
    },
    exerciseItemRemoveIcon: {
      color: theme.text,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    col: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    colWeight: {
      flexDirection: "column",
      justifyContent: "flex-start",
      minWidth: "45%",
    },

    AddExerciseButton: {
      flex: 1,
      backgroundColor: theme.active,
      borderRadius: 10,
      marginVertical: 12,
      // marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    AddExerciseButtonText: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 35,
      fontWeight: 'bold',
    },
  });
}

export default styles;
