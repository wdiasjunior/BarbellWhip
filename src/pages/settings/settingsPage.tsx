import React, { useState, useEffect, useLayoutEffect, } from "react";
import { Text, View, Switch, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './settingsPageStyles';

import { useAtom } from 'jotai';
import { activeThemeIdAtom, activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

import { themes } from "../../themes/";

const SettingsPage = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [activeThemeId, setActiveThemeId] = useAtom(activeThemeIdAtom);

  return (
    <View style={styles(activeTheme).container}>
        <Text style={styles(activeTheme).title}>Settings Page</Text>

        {/*<Text style={styles(activeTheme).subtitle}>Language</Text>*/}

        {/*<Text style={styles(activeTheme).subtitle}>
          Weights are rounded to 2.5kg so that it's easier on the head mid training session, and it's applied in every screen.
          In the future, it will be added a toggle so that you can disable this behaviour.
        </Text>*/}

        {/*<Text style={styles(activeTheme).subtitle}>Calculation Formulas - Select the formulas used to calculate your 1RM</Text>*/}

        {/* theme picker disabled until I find a way to change the Suspense fallback view background color with the color theme */}
        {/*<View style={styles(activeTheme).themeSelectorContainer}>
          <Text style={styles(activeTheme).themeSelectorTitle}>Theme:</Text>
          {themes.map((theme, index) => {
            return (
              <TouchableOpacity
                style={styles(activeTheme).themeSelectorItem}
                key={index}
                onPress={() => setActiveThemeId(theme.id)}
              >
                <View style={styles(activeTheme).themeSelectorIconContainer}>
                  {theme.id === activeThemeId &&
                    <Ionicons
                      name="checkmark-sharp"
                      size={20}
                      style={styles(activeTheme).themeSelectorIcon}
                    />
                  }
                </View>
                <Text style={styles(activeTheme).themeSelectorItemText}>{theme.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>*/}

    </View>
  );
}

// About
//
//   <div id="container">
//   <strong>By powerlifters, to powerlifters.</strong><br><br>
//
//   <br><p>An open source project created to make</p>
//   <p>training log a better experience.</p><br>
//
//   {/*<Text style={styles(activeTheme).subtitle}>For a tutorial on how to use this app click this link</Text>*/}
//
//   <p>To report bugs, suggest new features</p>
//   <p>or if want to contribute to the project</p>
//   <p>access the link below.</p><br>
//   <p><a style="color: #3dc2ff;" href="https://github.com/" target="_blank">GitHub Repository</a></p><br>
//
//   {/*<Text style={styles(activeTheme).subtitle}>About (made with eXtreme Go Horse process - XGH)</Text>*/}
//
//   <p>This app is ad free.<br>If you feel like it, please support the developer.</p><br>
//   <p><a style="color: #3dc2ff;" href="https://paypal.com/" target="_blank">Donate</a></p><br><br><br>
//   <p style="color: #ffffff">Created by Wellington Junior.</p>
//   </div>
//
//   {/*<Text style={styles(activeTheme).subtitle}>Version Number</Text>*/}
//   {/* add easter egg on multiple clicks */}

export default SettingsPage;
