import React from "react";
import { View } from "react-native";

import Plate from "../plate/plate";

import styles from "./weightViewStyles";

interface Props {
  plates: Plates[];
  activeTheme: any;
  weightUnit: string;
}

const WeightView = (props: Props) => {
  return (
    <View style={styles(props.activeTheme).plateWrap}>
      {props.plates.map((plate, index) => {
        return (
          <Plate
            plate={plate}
            key={`keyPlate${index}`}
            activeTheme={props.activeTheme}
            weightUnit={props.weightUnit}
          />
        );
      })}
    </View>
  );
}

export default WeightView;
