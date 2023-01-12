import React from 'react';
import { View, Text } from 'react-native';

import styles from './plateStyles';

interface Props {
  weight: any;
  size: any;
  activeTheme: any;
  bumper: any;
}

const Plate = (props) => {

  const computePlateStyle = () => {
    // if(props.bumper) {
    //   // TODO
    //   // change size and color of the bumper
    // }
    const hScale = 0.5 + (0.5 * props.size);
    const wScale = 0.7 + (0.3 * props.size);
    return Object.assign({
      ...styles(props.activeTheme).plate}, {
        width: styles(props.activeTheme).plate.width * wScale,
        height: styles(props.activeTheme).plate.height * hScale
      });
  }

  return (
    <View style={computePlateStyle(props.size)}>
      <Text adjustsFontSizeToFit style={styles(props.activeTheme).text}>{props.weight}</Text>
    </View>
  );
}

export default Plate;

// // animation
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
