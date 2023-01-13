import React from 'react';
import { View, Text } from 'react-native';

import styles from './plateStyles';

interface Props {
  weight: any;
  size: any;
  activeTheme: any;
  showBumper: boolean;
  bumperRack: any;
}

const Plate = (props) => {

  const findBumpers = (_weight) => {
    // console.log("aqui", Object.keys(props.bumperRack).some((a) => parseFloat(a) === _weight));

    // return Object.keys(props.bumperRack).some((bumperPlate) => {
    //   console.log("bumperPlate", bumperPlate, _weight);
    //   return parseFloat(bumperPlate) === _weight;
    //
    // });
console.log("parseFloat bumper 111111111111111111111111");

    for(const [key, value] of Object.entries(props.bumperRack)) {
      if(parseFloat(key) === _weight && value !== 0) {
        console.log(`bumper ${key}: ${value}`);
        return true;
      }
    }
    return false;
  }

  const computePlateStyle = () => {
    findBumpers(props.weight);
    // if(findBumpers(props.showBumper)) {
    // if(findBumpers(props.weight)) {
    //   // TODO
    //   // change size and color of the bumper
    //   const hScale = 0.5 + (0.5 * props.size);
    //   const wScale = 0.9 + (0.5 * props.size);
    //   return Object.assign({
    //     ...styles(props.activeTheme).plate}, {
    //       width: styles(props.activeTheme).plate.width * wScale,
    //       height: styles(props.activeTheme).plate.height * hScale
    //     });
    // } else {
      const hScale = 0.5 + (0.5 * props.size);
      const wScale = 0.7 + (0.3 * props.size);
      return Object.assign({
        ...styles(props.activeTheme).plate}, {
          width: styles(props.activeTheme).plate.width * wScale,
          height: styles(props.activeTheme).plate.height * hScale
        });
    // }
  }

  return (
    <View style={computePlateStyle(props.size)}>
      <Text adjustsFontSizeToFit style={styles(props.activeTheme).text}>{props.weight}</Text>
    </View>
  );
}

export default Plate;

// // animation
// import { UIManager } from 'react-native';
// UNSAFE_componentWillUpdate() {
//   // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental( true );
//   // LayoutAnimation.spring();
//   var CustomLayoutSpring = {
//     duration: 500,
//     create: {
//       type: LayoutAnimation.Types.spring,
//       property: LayoutAnimation.Properties.scaleXY,
//       springDamping: .8,
//     },
//     update: {
//       type: LayoutAnimation.Types.spring,
//       springDamping: 0.7,
//     },
//     delete: {
//       type: LayoutAnimation.Types.spring,
//     property: LayoutAnimation.Properties.scaleXY,
//     springDamping: 1,
//     initialVelocity: 0,
//     },
//   };
//
//   LayoutAnimation.configureNext( CustomLayoutSpring );
// }
