// @flow

import React, { type Node } from 'react';
import { Text } from 'react-native';
import type {
  ____ViewStyleProp_Internal,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import styles from './styles';

type Props = $ReadOnly<{|
  style?: ____ViewStyleProp_Internal,
  children: Node,
  numberOfLines?: number,
|}>;

export default function ({ style, children, numberOfLines, ...props }: Props) {
  return (
    <Text style={[styles.text, style]} numberOfLines={numberOfLines} {...props}>
      {children}
    </Text>
  );
}
