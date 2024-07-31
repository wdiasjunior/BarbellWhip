import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, NativeModules } from "react-native";
import Modal from "react-native-modal";

import RNFS from "react-native-fs";

import styles from "./updateModalStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atoms";
import { updateChecker } from "../../helpers/updateChecker";

interface IProps {
  isUpdateModalVisible: boolean;
  setUpdateModalVisible: (isVisible: boolean) => void;
  currentVersion: string
}

interface ICloseButton {
  hasMarginLeft?: boolean
}

const UpdateModal = (props: IProps) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [showUpdateCheckerSpinner, setShowUpdateCheckerSpinner] = useState(true);
  const [isGoBackDisabled, setIsGoBackDisabled] = useState(false);
  const [showDownloadSpinner, setShowDownloadSpinner] = useState(false);
  const [appVersionGithub, setAppVersionGithub] = useState<null | string>(null);
  const [hasUpdateAvailable, setHasUpadateAvailable] = useState(false);
  const [showIsDownloadCompleteMessage, setShowIsDownloadCompleteMessage] = useState(false);
  const [showDownloadErrorMessage, setShowDownloadErrorMessage] = useState(false);
  const [showUpdateCheckErrorMessage, setShowUpdateCheckErrorMessage] = useState(false);

  const { FileOpenerModule } = NativeModules;

  const url = `https://github.com/wdiasjunior/BarbellWhip/releases/download/v${appVersionGithub}/BarbellWhip_${appVersionGithub}.apk`
  const filePath = `${RNFS.ExternalCachesDirectoryPath}/BarbellWhip_${appVersionGithub}.apk`;

  const getAppVersionGithub = () => {
    fetch("https://raw.githubusercontent.com/wdiasjunior/BarbellWhip/main/package.json")
      .then(response => response.json())
      .then(json => setAppVersionGithub(json.version))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if(props.isUpdateModalVisible) {
      setAppVersionGithub(null);
      setShowUpdateCheckerSpinner(true);
      setShowUpdateCheckErrorMessage(false);
      setShowDownloadErrorMessage(false);
      getAppVersionGithub();
    }
  }, [props.isUpdateModalVisible])

  useEffect(() => {
    if (appVersionGithub !== null) {
      if(typeof appVersionGithub === "string") {
        if(updateChecker(props.currentVersion, appVersionGithub)) {
          setHasUpadateAvailable(true);
        } else {
          setHasUpadateAvailable(false);
        }
      } else {
        setShowUpdateCheckErrorMessage(true);
      }
      setShowUpdateCheckerSpinner(false);
    }
  }, [appVersionGithub])

  const checkForDownloadedUpdate = async (appVersion: string): booolean => {
    const fileName = `BarbellWhip_${appVersion}.apk`;

    const files = await RNFS.readDir(RNFS.ExternalCachesDirectoryPath);
    const fileExists = files.some(file => file.name === fileName);

    try {
      if (fileExists) {
        console.log(`The file ${fileName} exists in the directory.`);
        return true;
      } else {
        console.log(`The file ${fileName} does not exist in the directory.`);
        return false;
      }
    } catch(error) {
      console.log("Error reading directory: ", error);
      return false;
    }
  }

  const handleDownload = async () => {
    setIsGoBackDisabled(true);
    setShowDownloadSpinner(true);

    const hasUpdateDownloaded = await checkForDownloadedUpdate(appVersionGithub);

    if(hasUpdateDownloaded) {
      handleInstallAPK();
    } else {
      await RNFS.unlink(RNFS.ExternalCachesDirectoryPath)
              .then(() => console.log("Cache folder deleted"))
              .catch((err) => console.log(err.message));

      await RNFS.mkdir(RNFS.ExternalCachesDirectoryPath)
              .then(() => console.log("Cache folder created"))
              .catch((err) => console.log(err.message));

      await RNFS.downloadFile({
              fromUrl: url,
              toFile: filePath,
              progress: (res) => {
                const progress = (res.bytesWritten / res.contentLength) * 100;
                console.log(`Progress: ${progress.toFixed(2)}%`);
              },
            }).promise.then((response) => console.log("File downloaded!", response))
              .catch((err) => {
                console.log("Download error:", err);
                setShowDownloadSpinner(false);
                setShowDownloadErrorMessage(true);
                setIsGoBackDisabled(false);
                return;
              });
    }
    setShowDownloadSpinner(false);
    setShowIsDownloadCompleteMessage(true);
    setIsGoBackDisabled(false);
  }

  const handleInstallAPK = () => {
    FileOpenerModule.openFile(filePath);
  }

  const handleCloseModal = () => {
    props.setUpdateModalVisible(false);
    setShowIsDownloadCompleteMessage(false);
    setShowUpdateCheckErrorMessage(false);
    setShowDownloadErrorMessage(false);
  }

  const CloseButton = ({ hasMarginLeft }: ICloseButton) => (
    <TouchableOpacity
      style={hasMarginLeft ? styles(activeTheme).buttonClose : styles(activeTheme).button}
      onPress={() => handleCloseModal()}
    >
      <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.closeModalButtonLabel}</Text>
    </TouchableOpacity>
  )

  return (
    <Modal
      isVisible={props.isUpdateModalVisible}
      onBackButtonPress={() => isGoBackDisabled ? false : handleCloseModal()}
      onBackdropPress={() => isGoBackDisabled ? false : handleCloseModal()}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationInTiming={100}
      animationOutTiming={1}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={1}
    >
      <View style={styles(activeTheme).container}>
        {(showUpdateCheckerSpinner && !showUpdateCheckErrorMessage) &&
          <View style={styles(activeTheme).row}>
            <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.searchingForUpdates}</Text>
            <ActivityIndicator
            size="small"
            style={styles(activeTheme).spinner}
            color={activeTheme.textFaded}
            />
          </View>
        }

        {(hasUpdateAvailable && !showDownloadSpinner && !showIsDownloadCompleteMessage) &&
          <View>
            <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.updateAvailableMessage}</Text>
            <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.newVersionLabel}: {appVersionGithub}</Text>
            <View style={styles(activeTheme).buttonRow}>
              <TouchableOpacity
                style={styles(activeTheme).button}
                onPress={() => handleDownload()}
              >
                <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.downloadUpdateButton}</Text>
              </TouchableOpacity>
              <CloseButton hasMarginLeft />
            </View>
          </View>
        }

        {(typeof appVersionGithub === "string" && !hasUpdateAvailable && !showUpdateCheckErrorMessage) &&
          <View>
            <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.noUpdateAvailableMessage}</Text>
            <View style={styles(activeTheme).buttonRow}>
              <CloseButton />
            </View>
          </View>
        }

        {showDownloadSpinner &&
          <View style={styles(activeTheme).row}>
            <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.downloadingUpdateMessage}</Text>
            <ActivityIndicator
              size="small"
              style={styles(activeTheme).spinner}
              color={activeTheme.textFaded}
            />
          </View>
        }

        {(showIsDownloadCompleteMessage && !showDownloadSpinner && !showDownloadErrorMessage) &&
          <View>
            <Text style={styles(activeTheme).text}>
              {selectedLocale.settingsPage.downloadCompleteMessage}
            </Text>
            <View style={styles(activeTheme).buttonRow}>
              <TouchableOpacity
                style={styles(activeTheme).button}
                onPress={() => handleInstallAPK()}
              >
                <Text style={styles(activeTheme).text}>{selectedLocale.settingsPage.installUpdateButton}</Text>
              </TouchableOpacity>
              <CloseButton hasMarginLeft />
            </View>
          </View>
        }

        {showDownloadErrorMessage &&
          <View>
            <Text style={styles(activeTheme).text}>
              {selectedLocale.settingsPage.downloadErrorMessage}
            </Text>
            <View style={styles(activeTheme).buttonRow}>
              <CloseButton />
            </View>
          </View>
        }

        {showUpdateCheckErrorMessage &&
          <View>
            <Text style={styles(activeTheme).text}>
              {selectedLocale.settingsPage.updateCheckErrorMessage}
            </Text>
            <View style={styles(activeTheme).buttonRow}>
              <CloseButton />
            </View>
          </View>
        }

      </View>
    </Modal>
  );
}

export default UpdateModal;
