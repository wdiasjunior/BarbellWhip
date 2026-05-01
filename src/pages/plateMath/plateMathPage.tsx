import React, { useState, useMemo, useLayoutEffect } from "react";
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
  plateMathPageWeightAtom,
  plateMathWeightUnitAtom,
  plateMathShowBumperAtom,
  plateMathBarWeightAtom,
  plateMathWeightRackAtom,
  plateMathBumperPlatesRackAtom,
  plateMathShowColoredPlatesAtom
} from "../../helpers/jotai/atoms";

import { useInitialRender } from "../../helpers/useInitialRender";

const PlateMathPage = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [currentWeight, setCurrentWeight] = useAtom<number>(plateMathPageWeightAtom);
  const weightUnit = useAtomValue<boolean>(plateMathWeightUnitAtom); // false == kg == left, true == lbs == right
  const showBumper = useAtomValue<boolean>(plateMathShowBumperAtom);
  const barWeight = useAtomValue<BarWeight>(plateMathBarWeightAtom);
  const weightRack = useAtomValue<WeightRack>(plateMathWeightRackAtom);
  const bumperPlatesRack = useAtomValue<BumperRack>(plateMathBumperPlatesRackAtom);
  const showColoredPlates = useAtomValue<boolean>(plateMathShowColoredPlatesAtom);
  const [isModalWeightInputVisible, setModalWeightInputVisible] = useState(false);
  const closestAvailableWeight = WeightCalc.getClosestAvailableWeight(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"]);
  const currentPlates = showBumper
                          ? WeightCalc.getPlates(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"], bumperPlatesRack[weightUnit ? "lbs" : "kg"])
                          : WeightCalc.getPlates(currentWeight, barWeight[weightUnit ? "lbs" : "kg"], weightRack[weightUnit ? "lbs" : "kg"]);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const onScreenLoad = () => {
    navigation.setOptions({
      headerTitle: () =>
        <Header title={selectedLocale.plateMathPage.title} weightRack={true} />
    });
  }

  useLayoutEffect(() => {
    if (isInitialRender) {
      onScreenLoad();
    }
  }, [])

  const decrementWeight = () => {
    if ((currentWeight - 5) < 0) {
      setCurrentWeight(0);
    } else {
      setCurrentWeight(currentWeight - 5);
    }
  }

  const incrementWeight = () => {
    if ((currentWeight + 5) > 2000) {
      setCurrentWeight(2000);
    } else {
      setCurrentWeight(currentWeight + 5);
    }
  }

	const toggleModal = (weight?: string) => {
    if (typeof weight === "string" || weight instanceof String) {
      const weightUpdated = parseFloat(weight);
      setCurrentWeight(weightUpdated);
    }
    setModalWeightInputVisible(!isModalWeightInputVisible);
  }

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <View style={s.controlsContainer}>
          <View style={s.cardIncrement}>
            <View style={s.rowWrapper}>
              <Text style={s.title}>{selectedLocale.plateMathPage.weightLabel}</Text>
              <View style={s.row}>
                <TouchableOpacity onPress={decrementWeight}>
                  <View style={s.incrementWrapper}>
                    <Text style={s.incrementText}>-</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Text style={s.weight}>{currentWeight} {weightUnit ? "lbs" : "kg"}</Text>
                  <Text style={s.weightConverted}>{weightConversion(currentWeight, !weightUnit)} {!weightUnit ? "lbs" : "kg"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={incrementWeight}>
                  <View style={s.incrementWrapper}>
                    <Text style={s.incrementText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={s.info}>{selectedLocale.plateMathPage.currentBarWeightLabel}:
              <Text style={s.infoWeight}> {barWeight[weightUnit ? "lbs" : "kg"]}{weightUnit ? "lbs" : "kg"}</Text>
            </Text>
          </View>

          {currentWeight > closestAvailableWeight ? (
            <View style={s.cardWarning}>
              <Text style={s.textWarning}>{selectedLocale.plateMathPage.textWarning}</Text>
            </View>
          ) : null}

          <WeightView
            plates={currentPlates}
            activeTheme={activeTheme}
            weightUnit={weightUnit ? "lbs" : "kg"}
            showColoredPlates={showColoredPlates}
          />

          <NumberInput
            toggleModal={toggleModal}
            inputLabel={weightUnit ? "lbs" : "kg"}
            isModalWeightInputVisible={isModalWeightInputVisible}
            setModalWeightInputVisible={setModalWeightInputVisible}
          />
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default PlateMathPage;
