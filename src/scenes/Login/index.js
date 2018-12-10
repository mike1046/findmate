// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loginFacebook, loginKit, requestTokenEmail } from '../../redux/actions/login';
import LoginIcon from '../../components/LoginIcon';
import styles from './styles';
import { Button } from '../../components/Button';
import { colors, navigation, screens } from '../../global';
import { QuicksandText } from '../../components';

type Props = {
  requestTokenEmail: (string, string) => void,
  loginFacebook: () => void,
  loginKit: () => void,
};

class UnconnectedLogin extends PureComponent<Props, *> {

  state = {
    isEmailLoginChosen: false,
    isPhoneLoginChosen: false,
    isFacebookLoginChosen: false,
    email: '',
    password: '',
  };

  onPressLoginEmail = () => {
    const {
      props: {
        requestTokenEmail,
      },
      state: {
        email,
        password,
      },
    } = this;
    requestTokenEmail(email, password);

  }

  onPressEmail = () => {
    this.setState({ isEmailLoginChosen: true,
      isPhoneLoginChosen: false,
      isFacebookLoginChosen: false,
    });
  };

  onPressPhone = () => {

    reactotron.log('phone pressed');
    this.setState({ isEmailLoginChosen: false,
      isPhoneLoginChosen: true,
      isFacebookLoginChosen: false,
    });
  };

  onPressLoginMobile = () => {
    const {
      props: {
        loginKit,
      },
    } = this;
    reactotron.log('mobile login pressed');
    loginKit();
  };

  onPressFacebook =() => {
    const {
      props: {
        loginFacebook,
      },
    } = this;
    this.setState({ isEmailLoginChosen: false,
      isPhoneLoginChosen: false,
      isFacebookLoginChosen: true,
    });
    loginFacebook();
  };

  renderEmailLogin =() => {
    const {
      state: {
        email,
        password,
      },
    } = this;
    return (
      <View style={styles.flexContainer}>
        <View style={styles.textInputWrapper}>
          <TextInput
            autoCapitalize="none"
            textContentType="emailAddress"
            underlineColorAndroid={colors.underline}
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={email}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            underlineColorAndroid={colors.underline}
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={password}
          />
        </View>
        <Button
          text="Login"
          onPress={() => this.onPressLoginEmail()}
        />
      </View>
    );
  };

  renderPhoneLogin = () => (
    <Button
      text="Login With Mobile Number"
      onPress={() => this.onPressLoginMobile()}
    />);

  render() {
    const {
      state: {
        isEmailLoginChosen,
        isPhoneLoginChosen,
      },
    } = this;
    return (
      <View style={styles.container}>
        <View style={styles.formViewContainer}>
          <View style={styles.flexContainer}>
            <Text style={styles.headerText}>
          Login to Findmate
            </Text>
            <View style={styles.loginButtonsContainer}>
              <LoginIcon
                icon="email"
                loginName="Email"
                onPress={this.onPressEmail}
              />
              <LoginIcon
                icon="phone-android"
                loginName="Phone"
                onPress={this.onPressPhone}
              />
              <LoginIcon
                icon="facebook-square"
                loginName="Facebook"
                onPress={this.onPressFacebook}
              />
            </View>
            {isEmailLoginChosen && this.renderEmailLogin()}
            {isPhoneLoginChosen && this.renderPhoneLogin()}
          </View>
          <TouchableOpacity
            onPress={() => navigation.reset(screens.onboarding)}
            style={styles.createNewAccountContainer}
          >
            <QuicksandText>
              + Create a new account
            </QuicksandText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loginFacebook, loginKit, requestTokenEmail }, dispatch);

export const Login = connect(null, mapDispatchToProps)(UnconnectedLogin);
