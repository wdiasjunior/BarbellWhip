import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

import styles from "./headerStyles";

import { writeToJSON } from "../../db/fileSystem/fsWrite";

import { useAtom } from "jotai";
import { programEditorDataAtom } from "../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../helpers/deepClone";

interface Props {
  setIsMenuOpen?: (isOpen: boolean) => void;
  title: string;
  menu?: boolean;
  weightRack?: boolean;
  saveButton?: boolean;
  backButton?: boolean;
  import?: boolean;
  importProgram?: () => void;
}

const Header = (props: Props) => {

  const navigation = useNavigation();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [programEditorData, ] = useAtom(programEditorDataAtom);

  const saveProgram = async () => {
    const fileName = programEditorData.programName;
    if(fileName !== "") {
      const programJSON = deepClone(programEditorData);
      await writeToJSON(fileName, programJSON);
      navigation.replace("ProgramEditorStack");
    } else {
      alert("Please fill in the program name field.")
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
