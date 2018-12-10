// @flow

import React from 'react';
import { View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
import { QuicksandText } from '../../components';
import styles from './styles';
import { colors, images } from '../../global';

export const Splash = () => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 0.8, y: 1 }}
    colors={[colors.headerGradientLeft, colors.blue1]}
    style={styles.container}
  >
    <View style={styles.logoContainer}>
      <View style={styles.elevationLow}>
        <Image
          style={styles.logo}
          source={images.logo}
        />
      </View>
      <QuicksandText style={styles.header}>
      Findmate
      </QuicksandText>
      <Spinner
        style={styles.spinner}
        color={colors.white}
        type="ThreeBounce"
        size={50}
      />
    </View>

  </LinearGradient>

);
