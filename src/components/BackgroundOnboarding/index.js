// @flow

import React, { type Node, PureComponent } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import QuicksandText from '../QuicksandText';
import { images, colors } from '../../global';

import styles from './styles';

type Props = {
  children: Node,
  onCloseModal: () => void,
  onPressMenuButton: () => void,
  onPressMenu: () => void,
  isSettingsOpened: boolean,
  buttonMenuText: string,
};

type State = {
};

export default class BackgroundOnboarding extends PureComponent<Props, State> {
  render() {
    const {
      props: {
        onCloseModal,
        onPressMenuButton,
        isSettingsOpened,
        buttonMenuText,
        children,
        onPressMenu,
      },

    } = this;
    return (
      <ImageBackground
        source={images.backGroundImage}
        style={styles.container}
      >
        <Modal
          transparent
          animationType="fade"
          visible={isSettingsOpened}
          onRequestClose={() => onCloseModal()}
        >
          <TouchableWithoutFeedback
            onPress={() => onCloseModal()}
          >
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.modalStyle}
                onPress={() => onPressMenuButton()}
              >
                <QuicksandText>
                  {buttonMenuText}
                </QuicksandText>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.header}>
          <View style={styles.row}>
            <View
              style={styles.elevationLow}
            >
              <Image
                style={styles.icon}
                source={images.icon}
              />
            </View>

            <QuicksandText style={styles.headerText}>
              Findmate
            </QuicksandText>
          </View>
          <TouchableOpacity
            onPress={onPressMenu}
          >
            <Icon name="menu" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          {children}
        </View>
      </ImageBackground>
    );
  }
}
