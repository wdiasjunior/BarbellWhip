import React, { useMemo, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Loading from "../../sharedComponents/loading/loading";
import DeviceScanner from "./components/deviceScanner/deviceScanner";

import { useInitialRender } from "../../helpers/useInitialRender";

import styles from "./openBarbellPageStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atoms";
import { obDeviceStatusAtom, obActiveWorkoutAtom } from "./helpers/obAtoms";

const OpenBarbellPage = ({ navigation }) => {
  const isInitialRender = useInitialRender();
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const deviceStatus = useAtomValue(obDeviceStatusAtom);
  const activeWorkout = useAtomValue(obActiveWorkoutAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="menu-sharp"
          size={24}
          color={activeTheme.text}
          style={{ marginLeft: 16, marginRight: 16 }}
          onPress={() => navigation.getParent()?.openDrawer()}
        />
      ),
    });
  }, [navigation, activeTheme]);

  const isConnected = deviceStatus === "connected";

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <ScrollView contentContainerStyle={s.scrollContent}>
          <DeviceScanner />

          {/* Action buttons */}
          <View style={s.actionsContainer}>
            {/* Start / Resume Workout */}
            <TouchableOpacity
              style={[s.actionButton, !isConnected && s.actionButtonDisabled]}
              onPress={() => navigation.navigate("OBWorkout")}
              disabled={!isConnected && !activeWorkout}
            >
              <Ionicons name="barbell-sharp" size={24} color={activeTheme.backgroundPrimary} />
              <Text style={s.actionButtonText}>
                {activeWorkout ? locale.workout.title : locale.workout.startWorkout}
              </Text>
            </TouchableOpacity>

            {/* Exercise Review */}
            <TouchableOpacity
              style={s.actionButtonSecondary}
              onPress={() => navigation.navigate("OBExerciseReview")}
            >
              <Ionicons name="stats-chart" size={24} color={activeTheme.textHighlight} />
              <Text style={s.actionButtonSecondaryText}>
                {locale.exerciseReview.title}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default OpenBarbellPage;
