import React from "react";
import { View, Text, } from "react-native";
import Modal from "react-native-modal";

import styles from "./updateModalStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

interface Props {
  isUpdateModalVisible: boolean;
  setUpdateModalVisible: (isVisible: boolean) => void;
}

const UpdateModal = (props: Props) => {

  const activeTheme = useAtomValue(activeThemeAtom);

  // TODO - add spinner on request

  return (
    <Modal
      isVisible={props.isUpdateModalVisible}
      onBackButtonPress={() => props.setUpdateModalVisible(false)}
      onBackdropPress={() => props.setUpdateModalVisible(false)}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationInTiming={100}
      animationOutTiming={1}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={1}
    >
      <View style={styles(activeTheme).container}>
        <Text style={styles(activeTheme).text}>UpdateModal</Text>
      </View>
    </Modal>
  );
}

export default UpdateModal;
