import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";

import styles from "./updateModalStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

interface Props {
  isUpdateModalVisible: boolean;
  setUpdateModalVisible: (isVisible: boolean) => void;
  currentVersion: string
  appVersionGithub: string | null
}

const UpdateModal = (props: Props) => {

  const activeTheme = useAtomValue(activeThemeAtom);

  // TODO
  // - add spinner on request
  // - "dont show again" option on auto check
  // - download to temp?
  //   - https://github.com/joltup/rn-fetch-blob

  const handleDownloadUpdate = () => {
    const url = `https://github.com/wdiasjunior/BarbellWhip/releases/download/v${appVersionGithub}/BarbellWhip_${appVersionGithub}.apk`
  }

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
        <Text style={styles(activeTheme).text}>{props.currentVersion}</Text>
        <Text style={styles(activeTheme).text}>{props.appVersionGithub}</Text>
      </View>
    </Modal>
  );
}

export default UpdateModal;
