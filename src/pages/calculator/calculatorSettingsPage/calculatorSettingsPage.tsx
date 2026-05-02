import React, { useMemo, useCallback } from "react";
import { Text, View, Switch, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./calculatorSettingsPageStyles";

import { weightConversion } from "../../../helpers/weightConversion";
import { useInitialRender } from "../../../helpers/useInitialRender";

import Loading from "../../../sharedComponents/loading/loading";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  calculatorPageWeightAtom,
  calculatorPageWeightUnitAtom,
  calculatorSettingsPage1RMFormulasAtom,
} from "../../../helpers/jotai/atoms";

const CalculatorSettingsPage = ({ navigation }) => {
  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [currentWeight, setCurrentWeight] = useAtom<boolean>(calculatorPageWeightAtom);
  const [weightUnit, setWeightUnit] = useAtom<boolean>(calculatorPageWeightUnitAtom);
  const [RMFormulas, setRMFormulas] = useAtom<number>(calculatorSettingsPage1RMFormulasAtom);

  const handleWeightUnitChange = useCallback((_weightUnit: boolean) => {
    const _convertedWeight = weightConversion(currentWeight, _weightUnit);
    setCurrentWeight(_convertedWeight);
    setWeightUnit(_weightUnit);
  }, [currentWeight, setCurrentWeight, setWeightUnit]);

  const handleRMFormulas = (formula: string) => {
    setRMFormulas({...RMFormulas, [formula]: !RMFormulas[formula]});
  }

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <View style={s.wrapper}>

          <View style={s.switchContainer}>
            <Text style={s.title}>{selectedLocale.calculatorPage.calculatorSettingsPage.weightUnitLabel}</Text>
            <View style={s.switchWrapper}>
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

          <View style={s.formulasWrapper}>
            <Text style={s.title}>{selectedLocale.calculatorPage.calculatorSettingsPage.calculationFormulasTitle}</Text>
            <TouchableOpacity style={s.itemSelect} onPress={() => handleRMFormulas("epley")}>
              <View style={s.iconContainer}>
                {RMFormulas.epley &&
                  <Ionicons
                    size={20}
                    name="checkmark-sharp"
                    color={activeTheme.textHighlight}
                    style={s.icon}
                  />
                }
              </View>
              <Text style={s.itemSelectText}>Epley</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.itemSelect} onPress={() => handleRMFormulas("brzycki")}>
              <View style={s.iconContainer}>
                {RMFormulas.brzycki &&
                  <Ionicons
                    size={20}
                    name="checkmark-sharp"
                    color={activeTheme.textHighlight}
                    style={s.icon}
                  />
                }
              </View>
              <Text style={s.itemSelectText}>Brzycki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.itemSelect} onPress={() => handleRMFormulas("lombardi")}>
              <View style={s.iconContainer}>
                {RMFormulas.lombardi &&
                  <Ionicons
                    size={20}
                    name="checkmark-sharp"
                    color={activeTheme.textHighlight}
                    style={s.icon}
                  />
                }
              </View>
              <Text style={s.itemSelectText}>Lombardi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.itemSelect} onPress={() => handleRMFormulas("mayhew")}>
              <View style={s.iconContainer}>
                {RMFormulas.mayhew &&
                  <Ionicons
                    size={20}
                    name="checkmark-sharp"
                    color={activeTheme.textHighlight}
                    style={s.icon}
                  />
                }
              </View>
              <Text style={s.itemSelectText}>Mayhew</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.itemSelect} onPress={() => handleRMFormulas("mcglothin")}>
              <View style={s.iconContainer}>
                {RMFormulas.mcglothin &&
                  <Ionicons
                    size={20}
                    name="checkmark-sharp"
                    color={activeTheme.textHighlight}
                    style={s.icon}
                  />
                }
              </View>
              <Text style={s.itemSelectText}>McGlothin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.itemSelect} onPress={() => handleRMFormulas("oconner")}>
              <View style={s.iconContainer}>
                {RMFormulas.oconner &&
                  <Ionicons
                    size={20}
                    name="checkmark-sharp"
                    color={activeTheme.textHighlight}
                    style={s.icon}
                  />
                }
              </View>
              <Text style={s.itemSelectText}>OConner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.itemSelect} onPress={() => handleRMFormulas("wathen")}>
              <View style={s.iconContainer}>
                {RMFormulas.wathen &&
                  <Ionicons
                    size={20}
                    name="checkmark-sharp"
                    color={activeTheme.textHighlight}
                    style={s.icon}
                  />
                }
              </View>
              <Text style={s.itemSelectText}>Wathan</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default CalculatorSettingsPage;
