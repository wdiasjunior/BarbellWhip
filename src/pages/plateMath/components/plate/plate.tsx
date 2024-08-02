import React from "react";
import { View, Text } from "react-native";

import { styles, plateColors } from "./plateStyles";

interface IProps {
  plate: Plates;
  activeTheme: Theme;
  weightUnit: string;
  showColoredPlates: boolean;
}

const Plate = (props: IProps) => {
  const plateDimensions = {
    kg: {
      50: {
        size: 1.25,
        color: plateColors[props.weightUnit]["50"],
        hasDecimal: false,
      },
      25: {
        size: 1,
        color: plateColors[props.weightUnit]["25"],
        hasDecimal: false,
      },
      20: {
        size: 1,
        color: plateColors[props.weightUnit]["20"],
        hasDecimal: false,
      },
      15: {
        size: 0.75,
        color: plateColors[props.weightUnit]["15"],
        hasDecimal: false,
      },
      10: {
        size: 0.5,
        color: plateColors[props.weightUnit]["10"],
        hasDecimal: false,
      },
      5: {
        size: 0.25,
        color: plateColors[props.weightUnit]["5"],
        hasDecimal: false,
      },
      2.5: {
        size: 0.125,
        color: plateColors[props.weightUnit]["2.5"],
        hasDecimal: true,
      },
      2: {
        size: 0.125,
        color: plateColors[props.weightUnit]["2"],
        hasDecimal: false,
      },
      1.5: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1.5"],
        hasDecimal: true,
      },
      1.25: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1.25"],
        hasDecimal: true,
      },
      1: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1"],
        hasDecimal: false,
      },
      0.5: {
        size: 0.05,
        color: plateColors[props.weightUnit]["0.5"],
        hasDecimal: true,
      },
    },
    lbs: {
      100: {
        size: 1.25,
        color: plateColors[props.weightUnit]["100"],
        hasDecimal: false,
      },
      55: {
        size: 1,
        color: plateColors[props.weightUnit]["55"],
        hasDecimal: false,
      },
      45: {
        size: 1,
        color: plateColors[props.weightUnit]["45"],
        hasDecimal: false,
      },
      35: {
        size: 0.75,
        color: plateColors[props.weightUnit]["35"],
        hasDecimal: false,
      },
      25: {
        size: 0.65,
        color: plateColors[props.weightUnit]["25"],
        hasDecimal: false,
      },
      10: {
        size: 0.5,
        color: plateColors[props.weightUnit]["10"],
        hasDecimal: false,
      },
      5: {
        size: 0.125,
        color: plateColors[props.weightUnit]["5"],
        hasDecimal: false,
      },
      2.5: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["2.5"],
        hasDecimal: true,
      },
      1.25: {
        size: 0.0625,
        color: plateColors[props.weightUnit]["1.25"],
        hasDecimal: true,
      },
    }
  }

  const computePlateStyle = () => {
    if(props.plate.isBumper) {
      return Object.assign({...styles(props.activeTheme).bumperPlate});
    } else {
      const hScale = 0.5 + (0.5 * plateDimensions[props.weightUnit][props.plate.plate].size);
      const wScale = 0.7 + (0.3 * plateDimensions[props.weightUnit][props.plate.plate].size);
      if(props.showColoredPlates) {
        return Object.assign({
            ...styles(props.activeTheme).plate}, {
            width: plateDimensions[props.weightUnit][props.plate.plate].hasDecimal ? styles(props.activeTheme).plate.width * wScale + 8 : styles(props.activeTheme).plate.width * wScale - 10,
            height: styles(props.activeTheme).plate.height * hScale,
            backgroundColor: plateDimensions[props.weightUnit][props.plate.plate].color,
            borderColor: plateDimensions[props.weightUnit][props.plate.plate].color,
          });
      } else {
        return Object.assign({
            ...styles(props.activeTheme).plate}, {
            width: styles(props.activeTheme).plate.width * wScale,
            height: styles(props.activeTheme).plate.height * hScale,
          });
      }
    }
  }

  return (
    <View style={computePlateStyle()}>
      <Text adjustsFontSizeToFit style={styles(props.activeTheme).text}>{props.plate.plate}</Text>
    </View>
  );
}

export default Plate;
