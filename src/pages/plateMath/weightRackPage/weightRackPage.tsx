import React, { useMemo, useCallback } from "react";
import { Text, View, Switch, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import styles from "./weightRackPageStyles";

import { weightConversion } from "../../../helpers/weightConversion";
import { useInitialRender } from "../../../helpers/useInitialRender";

import Loading from "../../../sharedComponents/loading/loading";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  plateMathPageWeightAtom,
  plateMathWeightUnitAtom,
  plateMathBarWeightAtom,
  plateMathWeightRackAtom,
  plateMathShowBumperAtom,
  plateMathBumperPlatesRackAtom,
  plateMathShowColoredPlatesAtom,
  DEFAULT_BAR_WEIGHT,
  DEFAULT_WEIGHT_RACK,
  DEFAULT_BUMPER_RACK,
} from "../../../helpers/jotai/atoms";

const isValidObject = (val: unknown): val is Record<string, any> => val !== null && typeof val === "object" && !("then" in (val as any));

const WeightRackPage = () => {
  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [currentWeight, setCurrentWeight] = useAtom<number>(plateMathPageWeightAtom);
  const [weightUnit, setWeightUnit] = useAtom<boolean>(plateMathWeightUnitAtom); // false == kg == left, true == lbs == right
  const [barWeight, setBarWeight] = useAtom<BarWeight>(plateMathBarWeightAtom);
  const [weightRack, setWeightRack] = useAtom<WeightRack>(plateMathWeightRackAtom);
  const [showBumper, setShowBumper] = useAtom<boolean>(plateMathShowBumperAtom);
  const [bumperPlatesRack, setBumperPlatesRack] = useAtom<BumperRack>(plateMathBumperPlatesRackAtom);
  const [showColoredPlates, setShowColoredPlates] = useAtom<boolean>(plateMathShowColoredPlatesAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const safeBarWeight = isValidObject(barWeight) ? barWeight : DEFAULT_BAR_WEIGHT;
  const safeWeightRack = isValidObject(weightRack) && isValidObject(weightRack.kg) ? weightRack : DEFAULT_WEIGHT_RACK;
  const safeBumperRack = isValidObject(bumperPlatesRack) && isValidObject(bumperPlatesRack.kg) ? bumperPlatesRack : DEFAULT_BUMPER_RACK;

  const handleWeightUnitChange = useCallback((_weightUnit: boolean) => {
    const _convertedWeight = weightConversion(currentWeight, _weightUnit);
    setCurrentWeight(_convertedWeight);
    setWeightUnit(_weightUnit);
  }, [currentWeight, setCurrentWeight, setWeightUnit]);

  const editWeightRack = useCallback((_input: string, _field: string, _weightUnit: string) => {
    setWeightRack(prev => {
      const safe = isValidObject(prev) && isValidObject(prev[_weightUnit]) ? prev : DEFAULT_WEIGHT_RACK;
      return {
        ...safe,
        [_weightUnit]: {
          ...safe[_weightUnit],
          [_field]: _input,
        }
      };
    });
  }, [setWeightRack]);

  const editBumperPlateRack = useCallback((_input: string, _field: string, _weightUnit: string) => {
    setBumperPlatesRack(prev => {
      const safe = isValidObject(prev) && isValidObject(prev[_weightUnit]) ? prev : DEFAULT_BUMPER_RACK;
      return {
        ...safe,
        [_weightUnit]: {
          ...safe[_weightUnit],
          [_field]: _input,
        }
      };
    });
  }, [setBumperPlatesRack]);

  const editBarWeight = useCallback((_input: string, _weightUnit: string) => {
    setBarWeight(prev => {
      const safe = isValidObject(prev) ? prev : DEFAULT_BAR_WEIGHT;
      return {
        ...safe,
        [_weightUnit]: _input,
      };
    });
  }, [setBarWeight]);

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <KeyboardAwareScrollView style={s.wrapper} keyboardShouldPersistTaps="handled" bottomOffset={20}>
          <View style={s.inputGroupSwitches}>
            <View style={s.inputGroupSwitch}>
              <Text style={s.inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.weightUnitLabel}</Text>
              <View style={s.inputWeightRackRow}>
                <Text style={s.switchLabel}>kg</Text>
                <Switch
                  trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleWeightUnitChange}
                  value={weightUnit}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18 }}
                />
                <Text style={s.switchLabel}>lbs</Text>
              </View>
            </View>

            <View style={s.inputGroupSwitch}>
              <Text style={s.inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.bumperToggleLabel}</Text>
              <View style={s.inputWeightRackRow}>
                <Text style={s.switchLabel}>off</Text>
                <Switch
                  trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setShowBumper}
                  value={showBumper}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18 }}
                />
                <Text style={s.switchLabel}>on</Text>
              </View>
            </View>

            <View style={s.inputGroupSwitch}>
              <Text style={s.inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.coloredPlatesToggleLabel}</Text>
              <View style={s.inputWeightRackRow}>
                <Text style={s.switchLabel}>off</Text>
                <Switch
                  trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setShowColoredPlates}
                  value={showColoredPlates}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18 }}
                />
                <Text style={s.switchLabel}>on</Text>
              </View>
            </View>
          </View>

          <View style={s.inputGroup}>
            <Text style={s.inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.barWeightTitle}</Text>
            <View style={s.row}>
              <View style={s.inputWeightRackRow}>
                <Text style={s.inputLabel}>kg</Text>
                  <TextInput
                    cursorColor={activeTheme.active}
                    style={[s.input, s.shadowProp]}
                    value={String(safeBarWeight.kg ?? "")}
                    onChangeText={(input) => editBarWeight(input, "kg")}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
              </View>
              <View style={s.inputWeightRackRow}>
                <Text style={s.inputLabel}>lbs</Text>
                  <TextInput
                    cursorColor={activeTheme.active}
                    style={[s.input, s.shadowProp]}
                    value={String(safeBarWeight.lbs ?? "")}
                    onChangeText={(input) => editBarWeight(input, "lbs")}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
              </View>
            </View>
          </View>

          <View style={s.inputGroup}>
            <Text style={s.inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.plateRackTitle}</Text>
            <View style={s.row}>
              <View style={s.column}>
                <Text style={s.inputLabel}>kg</Text>
                {Object.entries(safeWeightRack.kg).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={s.inputWeightRackRow} key={"PlateRackPage_WeightRackInput_1_" + j} >
                      <Text style={s.inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[s.input, s.shadowProp]}
                        value={String(plate[1] ?? "")}
                        onChangeText={(input) => editWeightRack(input, plate[0], "kg")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
              <View style={s.column}>
                <Text style={s.inputLabel}>lbs</Text>
                {Object.entries(safeWeightRack.lbs).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={s.inputWeightRackRow} key={"PlateRackPage_WeightRackInput_2_" + j} >
                      <Text style={s.inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[s.input, s.shadowProp]}
                        value={String(plate[1] ?? "")}
                        onChangeText={(input) => editWeightRack(input, plate[0], "lbs")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          <View style={s.inputGroupLast}>
            <Text style={s.inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.bumperPlatesRackTitle}</Text>
            <View style={s.row}>
              <View style={s.column}>
                <Text style={s.inputLabel}>kg</Text>
                {Object.entries(safeBumperRack.kg).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={s.inputWeightRackRow} key={"PlateRackPage_BumperPlatesRackInput_1_" + j} >
                      <Text style={s.inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[s.input, s.shadowProp]}
                        value={String(plate[1] ?? "")}
                        onChangeText={(input) => editBumperPlateRack(input, plate[0], "kg")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
              <View style={s.column}>
                <Text style={s.inputLabel}>lbs</Text>
                {Object.entries(safeBumperRack.lbs).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={s.inputWeightRackRow} key={"PlateRackPage_BumperPlatesRackInput_2_" + j} >
                      <Text style={s.inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[s.input, s.shadowProp]}
                        value={String(plate[1] ?? "")}
                        onChangeText={(input) => editBumperPlateRack(input, plate[0], "lbs")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          {/* TODO */}
          {/*<Text style={s.inputGroupTitle}>import/export plate math settings ?</Text>*/}

        </KeyboardAwareScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default WeightRackPage;
