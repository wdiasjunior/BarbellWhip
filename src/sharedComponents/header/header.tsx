import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

import styles from "./headerStyles";

import { writeToJSON } from "../../db/fileSystem/fsWrite";
import { readJSON } from "../../db/fileSystem/fsRead";

import { useAtomValue, useSetAtom } from "jotai";
import {
  programEditorDataAtom,
  programEditorModeAtom,
  programNameForActionAtom,
} from "../../helpers/jotai/programEditorAtoms";
import {
  activeThemeAtom,
  activeProgramAtom,
  activeProgramNameAtom,
} from "../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../helpers/deepClone";

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

  const readProgram = async (fileName: string) => {
    return JSON.parse(await readJSON(fileName.replace(".json", "")));
  }

  const saveProgram = async () => {
    const fileName = programEditorData.programName;
    if(fileName !== "") {
      const programJSON = deepClone(programEditorData);
      await writeToJSON(fileName, programJSON);
      navigation.replace("ProgramEditorStack");
    } else {
      alert("Please fill in the program name field.")
    }
    if(programEditorMode === "Edit" && activeProgramName === programNameForAction) {
      const programData = await readProgram(programNameForAction);
      setActiveProgramData(programData);
    }
  }

  const importProgram = () => {
    if (props.importProgram) {
      props.importProgram();
    } else {
      console.log("could not import program");
    }
  }

  const setMenuOpenFromHeader = () => {
    if (props.setIsMenuOpen) {
      props.setIsMenuOpen(prev => !prev);
    } else {
      console.log("could not set menu open");
    }
  }

  const saveButton = async () => {
    // TODO
    // - add loading indicator overlay on save
    // - remove empty days and empty weeks on save
    await saveProgram();
  }

  const backButton = () => {
    // TODO
    // if(!navigation?.getState()?.routes[0]?.name === "Info") {
      // ask to save before goBack
      // prevent android back button goBack
      // console.log("stepOne");
      navigation.goBack();
    // }
  }

  return (
    <View style={styles(activeTheme).header}>
      <View style={styles(activeTheme).contentLeft}>
        {props.backButton ?
          <Ionicons
            name="arrow-back-sharp"
            size={24}
            style={styles(activeTheme).iconLeft}
            onPress={backButton}
          />
          :
          <Ionicons
            name="menu-sharp"
            size={24}
            style={styles(activeTheme).iconLeft}
            onPress={() => navigation.openDrawer()}
          />
        }
      </View>
      <View style={styles(activeTheme).contentCenter}>
        <Text adjustsFontSizeToFit style={styles(activeTheme).headerText}>{props.title} </Text>
      </View>
      <View style={styles(activeTheme).contentRight}>
        {props.menu &&
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            style={styles(activeTheme).iconRight}
            onPress={setMenuOpenFromHeader}
          />
        }
        {props.weightRack &&
          <Ionicons
            name="settings-sharp"
            size={24}
            style={styles(activeTheme).iconRight}
            onPress={() => navigation.push("WeightRackPage")}
          />
        }
        {props.import &&
          <Ionicons
            name="download-outline"
            size={24}
            style={styles(activeTheme).iconRight}
            onPress={importProgram}
          />
        }
        {props.saveButton &&
          <Entypo
            name="save"
            size={24}
            style={styles(activeTheme).iconRight}
            onPress={saveButton}
          />
        }
      </View>
    </View>
  );
}

export default Header;
