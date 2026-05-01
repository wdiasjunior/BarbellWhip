import React, { useState, useLayoutEffect, useMemo } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import Share from "react-native-share";
import { pick as documentPick } from "@react-native-documents/picker";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "../../sharedComponents/header/header";
import Loading from "../../sharedComponents/loading/loading";

import { writeToJSON, importJSON, copyJSON, deleteJSON } from "../../db/fileSystem/fsWrite";
import { readJSON, readImportedJSON, readDirectory, getFileURI } from "../../db/fileSystem/fsRead";

import { useAtom, useSetAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  activeProgramAtom,
  activeProgramNameAtom,
  programPageSelectedDayAtom,
  programPageSelectedWeekAtom,
  programEditorDataAtom,
  selectedWeekAtom,
  selectedDayAtom,
  programEditorModeAtom,
  programNameForActionAtom,
  wasProgramSavedAtom,
} from "../../helpers/jotai/atoms";
import { useInitialRender } from "../../helpers/useInitialRender";
import { trainingProgramCleanUp } from "../../helpers/trainingProgramCleanUp";
import { checkProgramEditorData } from "../../helpers/checkProgramEditorData";

import styles from "./programEditorPageStyles";

type ProgramOptionModalAction = "setActive" | "edit" | "share" | "delete" | "copy";

