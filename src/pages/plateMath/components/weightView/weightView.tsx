import React from "react";
import { View } from "react-native";

import Plate from "../plate/plate";

import styles from "./weightViewStyles";

interface IProps {
  plates: Plates[];
  activeTheme: Theme;
  weightUnit: string;
  showColoredPlates: boolean;
}

const WeightView = (props: IProps) => {
  return (
    <View style={styles(props.activeTheme).plateWrap}>
      {props.plates.map((plate, index) => {
        return (
          <Plate
            plate={plate}
            key={`keyPlate${index}`}
            activeTheme={props.activeTheme}
            weightUnit={props.weightUnit}
            showColoredPlates={props.showColoredPlates}
          />
        );
      })}
    </View>
  );
}

export default WeightView;
