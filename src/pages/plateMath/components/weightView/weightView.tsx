import React from 'react';
import { View } from 'react-native';

import WeightCalc from '../../utils/WeightCalc'
import Plate from '../plate/plate';

import styles from './weightViewStyles';

interface Props {
  // weightRack: any;
  // barWeight: any;
  // weight: any;
  plates: any;
  activeTheme: any;
}

const WeightView = (props: Props) => {
  return (
      <View style={styles(props.activeTheme).plateWrap}>
        {
          props.plates.map((weight, index) => {
            return (
              <Plate
                weight={weight}
                key={`keyPlate${index}`}
                size={WeightCalc.getPlatePercentOfMax(weight, props.plates)}
                activeTheme={props.activeTheme}
              />
            );
        })}
      </View>
  );
}

export default WeightView;
