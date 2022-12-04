import React from "react";
import { Text, View, ActivityIndicator } from 'react-native';

// import styles from './prTrackerPageStyles';

// import { useAtom } from 'jotai';
// import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

const LoadingProgramPage = ({ navigation }) => {

  // const [activeTheme, ] = useAtom(activeThemeAtom);

  // <View style={styles(activeTheme).container}>
  //   <View style={styles(activeTheme).content}>
  //     <Text style={styles(activeTheme).title}>PR Tracker Page</Text>
  //     <Text style={styles(activeTheme).subtitle}>Display some fancy graphs/charts</Text>
  //   </View>
  // </View>
  return (
    <View style={{ backgroundColor: "#171923", flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#ECEFF4" />
    </View>
  );
}

export default LoadingProgramPage;
