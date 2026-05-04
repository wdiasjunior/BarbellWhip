import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./repRowStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import type { OBRep } from "../../types/obTypes";

interface IProps {
  rep: OBRep;
  index: number;
  onRemove: () => void;
  onRestore: () => void;
}

const RepRow = ({ rep, index, onRemove, onRestore }: IProps) => {
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage.workout;

  const formatValue = (val: number | null, unit?: string): string => {
    if (val === null) return "--";
    return unit ? `${val}${unit}` : `${val}`;
  };

  return (
    <View
      style={[
        s.container,
        rep.removed && s.removedContainer,
        !rep.isValid && s.invalidContainer,
      ]}
    >
      <Text style={s.repNumber}>{index + 1}</Text>

      <View style={s.dataCell}>
        <Text style={rep.isValid ? s.dataValue : s.dataValueFaded}>
          {formatValue(rep.averageVelocity, " m/s")}
        </Text>
        <Text style={s.dataLabel}>{locale.avgVelocity}</Text>
      </View>

      <View style={s.dataCell}>
        <Text style={rep.isValid ? s.dataValue : s.dataValueFaded}>
          {formatValue(rep.peakVelocity, " m/s")}
        </Text>
        <Text style={s.dataLabel}>{locale.peakVelocity}</Text>
      </View>

      <View style={s.dataCell}>
        <Text style={rep.isValid ? s.dataValue : s.dataValueFaded}>
          {formatValue(rep.rangeOfMotion, " mm")}
        </Text>
        <Text style={s.dataLabel}>{locale.rom}</Text>
      </View>

      <View style={s.dataCell}>
        <Text style={rep.isValid ? s.dataValue : s.dataValueFaded}>
          {formatValue(rep.durationOfLift, "s")}
        </Text>
        <Text style={s.dataLabel}>{locale.duration}</Text>
      </View>

      <TouchableOpacity
        style={s.removeButton}
        onPress={rep.removed ? onRestore : onRemove}
      >
        <Ionicons
          name={rep.removed ? "refresh" : "close-circle-outline"}
          size={20}
          color={activeTheme.textFaded}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RepRow;
