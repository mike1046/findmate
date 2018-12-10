// @flow

import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { images } from '../../global';

import styles from './styles';

type Props = {
  pictureUrl: string | any,
  onPress: () => void,
};

export const PortraitButton = ({
  pictureUrl, onPress,
}: Props) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPress}
      style={styles.elevationLow}
    >
      <Image
        style={styles.image}
        source={{ uri: pictureUrl }}
        defaultSource={images.defaultImage}
      />
    </TouchableOpacity>
  </View>
);
