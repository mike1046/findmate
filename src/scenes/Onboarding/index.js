// @flow

import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginFacebook } from '../../redux/actions/login';
import { createUser } from '../../redux/actions/onboarding';
import { navigation, screens, colors } from '../../global';
import { BackgroundOnboarding, QuicksandText } from '../../components';
import styles from './styles';

type Props = {
  navigation: Object,
  createUser: () => void,
  loginFacebook: () => void,
};
type State = {
  isSettingsOpened: boolean,
}

class UnconnectedOnboarding extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
  };

  onCloseModal = () => {
    this.setState(
      {
        isSettingsOpened: false,
      },
    );
  };

  onPressSignIn = () => {
    navigation.reset(screens.login);
  };

  renderSections = (data: Object): any[] => Object.keys(data).map(key => (
    <QuicksandText
      key={data[key]}
    >
      {data[key]}
    </QuicksandText>
  ))

  onPressMenu = () => {
    const { isSettingsOpened } = this.state;
    this.setState({ isSettingsOpened: !isSettingsOpened });
  };

  signUpWithEmailPhone = () => {
    const { createUser } = this.props;
    createUser();
  };

  signUpWithfacebook = () => {
    const { loginFacebook } = this.props;
    loginFacebook();
  };

  render() {
    const {
      state: {
        isSettingsOpened,
      },
    } = this;
    return (
      <BackgroundOnboarding
        onCloseModal={this.onCloseModal}
        onPressMenu={this.onPressMenu}
        onPressMenuButton={this.onPressSignIn}
        isSettingsOpened={isSettingsOpened}
        buttonMenuText="Sign In"
      >
        <QuicksandText style={styles.headerText}>
          Findmate
        </QuicksandText>
        <QuicksandText style={styles.subHeaderText}>
          {'Chat  ·  Meet  ·  Flirt'}
        </QuicksandText>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[colors.fbGradient.part1, colors.fbGradient.part2, colors.fbGradient.part3]}
          style={styles.gradientWrapper}
        >
          <TouchableOpacity
            style={[styles.signUpButton]}
            onPress={this.signUpWithfacebook}
          >
            <QuicksandText
              style={styles.signUpButtonText}
            >
            Signup with Facebook
            </QuicksandText>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[colors.mailPhoneGradient.part1, colors.mailPhoneGradient.part2]}
          style={styles.gradientWrapper}
        >
          <TouchableOpacity
            onPress={this.signUpWithEmailPhone}
            style={[styles.signUpButton]}
          >
            <QuicksandText
              style={styles.signUpButtonText}
            >
            Signup with Email / Phone
            </QuicksandText>
          </TouchableOpacity>
        </LinearGradient>
      </BackgroundOnboarding>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    createUser,
    loginFacebook,
  }, dispatch,
);

export const Onboarding = connect(null, mapDispatchToProps)(UnconnectedOnboarding);
