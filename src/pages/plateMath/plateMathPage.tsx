import React, { useState, useLayoutEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import Header from "../../sharedComponents/header/header";
import Loading from "../../sharedComponents/loading/loading";
import WeightView from "./components/weightView/weightView";
import NumberInput from "../../sharedComponents/numberInput/numberInput";
import WeightCalc from "./utils/WeightCalc";

import styles from "./plateMathPageStyles";

import { weightConversion } from "../../helpers/weightConversion";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  plateMathPageWeight,
  plateMathWeightUnit,
  plateMathShowBumper,
  plateMathBarWeight,
  plateMathWeightRack,
  plateMathBumperPlatesRack,
  plateMathShowColoredPlates
} from "../../helpers/jotai/atomsWithStorage";

import { useInitialRender } from "../../helpers/useInitialRender";

const PlateMathPage = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [currentWeight, setCurrentWeight] = useAtom<number>(plateMathPageWeight);
  const weightUnit = useAtomValue<boolean>(plateMathWeightUnit); // false == kg == left, true == lbs == right
  const showBumper = useAtomValue<boolean>(plateMathShowBumper);
  const barWeight = useAtomValue<BarWeight>(plateMathBarWeight);
  const weightRack = useAtomValue<WeightRack>(plateMathWeightRack);
  const bumperPlatesRack = useAtomValue<BumperRack>(plateMathBumperPlatesRack);
  const showColoredPlates = useAtomValue<boolean>(plateMathShowColoredPlates);
  const [isModalWeightInputVisible, setModalWeightInputVisible] = useState(false);
  const currentPlates = showBumper
                          ? WeightCalc.getPlates(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"], bumperPlatesRack[weightUnit ? "lbs" : "kg"])
                          : WeightCalc.getPlates(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"]);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header title={selectedLocale.plateMathPage.title} weightRack={true} />
              });
  }

  useLayoutEffect(() => {
    if(isInitialRender) {
      onScreenLoad();
    }
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

	const toggleModal = (weight?: string) => {
    if(typeof weight === "string" || weight instanceof String) {
      const weightUpdated = parseFloat(weight);
      setCurrentWeight(weightUpdated);
    }
    setModalWeightInputVisible(!isModalWeightInputVisible);
  };

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <View style={styles(activeTheme).controlsContainer}>
          {/*<ScrollView style={styles(activeTheme).wrapper} overScrollMode="never">*/}

            <View style={styles(activeTheme).cardIncrement}>
              <View style={styles(activeTheme).rowWrapper}>
                <Text style={styles(activeTheme).title}>{selectedLocale.plateMathPage.weightLabel}</Text>
                <View style={styles(activeTheme).row}>
                  <TouchableOpacity onPress={decrementWeight}>
                    <View style={styles(activeTheme).incrementWrapper}>
                      <Text style={styles(activeTheme).incrementText}>-</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleModal()}>
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

              <WeightView
                plates={currentPlates}
                activeTheme={activeTheme}
                weightUnit={weightUnit ? "lbs" : "kg"}
                showColoredPlates={showColoredPlates}
              />

            </View>

          <NumberInput
            toggleModal={toggleModal}
            inputLabel={weightUnit ? "lbs" : "kg"}
            isModalWeightInputVisible={isModalWeightInputVisible}
            setModalWeightInputVisible={setModalWeightInputVisible}
          />

          {/*</ScrollView>*/}
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default PlateMathPage;
