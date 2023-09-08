import React, { useState, } from "react";
import { Text, View, TouchableOpacity, } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./numberInputStyles";

import { useAtom } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atomsWithStorage";

interface Props {
  toggleModal: any | ((value?: string, label?: string) => void) | ((value?: string) => void);
  inputLabel: string;
}

const NumberInput = (props: Props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "0", "."];
  const [weightString, setWeightString] = useState("0");

  const handleInput = (value: string) => {

    switch(value) {
      case "0":
        if(weightString == "0") {
          break;
        } else {
          if(weightString.length == 0) {
            break;
          } else {
            setWeightString(weightString + value);
            break;
          }
        }
        break;

      case " ":
        break;

      case ".":
        if(weightString.slice(-1) == ".") {
          break;
        } else if(weightString.includes(".")) {
          break;
        } else {
          setWeightString(weightString + value);
          break;
        }

      case "backspace":
        const weightStringCopy = weightString;
        const deleteLastCharacter = weightStringCopy.substr(0, weightStringCopy.length - 1);
        if(deleteLastCharacter.length == 0) {
          setWeightString("0");
        } else {
          setWeightString(deleteLastCharacter);
        }
        break;

      default:
        if(weightString == "0") {
          setWeightString(value);
        } else {
          setWeightString(weightString + value);
        }
        break;
    }
  }

  // <Text adjustsFontSizeToFit={true} style={styles(activeTheme).text}>teste</Text>
  return (
    <View style={styles(activeTheme).container}>
      <View style={styles(activeTheme).input}>
        <Text style={styles(activeTheme).inputText}>{weightString} <Text style={styles(activeTheme).inputTextLabel}>{props.inputLabel}</Text></Text>
        <Icon
          name="backspace"
          size={30}
          style={styles(activeTheme).icon}
          onPress={() => handleInput("backspace")}
        />
      </View>

      <View style={styles(activeTheme).numpad}>
        {buttons.map((value, index) => {
          return (
            <TouchableOpacity
              key={"NumberInput_NumpadItem" + index}
              style={styles(activeTheme).numpadButton}
              onPress={() => handleInput(value)}
            >
              <Text style={styles(activeTheme).numpadButtonText}>{value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles(activeTheme).bottomButtonsRow}>
        <Text style={styles(activeTheme).bottomButtonsText} onPress={() => props.toggleModal()}>{selectedLocale.numberInputModal.cancelButtonLabel}</Text>
        <Text style={styles(activeTheme).bottomButtonsText} onPress={() => props.toggleModal(weightString, props.inputLabel)}>OK</Text>
      </View>

    </View>
  );
}

export default NumberInput;
