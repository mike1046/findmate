// @flow

import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens } from '../../../../global';
import { setOnboarding, sendPassword } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button } from '../../../../components';
import styles from './styles';

type Props = {
  sendPassword: (string) => void,
  profiles: Object,
  passwordMessage: string,
  setOnboarding: (Object) => void,
  navigation: Object,
};
type State = {
  isSettingsOpened: boolean,
  password: string,
}

class UnconnectedPassword extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
    password: '',
  };

  componentDidMount() {
    const { profiles } = this.props;
    if (profiles) {
      if (profiles.steps) {
        if (profiles.steps.password.currentValues) {
          const { password } = profiles.steps.password.currentValues;
          this.setState({
            password,
          });
        }
      }
    }
  }

  onCloseModal = () => {
    this.setState(
      {
        isSettingsOpened: false,
      },
    );
  }

  onPressSignIn = () => {
    navigation.reset(screens.login);
  }

  onPressMenu = () => {
    const { isSettingsOpened } = this.state;
    this.setState({ isSettingsOpened: !isSettingsOpened });
  }

  goToBasicScreen = () => {
  }

  sendPasswordVerification = () => {
    const {
      state: {
        password,
      },
      props: {
        sendPassword,
        setOnboarding,
      },
    } = this;
    if (password.length < 6) {
      setOnboarding({ passwordMessage: 'Password should be at least 6 characters' });
      return;
    }
    sendPassword(password);
  }

  goBack = () => {
    navigation.goBack();
  }

  render() {
    const {
      state: {
        isSettingsOpened,
        password,
      },
      props: {
        passwordMessage,
        navigation,
      },
    } = this;
    let settings = false;
    if (navigation.state.params) {
      const { fromSettings } = navigation.state.params;
      if (fromSettings) {
        settings = true;
      }
    }
    return (
      <BackgroundOnboarding
        onCloseModal={this.onCloseModal}
        onPressMenu={this.onPressMenu}
        onPressMenuButton={settings ? this.goBack : this.onPressSignIn}
        isSettingsOpened={isSettingsOpened}
        buttonMenuText={settings ? 'Go back' : 'Sign In'}
      >
        <SettingsCard
          header="Password"
        >
          <View style={styles.cardContent}>
            <QuicksandText>
            Create a Password
            </QuicksandText>
            <View style={[styles.textInputWrapper, styles.activeBorder]}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry
                style={styles.textInput}
                placeholderStyle={styles.textInput}
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={password}
              />
            </View>
            <View style={styles.warningContainer}>
              {passwordMessage
                ? (
                  <QuicksandText style={styles.warning}>
                    {passwordMessage}
                  </QuicksandText>
                ) : null
              }
            </View>
            <Button
              text="Next"
              onPress={this.sendPasswordVerification}
            />
          </View>

        </SettingsCard>
      </BackgroundOnboarding>
    );
  }
}

const mapStateToProps = state => ({
  passwordMessage: state.onboarding.passwordMessage,
  profiles: state.profiles,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setOnboarding,
    sendPassword,
  }, dispatch,
);

export const Password = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPassword);
