import React, { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

import styles from "./headerStyles";

import { writeToJSON } from "../../db/fileSystem/fsWrite";
import { readJSON } from "../../db/fileSystem/fsRead";

import { useAtomValue, useSetAtom } from "jotai";
import {
  activeThemeAtom,
  activeProgramAtom,
  activeProgramNameAtom,
  selectedLocaleAtom,
  programEditorDataAtom,
  programEditorModeAtom,
  programNameForActionAtom,
  wasProgramSavedAtom,
} from "../../helpers/jotai/atoms";

import { trainingProgramCleanUp } from "../../helpers/trainingProgramCleanUp";

interface IProps {
  setIsMenuOpen?: (isOpen: boolean) => void;
  title: string;
  menu?: boolean;
  weightRack?: boolean;
  saveButton?: boolean;
  backButton?: boolean;
  import?: boolean;
  importProgram?: () => void;
}

const Header = (props: IProps) => {

  const navigation = useNavigation();

  const activeTheme = useAtomValue(activeThemeAtom);
  const programEditorData = useAtomValue(programEditorDataAtom);
  const activeProgramName = useAtomValue(activeProgramNameAtom);
  const programEditorMode = useAtomValue(programEditorModeAtom);
  const programNameForAction = useAtomValue(programNameForActionAtom);
  const setActiveProgramData = useSetAtom(activeProgramAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const setWasProgramSaved = useSetAtom(wasProgramSavedAtom);
  const setProgramEditorData = useSetAtom(programEditorDataAtom);

  const readProgram = async (fileName: string) => {
    return JSON.parse(await readJSON(fileName.replace(".json", ""), selectedLocale.fileSystem.errorReading));
  }

  const saveProgram = useCallback(async () => {
    const fileName = programEditorData.programName || programNameForAction;
    if (fileName !== "") {
      const programJSON = { ...programEditorData };
      await writeToJSON(fileName, programJSON, selectedLocale.fileSystem.errorWriting);
      navigation.popToTop();
    } else {
      alert(selectedLocale.fileSystem.missingProgramName);
      return;
    }
    if (programEditorMode === "Edit" && activeProgramName === fileName) {
      const programData = await readProgram(fileName);
      const _cleanedUpProgramData = trainingProgramCleanUp(programData);
      setActiveProgramData(_cleanedUpProgramData);
    }
    setWasProgramSaved(true);
    setProgramEditorData({
      programName: "",
      weightUnit: "kg",
      oneRMs: [],
      trainingProgram: [ { week: new Array(7).fill({ day:[] }) } ]
    })
  }, [programEditorData, programNameForAction, programEditorMode, activeProgramName]);

  const importProgram = useCallback(() => {
    if (props.importProgram) {
      props.importProgram();
    } else {
      console.warn("Header: importProgram callback not provided");
    }
  }, [props.importProgram]);

  const setMenuOpenFromHeader = useCallback(() => {
    if (props.setIsMenuOpen) {
      props.setIsMenuOpen(prev => !prev);
    } else {
      console.warn("Header: setIsMenuOpen callback not provided");
    }
  }, [props.setIsMenuOpen]);

  const saveButton = useCallback(async () => {
    // TODO
    // add loading indicator overlay on save
    await saveProgram();
  }, [saveProgram]);

  const backButton = useCallback(() => {
    // TODO
    // if (!navigation?.getState()?.routes[0]?.name === "Info") {
      // ask to save before goBack
      // prevent android back button goBack
      // console.log("stepOne");
      navigation.goBack();
    // }
  }, [navigation]);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.header}>
      <View style={s.contentLeft}>
        {props.backButton ?
          <Ionicons
            size={24}
            name="arrow-back-sharp"
            color={activeTheme.text}
            style={s.iconLeft}
            onPress={backButton}
          />
          :
          <Ionicons
            size={24}
            name="menu-sharp"
            color={activeTheme.text}
            style={s.iconLeft}
            onPress={() => navigation.openDrawer()}
          />
        }
      </View>
      <View style={s.contentCenter}>
        <Text adjustsFontSizeToFit style={s.headerText}>{props.title}</Text>
      </View>
      <View style={s.contentRight}>
        {props.menu &&
          <Ionicons
            size={24}
            name="ellipsis-vertical"
            color={activeTheme.text}
            style={s.iconRight}
            onPress={setMenuOpenFromHeader}
          />
        }
        {props.weightRack &&
          <Ionicons
            size={24}
            name="settings-sharp"
            color={activeTheme.text}
            style={s.iconRight}
            onPress={() => navigation.push("WeightRackPage")}
          />
        }
        {props.import &&
          <Ionicons
            size={24}
            name="download-outline"
            color={activeTheme.text}
            style={s.iconRight}
            onPress={importProgram}
          />
        }
        {props.saveButton &&
          <Entypo
            size={24}
            name="save"
            color={activeTheme.text}
            style={s.iconRight}
            onPress={saveButton}
          />
        }
      </View>
    </View>
  );
}

export default Header;
