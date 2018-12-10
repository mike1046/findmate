// @flow

import React, { type Node } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import QuicksandText from '../QuicksandText';

type Props = {
  header?: string,
  children: Node,
  textButton?: string,
  onPressTextButton?: () => void,
};

export const SettingsCard = ({ header, children, textButton, onPressTextButton } : Props) => (
  <View style={styles.container}>
    <View style={styles.elevationLow}>
      {
        header !== null && (
        <View style={styles.header}>
          <QuicksandText style={styles.headerText}>
            {header}
          </QuicksandText>
          {textButton && onPressTextButton
            && (
              <Text
                onPress={onPressTextButton}
                style={styles.textButton}
              >
                {textButton}
              </Text>
            ) }
        </View>) }
      <View style={styles.margin}>
        {children}
      </View>
    </View>
  </View>
);
