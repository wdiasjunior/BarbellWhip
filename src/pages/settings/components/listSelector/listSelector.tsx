import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./listSelectorStyles";

interface Props {
  title: string;
  data: Themes[] | Locales[];
  setSelected: (id: string) => void;
  selected: string;
  activeTheme: Theme
}

const ListSelector = (props: Props) => {
  return (
    <View style={styles(props.activeTheme).listSelectorContainer}>
      <Text style={styles(props.activeTheme).listSelectorTitle}>{props.title}:</Text>
      {props.data.map((item: any, index: number) => {
        return (
          <TouchableOpacity
            style={styles(props.activeTheme).listSelectorItem}
            key={index + "" + item.id}
            onPress={() => props.setSelected(item.id)}
          >
            <View style={styles(props.activeTheme).listSelectorIconContainer}>
              {item.id === props.selected &&
                <Ionicons
                  name="checkmark-sharp"
                  size={20}
                  style={styles(props.activeTheme).listSelectorIcon}
                />
              }
            </View>
            <Text style={styles(props.activeTheme).listSelectorItemText}>{item.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default ListSelector;
