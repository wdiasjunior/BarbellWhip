import React from 'react';
import { View, Text } from 'react-native';

import styles from './plateStyles';

interface Props {
  weight: any;
  // size: any;
  activeTheme: any;
  weightUnit: any;
}

const Plate = (props: Props) => {
  // I don't linke this gambiarra but I guess we'll have to roll with this since WeightCalc.getPlatePercentOfMax is broken
  const plateDimensions = {
    kg: {
      25   : 1,
      20   : 1,
      15   : 0.75,
      10   : 0.5,
      5    : 0.25,
      2.5  : 0.125,
      1.25 : 0.0625,
    },
    lb: {
      100 : 1,
      55  : 1,
      45  : 1,
      35  : 1,
      25  : 1,
      15  : 1,
      10  : 1,
      5   : 1,
      2.5 : 1,
    }
  }

  const computePlateStyle = () => {
    // console.log(props.weight.plate, plateDimensions[props.weightUnit][props.weight.plate]);
    if(props.weight.isBumper) {
      return Object.assign({...styles(props.activeTheme).bumperPlate});
    } else {
      const hScale = 0.5 + (0.5 * plateDimensions[props.weightUnit][props.weight.plate]);
      const wScale = 0.7 + (0.3 * plateDimensions[props.weightUnit][props.weight.plate]);
      return Object.assign({
          ...styles(props.activeTheme).plate}, {
          width: styles(props.activeTheme).plate.width * wScale,
          height: styles(props.activeTheme).plate.height * hScale
        });
    }
  }

  return (
    <View style={computePlateStyle()}>
      <Text adjustsFontSizeToFit style={styles(props.activeTheme).text}>{props.weight.plate}</Text>
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
