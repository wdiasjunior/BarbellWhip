import React from 'react';
import { View, Text } from 'react-native';

import styles from './plateStyles';

interface Props {
  weight: any;
  size: any;
  activeTheme: any;
}

const Plate = (props: Props) => {

  const computePlateStyle = (_size) => {
    // console.log(_size);
    const size = isNaN(_size) ? 1 : _size;
    // console.log(size);

    if(props.weight.isBumper) {
      return Object.assign({...styles(props.activeTheme).bumperPlate});
    } else {
      const hScale = 0.5 + (0.5 * size);
      const wScale = 0.7 + (0.3 * size);
      return Object.assign({
          ...styles(props.activeTheme).plate}, {
          width: styles(props.activeTheme).plate.width * wScale,
          height: styles(props.activeTheme).plate.height * hScale
        });
    }
  }
// computePlateStyle(props.size)
  return (
    <View style={computePlateStyle(props.size)}>
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
