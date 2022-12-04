import React from "react";
import { Text, View, FlatList, Button, ScrollView, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './headerStyles';

import { writeToJSON } from "../../db/fileSystem/fsWrite";

import { useAtom } from 'jotai';
import { programEditorDataAtom } from "../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../helpers/deepClone";

interface Props {
  setIsMenuOpen(): any;
  title: string;
  menu: boolean;
  saveButton: boolean;
  backButton: boolean;
  import: boolean;
  importProgram(): any;
}

export default Header = (props: Props) => {

  const navigation = useNavigation();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);

  const saveProgram = async () => {
    const fileName = programEditorData.programName;
    if(fileName !== "") {
      const programJSON = deepClone(programEditorData);
      console.log(programJSON,"programJSON")
      await writeToJSON(fileName, programJSON);
      navigation.replace("ProgramEditorStack");
    } else {
      alert("Please fill in the program name field.")
    }
  }

  const importProgram = () => {
    props.importProgram();
  }

  const setMenuOpenFromHeader = () => {
    props.setIsMenuOpen(prev => !prev);
  }

  const saveButton = async () => {
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
          <Icon
            name="arrow-back-sharp"
            size={24}
            style={styles(activeTheme).iconLeft}
            onPress={backButton}
          />
          :
          <Icon
            name="menu-sharp"
            size={24}
            style={styles(activeTheme).iconLeft}
            onPress={() => navigation.openDrawer()}
          />
        }
      </View>
      <View style={styles(activeTheme).contentRight}>
        <Text style={styles(activeTheme).headerText}> {props.title} </Text>
        {props.menu &&
          <Icon
            name="ellipsis-vertical"
            size={24}
            style={styles(activeTheme).iconRight}
            onPress={setMenuOpenFromHeader}
          />
        }
        {props.import &&
          <Icon
            name="download-outline"
            size={24}
            style={styles(activeTheme).iconRight}
            onPress={importProgram}
          />
        }
        {props.saveButton &&
          <Icon
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
