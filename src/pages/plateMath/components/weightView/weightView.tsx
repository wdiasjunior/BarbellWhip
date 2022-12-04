import React from 'react';
import { View } from 'react-native';

import WeightCalc from '../../utils/WeightCalc'
import Plate from '../plate/plate';

import styles from './weightViewStyles';

const WeightView = (props) => {

  return (
      <View style={styles(props.activeTheme).plateWrap}>
        {
          props.plates.map((weight, i) => {
            return (
              <Plate weight={weight} key={i} size={WeightCalc.getPlatePercentOfMax(weight, props.weightRack)} activeTheme={props.activeTheme} />
            );
        })}
      </View>
  );
}

export default WeightView;
