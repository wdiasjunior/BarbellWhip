import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./calculationFormulasModalStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";

interface IProps {
  isCalculationFormulasModalVisible: boolean;
  setCalculationFormulasModalVisible: (isVisible: boolean) => void;
  RMFormulas: any;
  setRMFormulas: any;
}

const CalculationFormulasModal = (props: IProps) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [_RMFormulas, _setRMFormulas] = useState(props.RMFormulas);

  useEffect(() => {
    _setRMFormulas(props.RMFormulas);
  }, [props.RMFormulas]);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const handleCloseModal = () => {
    _setRMFormulas(props.RMFormulas);
    props.setCalculationFormulasModalVisible(false);
  }

  const handleRMFormulas = (formula: string) => {
    _setRMFormulas({..._RMFormulas, [formula]: !_RMFormulas[formula]});
  }

  return (
    <Modal
      isVisible={props.isCalculationFormulasModalVisible}
      onBackButtonPress={() => handleCloseModal()}
      onBackdropPress={() => handleCloseModal()}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationInTiming={100}
      animationOutTiming={1}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={1}
    >
      <View style={s.container}>
        <Text style={s.title}>{selectedLocale.settingsPage.calculationFormulasTitle}</Text>

        <TouchableOpacity
          style={s.itemSelect}
          onPress={() => handleRMFormulas("epley")}
        >
          <View style={s.iconContainer}>
            {_RMFormulas.epley &&
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
        <TouchableOpacity
          style={s.itemSelect}
          onPress={() => handleRMFormulas("brzycki")}
        >
          <View style={s.iconContainer}>
            {_RMFormulas.brzycki &&
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
        <TouchableOpacity
          style={s.itemSelect}
          onPress={() => handleRMFormulas("lombardi")}
        >
          <View style={s.iconContainer}>
            {_RMFormulas.lombardi &&
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
        <TouchableOpacity
          style={s.itemSelect}
          onPress={() => handleRMFormulas("mayhew")}
        >
          <View style={s.iconContainer}>
            {_RMFormulas.mayhew &&
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
        <TouchableOpacity
          style={s.itemSelect}
          onPress={() => handleRMFormulas("mcglothin")}
        >
          <View style={s.iconContainer}>
            {_RMFormulas.mcglothin &&
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
        <TouchableOpacity
          style={s.itemSelect}
          onPress={() => handleRMFormulas("oconner")}
        >
          <View style={s.iconContainer}>
            {_RMFormulas.oconner &&
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
        <TouchableOpacity
          style={s.itemSelect}
          onPress={() => handleRMFormulas("wathen")}
        >
          <View style={s.iconContainer}>
            {_RMFormulas.wathen &&
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

        <View style={s.buttonRow}>
          <TouchableOpacity
            style={s.buttonClose}
            onPress={() => handleCloseModal()}
          >
            <Text style={s.buttonOkCloseText}>{selectedLocale.settingsPage.cancelModalButtonLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.buttonOk}
            onPress={() => {
              props.setRMFormulas(_RMFormulas);
              handleCloseModal();
            }}
          >
            <Text style={s.buttonOkCloseText}>{selectedLocale.settingsPage.okModalButtonLabel}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

export default CalculationFormulasModal;
