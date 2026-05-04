import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./setCardStyles";
import RepRow from "./repRow";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import type { OBSet } from "../../types/obTypes";

interface IProps {
  set: OBSet;
  isWorkingSet: boolean;
  onUpdateField: (field: keyof OBSet, value: any) => void;
  onRemoveRep: (repIndex: number) => void;
  onRestoreRep: (repIndex: number) => void;
}

const SetCard = ({ set, isWorkingSet, onUpdateField, onRemoveRep, onRestoreRep }: IProps) => {
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage.workout;

  const [expanded, setExpanded] = useState(isWorkingSet);

  const validRepCount = set.reps.filter((r) => r.isValid && !r.removed).length;

  if (!isWorkingSet && !expanded) {
    return (
      <TouchableOpacity style={s.container} onPress={() => setExpanded(true)}>
        <View style={s.header}>
          <Text style={s.headerTitle}>
            {set.exerciseName || `${locale.set} ${set.setNumber}`}
          </Text>
          <Ionicons name="chevron-down" size={18} color={activeTheme.textFaded} />
        </View>
        <View style={s.collapsedSummary}>
          {set.weight !== null && (
            <Text style={s.summaryChip}>
              {set.weight} {set.metric}
            </Text>
          )}
          <Text style={s.summaryChip}>
            {validRepCount} {locale.rep}{validRepCount !== 1 ? "s" : ""}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={s.container}>
      {/* Header */}
      <TouchableOpacity style={s.header} onPress={() => !isWorkingSet && setExpanded(false)}>
        <Text style={s.headerTitle}>
          {isWorkingSet
            ? `${locale.set} ${set.setNumber}`
            : set.exerciseName || `${locale.set} ${set.setNumber}`}
        </Text>
        {!isWorkingSet && (
          <Ionicons name="chevron-up" size={18} color={activeTheme.textFaded} />
        )}
      </TouchableOpacity>

      {/* Form */}
      <View style={s.formContainer}>
        <View style={s.formRow}>
          <View style={[s.inputContainer, { flex: 2 }]}>
            <Text style={s.inputLabel}>{locale.exerciseName}</Text>
            <TextInput
              style={s.textInput}
              value={set.exerciseName}
              onChangeText={(text) => onUpdateField("exerciseName", text)}
              placeholder={locale.exerciseName}
              placeholderTextColor={activeTheme.placeholderText}
              editable={isWorkingSet}
            />
          </View>
        </View>
        <View style={s.formRow}>
          <View style={s.inputContainer}>
            <Text style={s.inputLabel}>{locale.weight} ({set.metric})</Text>
            <TextInput
              style={s.textInput}
              value={set.weight !== null ? String(set.weight) : ""}
              onChangeText={(text) => {
                const num = parseFloat(text);
                onUpdateField("weight", isNaN(num) ? null : num);
              }}
              placeholder="0"
              placeholderTextColor={activeTheme.placeholderText}
              keyboardType="numeric"
              editable={isWorkingSet}
            />
          </View>
          <View style={s.inputContainer}>
            <Text style={s.inputLabel}>{locale.rpe}</Text>
            <TextInput
              style={s.textInput}
              value={set.rpe}
              onChangeText={(text) => onUpdateField("rpe", text)}
              placeholder="RPE"
              placeholderTextColor={activeTheme.placeholderText}
              keyboardType="numeric"
              editable={isWorkingSet}
            />
          </View>
        </View>
      </View>

      {/* TODO: Video recording feature */}
      {/* <View style={s.todoContainer}>
        <Text style={s.todoText}>TODO: Video recording feature</Text>
      </View> */}

      {/* Reps */}
      <View style={s.repsContainer}>
        {set.reps.length > 0 ? (
          set.reps.map((rep, index) => (
            <RepRow
              key={`rep-${index}`}
              rep={rep}
              index={index}
              onRemove={() => onRemoveRep(index)}
              onRestore={() => onRestoreRep(index)}
            />
          ))
        ) : (
          <Text style={s.noRepsText}>{locale.noRepsYet}</Text>
        )}
      </View>
    </View>
  );
};

export default SetCard;
