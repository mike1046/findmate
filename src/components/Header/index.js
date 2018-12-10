// @flow

import React, { type Node } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../global/colors';

import styles from './styles';

type Props = {
  children: Node,
};

export const Header = ({ children } : Props) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={[colors.headerGradientLeft, colors.blue1]}
  >
    <View style={styles.headerStyle}>
      {children}
    </View>
  </LinearGradient>
);
