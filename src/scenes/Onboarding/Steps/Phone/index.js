// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Switch,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens } from '../../../../global';
import { requestSmsPrivacyChange } from '../../../../redux/actions/settings';
import { loginKit } from '../../../../redux/actions/login';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button } from '../../../../components';
import styles from './styles';

type Props = {
  smsNotifications: any,
  requestSmsPrivacyChange: (boolean, string) => void,
  navigation: Object,
  loginKit: () => void,
};
type State = {
  isSettingsOpened: boolean,
}

class UnconnectedPhone extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
  };

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

  goBack = () => {
    navigation.goBack();
  }

  render() {
    const {
      state: {
        isSettingsOpened,
      },
      props: {
        requestSmsPrivacyChange,
        smsNotifications,
        navigation,
        loginKit,
      },
    } = this;
    const sms = smsNotifications === '1' || smsNotifications === true || smsNotifications === 1;
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
          header="Phone Verification"
        >
          <View style={styles.cardContent}>
            <QuicksandText>
            Login to Findmate using your phone number
            </QuicksandText>

            <View style={styles.switcherContainer}>
              <Switch
                value={sms}
                onValueChange={value => requestSmsPrivacyChange(value, 'setSmsNotifications')}
              />
              <QuicksandText style={styles.switcherText}>
                {sms ? 'Disable sms notifications' : 'Enable sms notifications'}
              </QuicksandText>
            </View>

            <Button
              text="Verify mobile number"
              onPress={loginKit}
            />
          </View>

        </SettingsCard>
      </BackgroundOnboarding>
    );
  }
}

const mapStateToProps = state => ({
  smsNotifications: state.settings.smsNotifications,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestSmsPrivacyChange,
    loginKit,
  }, dispatch,
);

export const Phone = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPhone);
