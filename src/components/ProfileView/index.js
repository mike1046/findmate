// @flow

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { images } from '../../global';

import styles from './styles';

type Props = {
  pictureUrl: string,
  cityName?: string,
  countryName: string,
  age?: number,
  onPressProfile: () => void,
};

export const ProfileView = ({
  pictureUrl,
  age,
  cityName,
  countryName,
  onPressProfile,
}: Props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPressProfile}
  >
    <View style={styles.elevationLow}>
      <Image
        style={styles.image}
        source={{ uri: pictureUrl }}
        defaultSource={images.defaultImage}
      />
    </View>
    {age && cityName
      ? (
        <Text
          numberOfLines={1}
          style={styles.cityText}
        >
          {`${age}, ${cityName}`}
        </Text>
      ) : null
  }
    <Text style={age ? styles.countryText : styles.lastSeen}>
      {countryName}
    </Text>
  </TouchableOpacity>
);