const ProgramEditorPage = ({ navigation }) => {

  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const setActiveProgramData = useSetAtom(activeProgramAtom);
  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const [programList, setProgramList] = useState([]);
  const setSelectedWeek = useSetAtom(selectedWeekAtom);
  const setSelectedDay = useSetAtom(selectedDayAtom);
  const setProgramEditorMode = useSetAtom(programEditorModeAtom);
  const setProgramPageSelectedDay = useSetAtom(programPageSelectedDayAtom);
  const setProgramPageSelectedWeek = useSetAtom(programPageSelectedWeekAtom);
  const [programNameForAction, setProgramNameForAction] = useAtom(programNameForActionAtom);
  const [activeProgramName, setActiveProgramName] = useAtom(activeProgramNameAtom);
  const [wasProgramSaved, setWasProgramSaved] = useAtom(wasProgramSavedAtom);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalContentOption, setModalContentOption] = useState("programOptions");

  const onScreenLoad = () => {
    navigation.setOptions({
      headerTitle: () =>
        <Header
          title={selectedLocale.programEditorPage.title}
          import={true}
          importProgram={importProgram}
        />
    });
  }

  useLayoutEffect(() => {
    if (isInitialRender) {
      onScreenLoad();
      readDir();
    }
  }, [])

  useLayoutEffect(() => {
    if (isFocused) {
      readDir();
    }
  }, [isFocused])

  const saveProgram = async (fileName: string, programJSON: Object, isImport: boolean) => {
    if (isImport) {
      await importJSON(fileName, programJSON, false, selectedLocale.fileSystem.errorWriting);
    } else {
      await writeToJSON(fileName, programJSON, selectedLocale.fileSystem.errorWriting);
    }
    await readDir();
  }

  const deleteProgram = async (fileName: string) => {
    const fileURI = await getFileURI(fileName, selectedLocale.fileSystem.errorReading);
    await deleteJSON(fileURI, selectedLocale.fileSystem.errorDeleting);
    await readDir();
  }

  const readProgram = async (fileName: string) => {
    return JSON.parse(await readJSON(fileName.replace(".json", ""), selectedLocale.fileSystem.errorReading));
  }

  const readDir = async () => {
    setLoading(true);
    const _programList = await readDirectory(selectedLocale.fileSystem.errorReadingFileSystem);
    setProgramList(_programList);
    setLoading(false);
  }

  const copyProgram = async (fileName: string) => {
    const fileURI = await getFileURI(fileName, selectedLocale.fileSystem.errorReading);
    await copyJSON(fileName, fileURI, selectedLocale.fileSystem.errorCopying);
    await readDir();
  }

  const importProgram = async () => {
    let file: any;
    try {
      file = await documentPick();
    } catch {
      return; // user cancelled the picker
    }

    // if (file[0].type === "application/json") {
    // this apparently does not work in some older android versions for whatever
    // reason and returns type: "application/octet-stream". so I'm checking the file name
    // GoHorse is just doing it's thing I guess
    if (file[0].name.includes(".json")) {
      const fileContent = await readImportedJSON(file[0].uri, selectedLocale.fileSystem.errorReading);
      const programData = typeof fileContent === "string" ? JSON.parse(fileContent) : fileContent;
      await saveProgram(file[0].name, programData, true);
    } else {
      alert(selectedLocale.fileSystem.invalidFileType);
    }
  }

  const setupNewProgram = () => {
    setProgramEditorMode("Create");
    setSelectedWeek(0);
    setSelectedDay(0);
    setProgramEditorData({
      programName: "",
      weightUnit: "kg",
      oneRMs: [],
      trainingProgram: [ { week: new Array(7).fill({ day:[] }) } ]
    });
  }

  const handleFabButtonClick = () => {
    const isDefaultProgram = checkProgramEditorData(programEditorData);

    if (!isDefaultProgram && !wasProgramSaved) {
      setModalOpen(true);
      setModalContentOption("fabButtonOptions");
    } else {
      setWasProgramSaved(false);
      setupNewProgram();
      navigation.push("StepsTabs");
    }
  }

  const programOptionModal = async (action: ProgramOptionModalAction) => {
    let programData;
    if (action !== "newProgram" && action !== "continueEditing") {
      programData = await readProgram(programNameForAction);
    }
    switch(action) {
      case "setActive":
        const _cleanedUpProgramData = trainingProgramCleanUp(programData);
        setActiveProgramData(_cleanedUpProgramData);
        if (activeProgramName !== programNameForAction) {
          setActiveProgramName(programNameForAction);
          setProgramPageSelectedDay(0);
          setProgramPageSelectedWeek(0);
        }
        setModalOpen(false);
        break;
      case "edit":
        setWasProgramSaved(false);
        setProgramEditorMode("Edit");
        setSelectedWeek(0);
        setSelectedDay(0);
        setProgramEditorData(programData);
        navigation.push("StepsTabs");
        setModalOpen(false);
        break;
      case "share":
        const url = await getFileURI(programNameForAction, selectedLocale.fileSystem.errorReading);
        await Share.open({ url: `file://${url}` });
        setModalOpen(false);
        break;
      case "delete":
        // TODO
        // before deleting display a message "are you sure? this action cannot be undone."
        // modal button options - delete and cancel
        // calcel button with "danger" color?
        await deleteProgram(programNameForAction);
        setModalOpen(false);
        break;
      case "copy":
        await copyProgram(programNameForAction);
        setModalOpen(false);
        break;
      case "newProgram":
        setWasProgramSaved(false);
        setupNewProgram();
        navigation.push("StepsTabs");
        setModalOpen(false);
        break;
      case "continueEditing":
        setWasProgramSaved(false);
        setProgramEditorMode("Edit");
        setSelectedWeek(0);
        setSelectedDay(0);
        navigation.push("StepsTabs");
        setModalOpen(false);
        break;
      default:
        break;
    }
  }

  const s = useMemo(() => styles(activeTheme, insets.bottom), [activeTheme, insets.bottom]);

  return (
    <View style={s.container}>

      <TouchableOpacity onPress={handleFabButtonClick} style={[s.FabButton, s.shadowProp]}>
        <Text style={s.FabButtonText}>+</Text>
      </TouchableOpacity>

      {loading ? (
        <Loading />
      ) : (
        <View style={s.programList}>
          {programList?.length > 0 ? (
            <ScrollView style={s.programListWrapper} overScrollMode="never">
              <View style={s.programListWrapper}>
                {programList?.map((item: any, index: number) => {
                  if (item.name.includes(".json")) {
                    return (
                      <View
                        style={activeProgramName === item.name ? s.programItemSelected : s.programItem}
                        key={"ProgramEditorPage_ProgramListItem" + index}
                      >
                        <Text adjustsFontSizeToFit style={activeProgramName === item.name ? s.programItemSelectedText : s.programItemText}>{item.name.replace(".json", "")}</Text>
                        <Ionicons
                          size={24}
                          name="ellipsis-vertical"
                          color={activeProgramName === item.name ? s.programItemSelectedText.color : s.programItemText.color}
                          style={s.iconRight}
                          onPress={() => {
                            setModalContentOption("programOptions");
                            setModalOpen(true);
                            setProgramNameForAction(item.name);
                          }}
                        />
                      </View>
                    )
                  }
                })}
              </View>
            </ScrollView>
          ) : (
            <View style={s.noProgramListTextContainer}>
              <Text style={s.noProgramListText}>
                {selectedLocale.programEditorPage.noProgramListTextTitle}
              </Text>
              <Text style={s.noProgramListText}>
                {selectedLocale.programEditorPage.noProgramListTextSubtitle}
              </Text>
            </View>
          )}
        </View>
      )}

      <Modal
        isVisible={modalOpen}
        onBackButtonPress={() => setModalOpen(false)}
        onBackdropPress={() => setModalOpen(false)}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationInTiming={100}
        animationOutTiming={1}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={1}
      >
        {modalContentOption === "programOptions" ? (
          <View style={s.modalContent}>
            <TouchableOpacity style={s.modalItem} onPress={() => programOptionModal("setActive")}>
              <Text style={s.modalItemText}>{selectedLocale.programEditorPage.modal.setActive}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.modalItem} onPress={() => programOptionModal("edit")}>
              <Text style={s.modalItemText}>{selectedLocale.programEditorPage.modal.edit}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.modalItem} onPress={() => programOptionModal("share")}>
              <Text style={s.modalItemText}>{selectedLocale.programEditorPage.modal.share}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.modalItem} onPress={() => programOptionModal("copy")}>
              <Text style={s.modalItemText}>{selectedLocale.programEditorPage.modal.makeCopy}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.modalItem} onPress={() => programOptionModal("delete")}>
              <Text style={s.modalItemText}>{selectedLocale.programEditorPage.modal.delete}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={s.modalContent}>
            <TouchableOpacity style={s.modalItem} onPress={() => programOptionModal("newProgram")}>
              <Text style={s.modalItemText}>{selectedLocale.programEditorPage.modal.newProgram}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.modalItem} onPress={() => programOptionModal("continueEditing")}>
              <Text style={s.modalItemText}>{selectedLocale.programEditorPage.modal.continueEditing}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}

export default ProgramEditorPage;
