import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, NativeModules } from "react-native";
import Modal from "react-native-modal";

import RNFS from 'react-native-fs';

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

  const { FileOpenerModule } = NativeModules;


  const url = `https://github.com/wdiasjunior/BarbellWhip/releases/download/v${props.appVersionGithub}/BarbellWhip_${props.appVersionGithub}.apk`
  const filePath = `${RNFS.ExternalCachesDirectoryPath}/BarbellWhip_${props.appVersionGithub}.apk`;

  // TODO
  // - add spinner on request
  // - "dont show again" option on auto check
  // - download to temp?
  //   - https://github.com/joltup/rn-fetch-blob

  // useEffect(() => {
  //   // Optional: Delete the file if it exists before downloading
  //   RNFS.unlink(filePath)
  //     .then(() => console.log('Previous file deleted'))
  //     .catch((err) => console.log(err.message));
  // }, [props.appVersionGithub])

  const handleDownload = () => {
    // RNFS.downloadFile({
    //   fromUrl: url,
    //   toFile: filePath,
    //   progress: (res) => {
    //     // Handle download progress updates if needed
    //     const progress = (res.bytesWritten / res.contentLength) * 100;
    //     console.log(`Progress: ${progress.toFixed(2)}%`);
    //   },
    // })
    //   .promise.then((response) => console.log('File downloaded!', response))
    //   .catch((err) => console.log('Download error:', err));
  }

  const handleInstallAPK = () => {
    FileOpenerModule.openFile(filePath);
  }
console.log(parseFloat(props.currentVersion), parseFloat(props.appVersionGithub));

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
        <Text style={styles(activeTheme).text}>{parseFloat(props.currentVersion) < parseFloat(props.appVersionGithub) ? "update available" : "no update available"}</Text>

        <TouchableOpacity
          style={styles(activeTheme).updateCheckerButton}
          onPress={() => handleDownload()}
        >
          <Text style={styles(activeTheme).text}>Download update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(activeTheme).updateCheckerButton}
          onPress={() => handleInstallAPK()}
        >
          <Text style={styles(activeTheme).text}>Install update</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default UpdateModal;
