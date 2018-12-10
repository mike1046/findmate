// @flow

import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens } from '../../../../global';
import { sendEmail, setOnboarding, requestUserStatus } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button } from '../../../../components';
import styles from './styles';

type Props = {
  sendEmail: (string) => void,
  mailMessage: string,
  setOnboarding: any => void,
  profiles: Object,
  emailSent: string | Object,
  requestUserStatus: () => void,
  navigation: Object,
};
type State = {
  isSettingsOpened: boolean,
  email: string,
}

class UnconnectedEmail extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
    email: '',
  };

  componentDidMount() {
    const { profiles } = this.props;
    if (profiles) {
      if (profiles.steps) {
        if (profiles.steps.email.currentValues) {
          const { email } = profiles.steps.email.currentValues;
          this.setState({
            email,
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

  sendEmailVerification = () => {
    const {
      state: {
        email,
      },
      props: {
        mailMessage,
        sendEmail,
        setOnboarding,
      },
    } = this;
    if (mailMessage) {
      setOnboarding({ 'mailMessage': null });
    }
    sendEmail(email);
  }

  onPressChangeEmail = () => {
    const { setOnboarding } = this.props;
    setOnboarding({ emailSent: null });
  }

  onPressConfirmVerifingEmail = () => {
    const { requestUserStatus } = this.props;
    requestUserStatus();
  }

  renderAskMailConfirmation = emailSent => (
    <View style={styles.cardContent}>
      <View>
        <QuicksandText>
          Please open your email to verify your address:
        </QuicksandText>
        <QuicksandText style={styles.email}>
          {emailSent}
        </QuicksandText>
      </View>

      <Button
        text="Ok"
        onPress={this.onPressConfirmVerifingEmail}
      />
      <QuicksandText
        style={styles.loginWithPhoneButton}
      >
              Login with Phone Number
      </QuicksandText>
      <QuicksandText
        onPress={this.onPressChangeEmail}
        style={styles.loginWithPhoneButton}
      >
              I need to change my email number
      </QuicksandText>
    </View>
  )

  onPressLoginWithPhone = () => {
    navigation.navigate(screens.phone);
  }

  goBack = () => {
    navigation.goBack();
  }

  render() {
    const {
      state: {
        isSettingsOpened,
        email,
      },
      props: {
        profiles,
        navigation,
        mailMessage,
        emailSent,
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
          header="Email"
        >
          {emailSent && !profiles.steps.email.complete ? this.renderAskMailConfirmation(emailSent)
            : (
              <View style={styles.cardContent}>
                <QuicksandText style={styles.subHeader}>
                Email Address
                </QuicksandText>
                <View style={[styles.textInputWrapper, styles.activeBorder]}>
                  <TextInput
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textContentType="emailAddress"
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholderStyle={styles.textInput}
                    placeholder="Example: your.email@gmail.com"
                    onChangeText={text => this.setState({ email: text })}
                    value={email}
                  />
                </View>
                <View style={styles.warningContainer}>
                  {mailMessage
                    ? (
                      <QuicksandText style={styles.warning}>
                        {mailMessage}
                      </QuicksandText>
                    ) : null
                }
                </View>
                <QuicksandText style={styles.grayText}>
              We will never send you spam.
                </QuicksandText>
                <QuicksandText style={styles.grayText}>
              You can one-click unsubscribe at any time.
                </QuicksandText>
                <Button
                  marginVertical={10}
                  text="Send Email Verification"
                  onPress={this.sendEmailVerification}
                />
                <QuicksandText
                  onPress={this.onPressLoginWithPhone}
                  style={styles.loginWithPhoneButton}
                >
              Login with Phone Number Instead
                </QuicksandText>
              </View>) }

        </SettingsCard>
      </BackgroundOnboarding>
    );
  }
}

const mapStateToProps = state => ({
  mailMessage: state.onboarding.mailMessage,
  profiles: state.profiles,
  emailSent: state.onboarding.emailSent,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestUserStatus,
    setOnboarding,
    sendEmail,
  }, dispatch,
);

export const Email = connect(mapStateToProps, mapDispatchToProps)(UnconnectedEmail);
