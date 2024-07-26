import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./calculationFormulasModalStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

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
      <View style={styles(activeTheme).container}>
        <Text style={styles(activeTheme).title}>{selectedLocale.settingsPage.calculationFormulasTitle}</Text>

        <TouchableOpacity
          style={styles(activeTheme).itemSelect}
          onPress={() => handleRMFormulas("epley")}
        >
          <View style={styles(activeTheme).iconContainer}>
            {_RMFormulas.epley &&
              <Ionicons
                name="checkmark-sharp"
                size={20}
                style={styles(activeTheme).icon}
              />
            }
          </View>
          <Text style={styles(activeTheme).itemSelectText}>Epley</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(activeTheme).itemSelect}
          onPress={() => handleRMFormulas("brzycki")}
        >
          <View style={styles(activeTheme).iconContainer}>
            {_RMFormulas.brzycki &&
              <Ionicons
                name="checkmark-sharp"
                size={20}
                style={styles(activeTheme).icon}
              />
            }
          </View>
          <Text style={styles(activeTheme).itemSelectText}>Brzycki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(activeTheme).itemSelect}
          onPress={() => handleRMFormulas("lombardi")}
        >
          <View style={styles(activeTheme).iconContainer}>
            {_RMFormulas.lombardi &&
              <Ionicons
                name="checkmark-sharp"
                size={20}
                style={styles(activeTheme).icon}
              />
            }
          </View>
          <Text style={styles(activeTheme).itemSelectText}>Lombardi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(activeTheme).itemSelect}
          onPress={() => handleRMFormulas("mayhew")}
        >
          <View style={styles(activeTheme).iconContainer}>
            {_RMFormulas.mayhew &&
              <Ionicons
                name="checkmark-sharp"
                size={20}
                style={styles(activeTheme).icon}
              />
            }
          </View>
          <Text style={styles(activeTheme).itemSelectText}>Mayhew</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(activeTheme).itemSelect}
          onPress={() => handleRMFormulas("mcglothin")}
        >
          <View style={styles(activeTheme).iconContainer}>
            {_RMFormulas.mcglothin &&
              <Ionicons
                name="checkmark-sharp"
                size={20}
                style={styles(activeTheme).icon}
              />
            }
          </View>
          <Text style={styles(activeTheme).itemSelectText}>McGlothin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(activeTheme).itemSelect}
          onPress={() => handleRMFormulas("oconner")}
        >
          <View style={styles(activeTheme).iconContainer}>
            {_RMFormulas.oconner &&
              <Ionicons
                name="checkmark-sharp"
                size={20}
                style={styles(activeTheme).icon}
              />
            }
          </View>
          <Text style={styles(activeTheme).itemSelectText}>OConner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(activeTheme).itemSelect}
          onPress={() => handleRMFormulas("wathen")}
        >
          <View style={styles(activeTheme).iconContainer}>
            {_RMFormulas.wathen &&
              <Ionicons
                name="checkmark-sharp"
                size={20}
                style={styles(activeTheme).icon}
              />
            }
          </View>
          <Text style={styles(activeTheme).itemSelectText}>Wathan</Text>
        </TouchableOpacity>

        <View style={styles(activeTheme).buttonRow}>
          <TouchableOpacity
            style={styles(activeTheme).buttonClose}
            onPress={() => handleCloseModal()}
          >
            <Text style={styles(activeTheme).buttonOkCloseText}>{selectedLocale.settingsPage.cancelModalButtonLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles(activeTheme).buttonOk}
            onPress={() => {
              props.setRMFormulas(_RMFormulas);
              handleCloseModal();
            }}
          >
            <Text style={styles(activeTheme).buttonOkCloseText}>{selectedLocale.settingsPage.okModalButtonLabel}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

export default CalculationFormulasModal;
