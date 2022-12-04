import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Text, View, FlatList, Button, ScrollView, TouchableOpacity, } from 'react-native';
import Modal from "react-native-modal";

import Header from "../../sharedComponents/header/header";
import WeightView from './components/weightView/weightView';
import NumberInput from '../../sharedComponents/numberInput/numberInput';
import WeightCalc from './utils/WeightCalc';

import styles from './plateMathPageStyles';

import { useAtom } from 'jotai';
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

// settings button
// weight unit switch
// men/women bar switch
// plates/weight rack editor - allow for mixed weight unit plates?
// bar weight input

const PlateMathPage = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header title={'Plate Math'} menu={false} />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  // add support for custom bar weight and deadlift and squat bars on a list
  const defaultWeightRack = {
    lb: {
      45 : 6,
      35 : 6,
      25 : 6,
      15 : 6,
      10 : 6,
      5  : 6,
      2.5: 6
    },
    kg: {
      25 : 0,
      20 : 10,
      15 : 2,
      10 : 2,
      5  : 2,
      3  : 0,
      2.5: 2,
      2  : 0,
      1.5: 0,
      1  : 0,
      0.5: 0,
    }
  };
  const defaultMenBarWeight = {
    lb: 45,
    kg: 20,
  };
  const defaultWomenBarWeight = {
    lb: 35,
    kg: 15,
  };

  const [weightUnit, setWeightUnit] = useState("kg"); // "lbs"
  const [currentWeight, setCurrentWeight] = useState(150);
  const [selectedBar, setSelectedBar] = useState(true); // true == men's bar | false == women's bar
  const [showWarning, setShowWarning] = useState(false);
  const [isModalWeightInputVisible, setModalWeightInputVisible] = useState(false);
  const currentPlates = WeightCalc.getPlates(currentWeight, defaultMenBarWeight[weightUnit] , defaultWeightRack[weightUnit]);

  useEffect(() => { //  if currentWeight > defaultWeightRack[weightUnit] total + bar show warning
    if(currentWeight <= WeightCalc.getClosestAvailableWeight(currentWeight, defaultMenBarWeight[weightUnit], defaultWeightRack[weightUnit])) {
      setShowWarning(false);
    }
    if(currentWeight > WeightCalc.getClosestAvailableWeight(currentWeight, defaultMenBarWeight[weightUnit], defaultWeightRack[weightUnit])) {
      setShowWarning(true);
    }
  }, [currentWeight])

  const decrementWeight = () => {
    if((currentWeight - 5) < 0) { // if currentWeight <= selectedBarWeight
      setCurrentWeight(0); // setCurrentWeight(selectedBarWeight) ?
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
    if(typeof weight === 'string' || weight instanceof String) {
      const weightUpdated = parseFloat(weight);
      setCurrentWeight(weightUpdated);
    }
    setModalWeightInputVisible(!isModalWeightInputVisible);
  };

  return (
    <ScrollView style={styles(activeTheme).container} overScrollMode="never">
      <View style={styles(activeTheme).controlsContainer}>

        <View style={styles(activeTheme).cardIncrement}>
          <View style={styles(activeTheme).rowWrapper}>
            <Text style={styles(activeTheme).title}>Weight</Text>
            <View style={styles(activeTheme).row}>
              <TouchableOpacity onPress={decrementWeight}>
                <View style={styles(activeTheme).incrementWrapper}>
                  <Text style={styles(activeTheme).incrementText}>-</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles(activeTheme).repsSets}>{currentWeight}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={incrementWeight}>
                <View style={styles(activeTheme).incrementWrapper}>
                  <Text style={styles(activeTheme).incrementText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles(activeTheme).info}>Current Bar Weight:
            <Text style={styles(activeTheme).infoWeight}> {defaultMenBarWeight[weightUnit]}{weightUnit}</Text>
          </Text>
          {/*<Text style={styles(activeTheme).info}>Current Weight on the Bar:
            <Text style={styles(activeTheme).infoWeight}> {WeightCalc.getClosestAvailableWeight(currentWeight, defaultMenBarWeight[weightUnit], defaultWeightRack[weightUnit])}{weightUnit}</Text>
          </Text>*/}
        </View>

        {/*{showWarning &&
          <View style={styles(activeTheme).cardWarning}>
            <Text style={styles(activeTheme).textWarning}>WARNING. The weight entered exceeds the total in your rack.</Text>
          </View>
        }*/}
      </View>

      <WeightView
        weightRack={defaultWeightRack[weightUnit]}
        barWeight={defaultMenBarWeight[weightUnit]}
        weight={currentWeight}
        plates={currentPlates}
        activeTheme={activeTheme}
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
          <NumberInput weightUnit={weightUnit} toggleModal={toggleModal} inputLabel={weightUnit}/>
        </View>
      </Modal>

    </ScrollView>
  );
}

// // import React from 'react';
// // import {StyleSheet} from 'react-native';
// // // @ts-ignore
// // import Modal from 'react-native-modal';
// // import ModalBaseScene from '../utils/ModalBaseScene';
// // import DefaultModalContent from '../utils/DefaultModalContent';
// //
// // class BottomHalfModal extends ModalBaseScene {
// //   renderModal(): React.ReactElement<any> {
// //     return (
// //       <Modal
// //         testID={'modal'}
// //         isVisible={this.isVisible()}
// //         onSwipeComplete={this.close}
// //         swipeDirection={['up', 'left', 'right', 'down']}
// //         style={styles(activeTheme).view}>
// //         <DefaultModalContent onPress={this.close} />
// //       </Modal>
// //     );
// //   }
// // }
// //
// // const styles = StyleSheet.create({
// //   view: {
// //     justifyContent: 'flex-end',
// //     margin: 0,
// //   },
// // });
// //
// // export default BottomHalfModal;

export default React.memo(PlateMathPage);
