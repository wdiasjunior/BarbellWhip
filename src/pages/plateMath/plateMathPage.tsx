import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Text, View, FlatList, Button, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Modal from "react-native-modal";

import Header from "../../sharedComponents/header/header";
import WeightView from "./components/weightView/weightView";
import NumberInput from "../../sharedComponents/numberInput/numberInput";
import WeightCalc from "./utils/WeightCalc";

import styles from "./plateMathPageStyles";

import { weightConversion } from "../../helpers/weightConversion";

import { useAtom } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  plateMathPageWeight,
  plateMathWeightUnit,
  plateMathShowBumper,
  plateMathBarWeight,
  plateMathWeightRack,
  plateMathBumperPlatesRack,
} from "../../helpers/jotai/atomsWithStorage";

const PlateMathPage = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);
  const [currentWeight, setCurrentWeight] = useAtom(plateMathPageWeight);
  const [weightUnit, setWeightUnit] = useAtom(plateMathWeightUnit); // false == kg == left, true == lbs == right
  const [showBumper, setShowBumper] = useAtom(plateMathShowBumper);
  const [barWeight, ] = useAtom(plateMathBarWeight);
  const [weightRack, ] = useAtom(plateMathWeightRack);
  const [bumperPlatesRack, ] = useAtom(plateMathBumperPlatesRack);
  const [isModalWeightInputVisible, setModalWeightInputVisible] = useState(false);
  const currentPlates = showBumper ? WeightCalc.getPlates(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"], bumperPlatesRack[weightUnit ? "lbs" : "kg"]) : WeightCalc.getPlates(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"]);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header title={selectedLocale.plateMathPage.title} weightRack={true} />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  const decrementWeight = () => {
    if((currentWeight - 5) < 0) {
      setCurrentWeight(0);
    } else {
      setCurrentWeight(currentWeight - 5);
    }
  }

  const incrementWeight = () => {
    if((currentWeight + 5) > 2000) {
      setCurrentWeight(2000);
    } else {
      setCurrentWeight(currentWeight + 5);
    }
  }

	const toggleModal = (weight: string) => {
    if(typeof weight === "string" || weight instanceof String) {
      const weightUpdated = parseFloat(weight);
      setCurrentWeight(weightUpdated);
    }
    setModalWeightInputVisible(!isModalWeightInputVisible);
  };

  // TODO
  // juggernaut plate math page structure
  // weight unit toggle
  // weight input
  // bar input (make plate rack input priority?)
  // smallest plates input
  //
  // plate view
  // total weight
  // (bar weight + plates weight)
  // color coded plates? toggle to turn it on and off?

  return (
    <ScrollView style={styles(activeTheme).container} overScrollMode="never">
      <View style={styles(activeTheme).controlsContainer}>

        <View style={styles(activeTheme).cardIncrement}>
          <View style={styles(activeTheme).rowWrapper}>
            <Text style={styles(activeTheme).title}>{selectedLocale.plateMathPage.weightLabel}</Text>
            <View style={styles(activeTheme).row}>
              <TouchableOpacity onPress={decrementWeight}>
                <View style={styles(activeTheme).incrementWrapper}>
                  <Text style={styles(activeTheme).incrementText}>-</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles(activeTheme).weight}>{currentWeight} {weightUnit ? "lbs" : "kg"}</Text>
                <Text style={styles(activeTheme).weightConverted}>{weightConversion(currentWeight, !weightUnit)} {!weightUnit ? "lbs" : "kg"}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={incrementWeight}>
                <View style={styles(activeTheme).incrementWrapper}>
                  <Text style={styles(activeTheme).incrementText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles(activeTheme).info}>{selectedLocale.plateMathPage.currentBarWeightLabel}:
            <Text style={styles(activeTheme).infoWeight}> {barWeight[weightUnit ? "lbs" : "kg"]}{weightUnit ? "lbs" : "kg"}</Text>
          </Text>
          {/*<Text style={styles(activeTheme).info}>Current Weight on the Bar:
            <Text style={styles(activeTheme).infoWeight}> {WeightCalc.getClosestAvailableWeight(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"])}{weightUnit}</Text>
          </Text>*/}

          <Text style={styles(activeTheme).bumperLabel}>{selectedLocale.plateMathPage.bumperToggleLabel}</Text>
          <Switch
            trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setShowBumper}
            value={showBumper}
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginTop: 10, }}
          />
        </View>
      </View>

      <WeightView
        weightRack={weightRack[weightUnit ? "lbs" : "kg"]}
        barWeight={barWeight[weightUnit ? "lbs" : "kg"]}
        weight={currentWeight}
        plates={currentPlates}
        activeTheme={activeTheme}
        bumperRack={bumperPlatesRack[weightUnit ? "lbs" : "kg"]}
        weightUnit={weightUnit ? "lbs" : "kg"}
      />

      <Modal
        isVisible={isModalWeightInputVisible}
        onBackButtonPress={() => setModalWeightInputVisible(false)}
        onBackdropPress={() => setModalWeightInputVisible(false)}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationInTiming={100}
        animationOutTiming={1}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={1}
      >
        <View style={styles(activeTheme).modalContent}>
          <NumberInput weightUnit={weightUnit ? "lbs" : "kg"} toggleModal={toggleModal} inputLabel={weightUnit ? "lbs" : "kg"}/>
        </View>
      </Modal>

    </ScrollView>
  );
}

export default PlateMathPage;
