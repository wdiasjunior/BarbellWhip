import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';
import Modal from "react-native-modal";

import oneRMCalc from './math';
import styles from './calculatorPageStyles';
import NumberInput from '../../sharedComponents/numberInput/numberInput';
import Header from "../../sharedComponents/header/header";

import { useAtom } from 'jotai';
import { activeThemeAtom, selectedLocaleAtom, calculatorPageRepsAtom, calculatorPageWeightAtom, calculatorPageWeightUnitAtom } from "../../helpers/jotai/atomsWithStorage";

const CalculatorPage = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const [repsPerformed, setRepsPerformed] = useAtom(calculatorPageRepsAtom);
  const [weightLifted, setWeightLifted] = useAtom(calculatorPageWeightAtom);
  const [showWarning, setShowWarning] = useState(false);
  const [weightUnit, setWeightUnit] = useAtom(calculatorPageWeightUnitAtom); // "kg" || "lbs"
  const [inputLabel, setInputLabel] = useState("");
  const [isModalWeightInputVisible, setModalWeightInputVisible] = useState(false);

  // TODO - fix - using this causes a glitch on the first render of the page
  // const rmCol1 = [2, 3, 4, 5, 6, 7];
  // const rmCol2 = [8, 9, 10, 11, 12, 15];
  // const percentCol1 = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7];
  // const percentCol2 = [0.65, 0.6, 0.55, 0.5, 0.45, 0.4];
  // const percentLabel = (i) => i.toFixed(2).toString().replace("0.", "");

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header title={selectedLocale.calculatorPage.title} menu={false} />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  useEffect(() => {
    if(repsPerformed <= 12) {
      setShowWarning(false);
    }
    if(repsPerformed > 12) {
      setShowWarning(true);
    }
  }, [repsPerformed])

  const decrementReps = () => {
    if(repsPerformed > 1) {
      setRepsPerformed(repsPerformed - 1);
    }
    if(repsPerformed <= 12) {
      setShowWarning(false);
    }
  }
  const incrementReps = () => {
    if(repsPerformed < 20) {
      setRepsPerformed(repsPerformed + 1);
    }
    if(repsPerformed > 12) {
      setShowWarning(true);
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
      if(typeof value === 'string' || value instanceof String) {
        const repsUpdated = parseInt(value);
        if(value !== "0" && parseInt(value) <= 20) {
          setRepsPerformed(repsUpdated);
        }
        setInputLabel("REPS");
      }
    } else {
      if(typeof value === 'string' || value instanceof String) {
        const weightUpdated = parseFloat(value);
        if(value !== "0" && parseFloat(value) <= 2000) {
          setWeightLifted(weightUpdated);
        }
        setInputLabel(weightUnit);
      }
    }
    setModalWeightInputVisible(!isModalWeightInputVisible);
  };

  return (
    <SafeAreaView style={styles(activeTheme).container}>
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
                <Text style={styles(activeTheme).repsSets}>{weightLifted}</Text>
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

        {showWarning &&
          <View style={styles(activeTheme).cardWarning}>
            <Text style={styles(activeTheme).textWarning}>{selectedLocale.calculatorPage.textWarning}</Text>
          </View>
        }

        <View style={styles(activeTheme).card1RM}>
          <Text style={styles(activeTheme).title1RM}>{selectedLocale.calculatorPage.rmTitle}</Text>

          <View style={styles(activeTheme).card1RMRow1}>
            <View style={styles(activeTheme).card1RMCol}>
              <Text style={styles(activeTheme).weightTop}>{oneRMCalc(weightLifted, repsPerformed, 1)} {weightUnit}</Text>
              <Text style={styles(activeTheme).weightSubTop}>1RM</Text>
            </View>
            <View style={styles(activeTheme).card1RMCol}>
              <Text style={styles(activeTheme).weightTop}>{oneRMCalc(weightLifted, repsPerformed, 5)} {weightUnit}</Text>
              <Text style={styles(activeTheme).weightSubTop}>5RM</Text>
            </View>
          </View>

          <View style={styles(activeTheme).card1RMRow2}>
            <View style={styles(activeTheme).card1RMCol}>

              {/*{rmCol1.map((item, index) => {
                return (
                  <View style={styles(activeTheme).card1RMColContentRow} key={"key rm"+index}>
                    <Text style={styles(activeTheme).weightSubBottom}>{item}RM</Text>
                    <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, item)} {weightUnit}</Text>
                  </View>
                )
              })}*/}

              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>2RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 2)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>3RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 3)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>4RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 4)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>5RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 5)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>6RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 6)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>7RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 7)} {weightUnit}</Text>
              </View>
            </View>
            <View style={styles(activeTheme).card1RMCol}>

              {/*{rmCol2.map((item, index) => {
                return (
                  <View style={styles(activeTheme).card1RMColContentRow} key={"key rm"+index}>
                    <Text style={styles(activeTheme).weightSubBottom}>{item}RM</Text>
                    <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, item)} {weightUnit}</Text>
                  </View>
                )
              })}*/}

              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>8RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 8)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>9RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 9)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>10RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 10)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>11RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 11)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>12RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 12)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>15RM</Text>
                <Text style={styles(activeTheme).weightBottom}>{oneRMCalc(weightLifted, repsPerformed, 15)} {weightUnit}</Text>
              </View>
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

              {/*{percentCol1.map((item, index) => {
                return (
                  <View style={styles(activeTheme).card1RMColContentRow} key={"key percentage"+index}>
                    <Text style={styles(activeTheme).weightSubBottom}>{percentLabel(item)}%</Text>
                    <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * item)} {weightUnit}</Text>
                  </View>
                )
              })}*/}

              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>95%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.95)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>90%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.9)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>85%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.85)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>80%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.8)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>75%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.75)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>70%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.7)} {weightUnit}</Text>
              </View>
            </View>
            <View style={styles(activeTheme).card1RMCol}>

              {/*{percentCol2.map((item, index) => {
                return (
                  <View style={styles(activeTheme).card1RMColContentRow} key={"key percentage" + index}>
                    <Text style={styles(activeTheme).weightSubBottom}>{percentLabel(item)}%</Text>
                    <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * item)} {weightUnit}</Text>
                  </View>
                )
              })}*/}

              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>65%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.65)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>60%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.6)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>55%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.55)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>50%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.5)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>45%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.45)} {weightUnit}</Text>
              </View>
              <View style={styles(activeTheme).card1RMColContentRow}>
                <Text style={styles(activeTheme).weightSubBottom}>40%</Text>
                <Text style={styles(activeTheme).weightBottom}>{Math.floor(weightLifted * 0.4)} {weightUnit}</Text>
              </View>
            </View>
          </View>

        </View>

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
            <NumberInput toggleModal={toggleModal} inputLabel={inputLabel}/>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

export default CalculatorPage;
// export default React.memo(CalculatorPage);
