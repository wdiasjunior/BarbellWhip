import React from 'react';
import { View } from 'react-native';

import WeightCalc from '../../utils/WeightCalc'
import Plate from '../plate/plate';

import styles from './weightViewStyles';

interface Props {
  weightRack: any;
  barWeight: any;
  weight: any;
  plates: any;
  activeTheme: any;
  showBumper: boolean;
  bumperRack: any;
}

const WeightView = (props: Props) => {

  // console.log("WeightView props.plates", props.plates);
  // console.log(props.bumperPlates);

  return (
      <View style={styles(props.activeTheme).plateWrap}>
        {
          props.plates.map((weight, i) => {
            return (
              <Plate weight={weight} bumperRack={props.bumperRack} showBumper={props.showBumper} key={i} size={WeightCalc.getPlatePercentOfMax(weight, props.weightRack)} activeTheme={props.activeTheme} />
            );
        })}
      </View>
  );
}

export default WeightView;
