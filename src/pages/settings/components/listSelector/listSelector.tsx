import React, { useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./listSelectorStyles";

interface IProps {
  title: string;
  data: Themes[] | Locales[];
  setSelected: (id: string) => void;
  selected: string;
  activeTheme: Theme;
}

const ListSelector = (props: IProps) => {
  const s = useMemo(() => styles(props.activeTheme), [props.activeTheme]);

  return (
    <View style={s.listSelectorContainer}>
      <Text style={s.listSelectorTitle}>{props.title}:</Text>
      {props.data.map((item: any, index: number) => {
        return (
          <TouchableOpacity
            style={s.listSelectorItem}
            key={index + "" + item.id}
            onPress={() => props.setSelected(item.id)}
          >
            <View style={s.listSelectorIconContainer}>
              {item.id === props.selected &&
                <Ionicons
                  size={20}
                  name="checkmark-sharp"
                  color={props.activeTheme.textHighlight}
                  style={s.listSelectorIcon}
                />
              }
            </View>
            <Text style={s.listSelectorItemText}>{item.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  );
}

export default ListSelector;
