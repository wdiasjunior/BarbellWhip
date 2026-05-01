import React, { useMemo } from "react";
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
  const s = useMemo(() => styles(props.activeTheme), [props.activeTheme]);

  return (
    <View style={s.plateWrap}>
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
