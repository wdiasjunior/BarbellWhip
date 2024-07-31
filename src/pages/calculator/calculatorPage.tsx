import React, { useState, useLayoutEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import oneRMCalc from "./math";
import styles from "./calculatorPageStyles";
import NumberInput from "../../sharedComponents/numberInput/numberInput";
import Header from "../../sharedComponents/header/header";
import Loading from "../../sharedComponents/loading/loading";

import { weightConversion } from "../../helpers/weightConversion";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  calculatorPageRepsAtom,
  calculatorPageWeightAtom,
  calculatorPageWeightUnitAtom,
  settingsPage1RMFormulasAtom,
} from "../../helpers/jotai/atoms";

import { useInitialRender } from "../../helpers/useInitialRender";

const CalculatorPage = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [repsPerformed, setRepsPerformed] = useAtom<number>(calculatorPageRepsAtom);
  const [weightLifted, setWeightLifted] = useAtom<number>(calculatorPageWeightAtom);
  const weightUnit = useAtomValue<string>(calculatorPageWeightUnitAtom);
  const RMFormulas = useAtomValue(settingsPage1RMFormulasAtom);
  const [inputLabel, setInputLabel] = useState("");
  const [isModalWeightInputVisible, setModalWeightInputVisible] = useState(false);

  const rmCol1 = [2, 3, 4, 5, 6, 7];
  const rmCol2 = [8, 9, 10, 11, 12, 15];
  const percentCol1 = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7];
  const percentCol2 = [0.65, 0.6, 0.55, 0.5, 0.45, 0.4];
  const percentLabel = (i) => i.toFixed(2).toString().replace("0.", "");

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={selectedLocale.calculatorPage.title}
                    menu={false}
                  />
              });
  }

  useLayoutEffect(() => {
    if(isInitialRender) {
      onScreenLoad();
    }
  }, [])

  const decrementReps = () => {
    if(repsPerformed > 1) {
      setRepsPerformed(repsPerformed - 1);
    }
  }

  const incrementReps = () => {
    if(repsPerformed < 20) {
      setRepsPerformed(repsPerformed + 1);
    }
  }

  const decrementWeight = () => {
    if((weightLifted - 5) < 0) {
      setWeightLifted(0);
    } else {
      setWeightLifted(weightLifted - 5);
    }
  }

  const incrementWeight = () => {
    if((weightLifted + 5) > 2000) {
      setWeightLifted(2000);
    } else {
      setWeightLifted(weightLifted + 5);
    }
  }

  const toggleModal = (value: string, label: string) => {
    if(label == "REPS") {
      if(typeof value === "string" || value instanceof String) {
        const repsUpdated = parseInt(value);
        if(value !== "0" && parseInt(value) <= 20) {
          setRepsPerformed(repsUpdated);
        }
        setInputLabel("REPS");
      }
    } else {
      if(typeof value === "string" || value instanceof String) {
        const weightUpdated = parseFloat(value);
        if(value !== "0" && parseFloat(value) <= 2000) {
          setWeightLifted(weightUpdated);
        }
        setInputLabel(weightUnit);
      }
    }
    setModalWeightInputVisible(!isModalWeightInputVisible);
  }

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <ScrollView overScrollMode="never">

          <View style={styles(activeTheme).cardIncrement}>

            <View style={styles(activeTheme).rowWrapper}>
              <Text style={styles(activeTheme).title}>{selectedLocale.calculatorPage.weightLifted}</Text>
              <View style={styles(activeTheme).row}>
                <TouchableOpacity onPress={decrementWeight}>
                  <View style={styles(activeTheme).incrementWrapper}>
                    <Text style={styles(activeTheme).incrementText}>-</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleModal("0", weightUnit)}>
                  <Text style={styles(activeTheme).weight}>{weightLifted} {weightUnit}</Text>
                  <Text style={styles(activeTheme).weightConverted}>{weightConversion(weightLifted, weightUnit === "kg")} {weightUnit === "kg" ? "lbs" : "kg"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={incrementWeight}>
                  <View style={styles(activeTheme).incrementWrapper}>
                    <Text style={styles(activeTheme).incrementText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles(activeTheme).rowWrapper}>
              <Text style={styles(activeTheme).title}>{selectedLocale.calculatorPage.repsPerformed}</Text>
              <View style={styles(activeTheme).row}>
                <TouchableOpacity onPress={decrementReps}>
                  <View style={styles(activeTheme).incrementWrapper}>
                    <Text style={styles(activeTheme).incrementText}>-</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleModal("0", "REPS")}>
                  <Text style={styles(activeTheme).repsSets}>{repsPerformed}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={incrementReps}>
                  <View style={styles(activeTheme).incrementWrapper}>
                    <Text style={styles(activeTheme).incrementText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {repsPerformed > 12 ? (
            <View style={styles(activeTheme).cardWarning}>
              <Text style={styles(activeTheme).textWarning}>{selectedLocale.calculatorPage.textWarning}</Text>
            </View>
          ) : null}

          <View style={styles(activeTheme).card1RM}>
            <Text style={styles(activeTheme).title1RM}>{selectedLocale.calculatorPage.rmTitle}</Text>

            <View style={styles(activeTheme).card1RMRow1}>
              <View style={styles(activeTheme).card1RMCol}>
                <Text style={styles(activeTheme).weightTop}>{oneRMCalc(weightLifted, repsPerformed, 1, RMFormulas)} {weightUnit}</Text>
                <Text style={styles(activeTheme).weightSubTop}>1RM</Text>
              </View>
              <View style={styles(activeTheme).card1RMCol}>
                <Text style={styles(activeTheme).weightTop}>{oneRMCalc(weightLifted, repsPerformed, 5, RMFormulas)} {weightUnit}</Text>
                <Text style={styles(activeTheme).weightSubTop}>5RM</Text>
              </View>
            </View>

            <View style={styles(activeTheme).card1RMRow2}>
              <View style={styles(activeTheme).card1RMCol}>
                {rmCol1.map((item, index) => {
                  return (
                    <View style={styles(activeTheme).card1RMColContentRow} key={"key-rmCol1-"+index}>
                      <Text style={styles(activeTheme).weightSubBottom}>{item}RM</Text>
                      <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, item, RMFormulas)} {weightUnit}</Text>
                    </View>
                  )
                })}
              </View>
              <View style={styles(activeTheme).card1RMCol}>
                {rmCol2.map((item, index) => {
                  return (
                    <View style={styles(activeTheme).card1RMColContentRow} key={"key-rmCol2-"+index}>
                      <Text style={styles(activeTheme).weightSubBottom}>{item}RM</Text>
                      <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, item, RMFormulas)} {weightUnit}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          <View style={styles(activeTheme).cardPercentage}>
            <Text style={styles(activeTheme).title1RM}>{selectedLocale.calculatorPage.rmPercentageTitle}</Text>

            <View style={styles(activeTheme).card1RMRow1}>
              <View style={styles(activeTheme).card1RMCol}>
                <Text style={styles(activeTheme).weightTop}>{Math.floor(weightLifted * 1.05)} {weightUnit}</Text>
                <Text style={styles(activeTheme).weightSubTop}>105%</Text>
              </View>
              <View style={styles(activeTheme).card1RMCol}>
                <Text style={styles(activeTheme).weightTop}>{Math.floor(weightLifted * 1.025)} {weightUnit}</Text>
                <Text style={styles(activeTheme).weightSubTop}>102.5%</Text>
              </View>
            </View>

            <View style={styles(activeTheme).card1RMRow2}>
              <View style={styles(activeTheme).card1RMCol}>
                {percentCol1.map((item, index) => {
                  return (
                    <View style={styles(activeTheme).card1RMColContentRow} key={"key-percentageCol1-"+index}>
                      <Text style={styles(activeTheme).weightSubBottom}>{percentLabel(item)}%</Text>
                      <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * item)} {weightUnit}</Text>
                    </View>
                  )
                })}
              </View>
              <View style={styles(activeTheme).card1RMCol}>
                {percentCol2.map((item, index) => {
                  return (
                    <View style={styles(activeTheme).card1RMColContentRow} key={"key-percentageCol2-" + index}>
                      <Text style={styles(activeTheme).weightSubBottom}>{percentLabel(item)}%</Text>
                      <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * item)} {weightUnit}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          <NumberInput
            toggleModal={toggleModal}
            inputLabel={inputLabel}
            isModalWeightInputVisible={isModalWeightInputVisible}
            setModalWeightInputVisible={setModalWeightInputVisible}
          />

        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default CalculatorPage;
