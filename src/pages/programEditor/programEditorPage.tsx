import React, { useState, useLayoutEffect, } from "react";
import { Text, View, TouchableOpacity, ScrollView, } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import Share from "react-native-share";
import DocumentPicker from "react-native-document-picker";
import { useIsFocused } from "@react-navigation/native";

import Header from "../../sharedComponents/header/header";
import Loading from "../../sharedComponents/loading/loading";

import { writeToJSON, copyJSON, deleteJSON } from "../../db/fileSystem/fsWrite";
import { readJSON, readImportedJSON, readDirectory, returnFileURL } from "../../db/fileSystem/fsRead";

import { useAtom, useSetAtom } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  activeProgramAtom,
  activeProgramNameAtom,
  programPageSelectedDayAtom,
  programPageSelectedWeekAtom,
} from "../../helpers/jotai/atomsWithStorage";
import {
  programEditorDataAtom,
  selectedWeekAtom,
  selectedDayAtom,
  programEditorModeAtom,
} from "../../helpers/jotai/programEditorAtoms";
import { useInitialRender } from "../../helpers/useInitialRender";

import styles from "./programEditorPageStyles";

const ProgramEditorPage = ({ navigation }) => {

  const isFocused = useIsFocused();

  const isInitialRender = useInitialRender();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const setActiveProgramData = useSetAtom(activeProgramAtom); // TODO - test if useSetAtom works
  const setProgramEditorData = useSetAtom(programEditorDataAtom); // TODO - test if useSetAtom works
  const [programList, setProgramList] = useState([]);
  const setSelectedWeek = useSetAtom(selectedWeekAtom); // TODO - test if useSetAtom works
  const setSelectedDay = useSetAtom(selectedDayAtom); // TODO - test if useSetAtom works
  const setProgramEditorMode = useSetAtom(programEditorModeAtom); // TODO - test if useSetAtom works
  const setProgramPageSelectedDay = useSetAtom(programPageSelectedDayAtom); // TODO - test if useSetAtom works
  const setProgramPageSelectedWeek = useSetAtom(programPageSelectedWeekAtom); // TODO - test if useSetAtom works

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [programNameForAction, setProgramNameForAction] = useState("");
  const [activeProgramName, setActiveProgramName] = useAtom(activeProgramNameAtom);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={selectedLocale.programEditorPage.title}
                    import={true}
                    importProgram={importProgram}
                  />
              });
  }

  useLayoutEffect(() => {
    if(isInitialRender) {
      onScreenLoad();
      readDIR();
    }
  }, [])

  useLayoutEffect(() => {
    if(isFocused) {
      // TODO - reset navigation stack after leaving program editor stack?
      readDIR();
    }
  }, [isFocused])

  const saveProgram = async (fileName: string, programJSON: Object) => {
    await writeToJSON(fileName, programJSON);
    await readDIR();
  }

  const deleteProgram = async (fileName: string) => {
    const fileURL = await returnFileURL(fileName);
    await deleteJSON(fileURL);
    await readDIR();
  }

  const readProgram = async (fileName: string) => {
    return JSON.parse(await readJSON(fileName.replace(".json", "")));
  }

  const readDIR = async () => {
    setLoading(true);
    const _programList = await readDirectory();
    setProgramList(_programList);
    setLoading(false);
  }

  const copyProgram = async (fileName: string) => {
    const fileURL = await returnFileURL(fileName);
    await copyJSON(fileName, fileURL);
    await readDIR();
  }

  const importProgram = async () => {
    // TODO - write a test to check if the selected program is valid?
    const file = await DocumentPicker.pick();

    // if(file[0].type === "application/json") {
    // this apparently does not work in some older android versions for whatever
    // reason and returns type: "application/octet-stream". so I'm checking the file name
    // GoHorse is just doing it's thing I guess
    if(file[0].name.includes(".json")) {
      const fileContent = await readImportedJSON(file[0].uri);
      await saveProgram(file[0].name, JSON.parse(fileContent));
    } else {
      alert(selectedLocale.programEditorPage.importErrorMessage);
    }
  }

  const handleFabButtonClick = () => {
    setProgramEditorMode("Create");
    navigation.push("StepsTabs");
    setSelectedWeek(0);
    setSelectedDay(0);
    setProgramEditorData({
      programName: "",
      weightUnit: "kg",
      oneRMs: [],
      trainingProgram: [ { week: new Array(7).fill({ day:[] }) } ]
    });
  }

  const programOptionModal = async (action: string) => {
    const programData = await readProgram(programNameForAction);
    switch(action) {
      case "setActive":
        setActiveProgramData(programData);
        setProgramPageSelectedDay(0);
        setProgramPageSelectedWeek(0);
        if(activeProgramName !== programNameForAction) {
          setActiveProgramName(programNameForAction);
          setSelectedDay(0);
          setSelectedWeek(0);
        }
        setModalOpen(false);
        break;
      case "edit":
        setSelectedWeek(0);
        setSelectedDay(0);
        setProgramEditorData(programData);
        setModalOpen(false);
        setProgramEditorMode("Edit");
        navigation.push("StepsTabs");
        break;
      case "share":
        const url = await returnFileURL(programNameForAction);
        await Share.open({ url: `file://${url}` });
        setModalOpen(false);
        break;
      case "delete":
        // TODO - before deleting show message "are you sure? this action cannot be undone."
        // modal button options - delete and cancel
        await deleteProgram(programNameForAction);
        setModalOpen(false);
        break;
      case "copy":
        await copyProgram(programNameForAction);
        setModalOpen(false);
        break;
      default:
        break;
    }
  }

  return (
      <View style={styles(activeTheme).container}>

        <TouchableOpacity onPress={handleFabButtonClick} style={[styles(activeTheme).FabButton, styles(activeTheme).shadowProp]}>
          <Text style={styles(activeTheme).FabButtonText}>+</Text>
        </TouchableOpacity>

        {loading ? (
          <Loading />
        ) : (
          <View style={styles(activeTheme).programList}>
            {programList?.length > 0 ? (
              <ScrollView style={styles(activeTheme).programListWrapper} overScrollMode="never">
                <View style={styles(activeTheme).programListWrapper}>
                  {programList?.map((item, index) => { // TODO - add types?
                    if(item.name.includes(".json")) {
                      return (
                        <View
                          style={activeProgramName === item.name ? styles(activeTheme).programItemSelected : styles(activeTheme).programItem}
                          key={"ProgramEditorPage_ProgramListItem" + index}
                        >
                          <Text adjustsFontSizeToFit style={styles(activeTheme).programItemText}>{item.name.replace(".json", "")}</Text>
                          <Ionicons
                            name="ellipsis-vertical"
                            size={24}
                            style={styles(activeTheme).iconRight}
                            onPress={() => { setModalOpen(true); setProgramNameForAction(item.name); }}
                          />
                        </View>
                      )
                    }
                  })}
                </View>
              </ScrollView>
            ) : (
              <View style={styles(activeTheme).noProgramListTextContainer}>
                <Text style={styles(activeTheme).noProgramListText}>
                  {selectedLocale.programEditorPage.noProgramListTextTitle}
                </Text>
                <Text style={styles(activeTheme).noProgramListText}>
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
          <View style={styles(activeTheme).modalContent}>
            <TouchableOpacity style={styles(activeTheme).modalItem} onPress={() => programOptionModal("setActive")}>
              <Text style={styles(activeTheme).modalItemText}>{selectedLocale.programEditorPage.modal.setActive}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles(activeTheme).modalItem} onPress={() => programOptionModal("edit")}>
              <Text style={styles(activeTheme).modalItemText}>{selectedLocale.programEditorPage.modal.edit}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles(activeTheme).modalItem} onPress={() => programOptionModal("share")}>
              <Text style={styles(activeTheme).modalItemText}>{selectedLocale.programEditorPage.modal.share}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles(activeTheme).modalItem} onPress={() => programOptionModal("copy")}>
              <Text style={styles(activeTheme).modalItemText}>{selectedLocale.programEditorPage.modal.makeCopy}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles(activeTheme).modalItem} onPress={() => programOptionModal("delete")}>
              <Text style={styles(activeTheme).modalItemText}>{selectedLocale.programEditorPage.modal.delete}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
  );
}

export default ProgramEditorPage;
