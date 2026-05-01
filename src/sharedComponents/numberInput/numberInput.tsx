import React, { useState, useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";

import styles from "./numberInputStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atoms";

interface IProps {
  toggleModal: any | ((value?: string, label?: string) => void) | ((value?: string) => void);
  inputLabel: string;
  isModalWeightInputVisible: boolean;
  setModalWeightInputVisible: (isOpen: boolean) => void;
}

const NumberInput = (props: IProps) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "0", "."];
  const [weightString, setWeightString] = useState("0");

  const handleInput = (value: string) => {
    switch(value) {
      case "0":
        if (weightString == "0") {
          break;
        } else {
          if (weightString.length == 0) {
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
        if (weightString.slice(-1) == ".") {
          break;
        } else if (weightString.includes(".")) {
          break;
        } else {
          setWeightString(weightString + value);
          break;
        }

      case "backspace":
        const weightStringCopy = weightString;
        const deleteLastCharacter = weightStringCopy.substring(0, weightStringCopy.length - 1);
        if (deleteLastCharacter.length == 0) {
          setWeightString("0");
        } else {
          setWeightString(deleteLastCharacter);
        }
        break;

      default:
        if (weightString == "0") {
          setWeightString(value);
        } else {
          setWeightString(weightString + value);
        }
        break;
    }
  }

  const handleButtons = (buttonAction: string) => {
    if (buttonAction === "ok") {
      props.toggleModal(weightString, props.inputLabel)
    } else if (buttonAction === "cancel") {
      props.toggleModal()
    }
    setWeightString("0");
  }

  return (
    <Modal
      isVisible={props.isModalWeightInputVisible}
      onBackButtonPress={() => props.setModalWeightInputVisible(false)}
      onBackdropPress={() => props.setModalWeightInputVisible(false)}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationInTiming={100}
      animationOutTiming={1}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={1}
    >
      <View style={s.modalContent}>
        <View style={s.container}>
          <View style={s.input}>
            <Text style={s.inputText}>{weightString} <Text style={s.inputTextLabel}>{props.inputLabel}</Text></Text>
            <Icon
              name="backspace"
              size={30}
              color={activeTheme.text}
              style={s.icon}
              onPress={() => handleInput("backspace")}
            />
          </View>

          <View style={s.numpad}>
            {buttons.map((value, index) => {
              return (
                <TouchableOpacity
                  key={"NumberInput_NumpadItem" + index}
                  style={s.numpadButton}
                  onPress={() => handleInput(value)}
                >
                  <Text style={s.numpadButtonText}>{value}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={s.bottomButtonsRow}>
            <Text style={s.bottomButtonsText} onPress={() => handleButtons("cancel")}>{selectedLocale.numberInputModal.cancelButtonLabel}</Text>
            <Text style={s.bottomButtonsText} onPress={() => handleButtons("ok")}>OK</Text>
          </View>

        </View>
      </View>
    </Modal>
  );
}

export default NumberInput;
