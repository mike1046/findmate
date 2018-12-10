// @flow

import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';

type Props = {
  text: string,
  onPress: () => void,
  marginVertical? : number,
  isLoading?: boolean,
};

export const Button = ({ text, onPress, marginVertical, isLoading } : Props) => (

  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, marginVertical && { marginVertical }]}
  >
    {isLoading ? <ActivityIndicator size="small" color="white" />
      : (
        <Text style={styles.text}>
          {text}
        </Text>
      ) }
  </TouchableOpacity>
);
