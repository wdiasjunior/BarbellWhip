import React from 'react';
import { View, Text } from 'react-native';

import { styles, plateColors } from './plateStyles';

interface Props {
  weight: any;
  // size: any;
  activeTheme: any;
  weightUnit: any;
}

const Plate = (props: Props) => {
  // I don't like this gambiarra for the plate size, but I guess we'll have to
  // roll with this since WeightCalc.getPlatePercentOfMax is broken
  const plateDimensions = {
    // TODO - find some good colors for the other plates based on those from nord theme?
    // don't really like how they look with the rest of the app theme
    kg: {
      50: {
        size: 1.25,
        color: plateColors[props.weightUnit]["50"],
      },
      25: {
        size: 1,
        color: plateColors[props.weightUnit]["25"],
      },
      20: {
        size: 1,
        color: plateColors[props.weightUnit]["20"],
      },
      15: {
        size: 0.75,
        color: plateColors[props.weightUnit]["15"],
      },
      10: {
        size: 0.5,
        color: plateColors[props.weightUnit]["10"],
      },
      5: {
        size: 0.25,
        color: plateColors[props.weightUnit]["5"],
      },
      2.5: {
        size: 0.125,
        color: plateColors[props.weightUnit]["2.5"],
      },
      2: {
        size: 0.125,
        color: plateColors[props.weightUnit]["2"],
      },
      1.5: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1.5"],
      },
      1.25: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1.25"],
      },
      1: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1"],
      },
      0.5: {
        size: 0.05,
        color: plateColors[props.weightUnit]["0.5"],
      },
    },
    lb: {
      100: {
        size: 1.25,
        color: plateColors[props.weightUnit]["100"],
      },
      55: {
        size: 1,
        color: plateColors[props.weightUnit]["55"],
      },
      45: {
        size: 1,
        color: plateColors[props.weightUnit]["45"],
      },
      35: {
        size: 0.75,
        color: plateColors[props.weightUnit]["35"],
      },
      25: {
        size: 0.5,
        color: plateColors[props.weightUnit]["25"],
      },
      10: {
        size: 0.25,
        color: plateColors[props.weightUnit]["10"],
      },
      5: {
        size: 0.125,
        color: plateColors[props.weightUnit]["5"],
      },
      2.5: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["2.5"],
      },
      1.25: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1.25"],
      },
    }
  }

  const computePlateStyle = () => {
    if(props.weight.isBumper) {
      // add conditional for color coded plates input
      return Object.assign({...styles(props.activeTheme).bumperPlate});
    } else {
      const hScale = 0.5 + (0.5 * plateDimensions[props.weightUnit][props.weight.plate].size);
      const wScale = 0.7 + (0.3 * plateDimensions[props.weightUnit][props.weight.plate].size);
      return Object.assign({
          ...styles(props.activeTheme).plate}, {
          width: styles(props.activeTheme).plate.width * wScale,
          height: styles(props.activeTheme).plate.height * hScale,
          // add conditional for color coded plates input
          // backgroundColor: plateDimensions[props.weightUnit][props.weight.plate].color,
          // borderColor: plateDimensions[props.weightUnit][props.weight.plate].color,
        });
    }
  }

  return (
    <View style={computePlateStyle()}>
      <Text adjustsFontSizeToFit style={styles(props.activeTheme).text}>{props.weight.plate}</Text>
    </View>
  );
}

export default Plate;
