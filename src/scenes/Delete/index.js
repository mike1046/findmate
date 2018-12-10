// @flow

import React, { PureComponent } from 'react';
import {
  Alert,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { images, navigation, screens } from '../../global';
import { setProfiles, requestPasswordConfirm } from '../../redux/actions/profile';
import { SettingsCard, QuicksandText } from '../../components';
import styles from './styles';

type Props = {
  passwordConfirmed: boolean,
  requestPasswordConfirm: (string) => void,
  setProfiles: (Object) => void,
  isLoading: boolean,
};
type State = {
  password: string,
  isInputActive: boolean,
  chosenReasonId: string,
  isReasonChosen: boolean,
  reasonText: string,
  lastStep: boolean,

}

class UnconnectedDelete extends PureComponent<Props, State> {

  state = {
    password: '',
    isInputActive: false,
    chosenReasonId: '1',
    isReasonChosen: false,
    reasonText: '',
    lastStep: false,

  };

  reasons = {
    '1': {
      'label': 'Getting too many notifications',
      'resolution': {
        'negativeResponse': "I don't want to disable notifications",
        'message': 'Did you know you can disable notifications if you are getting too many?',
        'label': 'Manage Notifications',
        'web': '/settings/notifications',
        'mobile': 'settings:notifications',
      },
    },
    '2': {
      'label': 'Received offensive messages',
      'resolution': {
        'negativeResponse': "I don't want to report a user",
        'message': "We're sorry to hear about that, we hope that you can report the user so they will be banned from the site.",
        'label': 'How to Report Users',
        'web': '/help/index#reporting',
        'mobile': 'help:reporting',
      },
    },
    '3': {
      'label': "I don't want people to see my profile",
      'resolution': {
        'negativeResponse': "I don't want to set my profile to private",
        'message': 'Did you know you can set your profile to private? Your profile will not be shown publicly.',
        'label': 'Edit Privacy',
        'web': '/settings/privacy',
        'mobile': 'settings:privacy',
      },
    },
    '4': {
      'label': 'I already found a partner',
      'resolution': {
        'negativeResponse': "I don't want to set my profile to private",
        'message': 'Did you know you can set your profile to private? Your profile will not be shown publicly.',
        'label': 'Edit Privacy',
        'web': '/settings/privacy',
        'mobile': 'settings:privacy',
      },
    },
    '5': {
      'label': "I'm having a technical issue",
      'resolution': {
        'negativeResponse': 'I not interested in solving my technical issue',
        'message': 'Have you checked out help section? We have several guides on troubleshooting issues.',
        'label': 'Get Technical Help',
        'web': '/help/index#technical',
        'mobile': 'help:technical',
      },
    },
    '7': {
      'label': "I didn't mean to sign up for this",
      'manualInput': true,
    },
    '8': {
      'label': "I'm not interested in a dating app",
      'manualInput': true,
    },
    '9': {
      'label': 'Other',
      'manualInput': true,
    },
  }

  onPressListItem= (key) => {
    this.setState(
      {
        chosenReasonId: key,
        isReasonChosen: true,
      },
    );
  }

  onPressCancel = () => {
    const {
      props: {
        setProfiles,
      },
    } = this;
    navigation.reset(screens.home);
    setProfiles({
      'passwordConfirmed': false,
    });
  }

  onPressContinue = () => {
    const {
      state: {
        password,
      },
      props: {
        requestPasswordConfirm,
      },
    } = this;
    requestPasswordConfirm(password);
  }

  onPressDeleteAccount = () => {

  }

  renderReasons = (data) => {
    const dataArray = Object.keys(data);
    const lastElement = dataArray.length - 1;
    return dataArray.map((key, index) => (
      <TouchableOpacity
        key={key}
        style={[styles.listElement, index === lastElement && styles.lastElement]}
        onPress={() => this.onPressListItem(key)}
      >
        <QuicksandText style={styles.plainText}>
          {data[key].label}
        </QuicksandText>
      </TouchableOpacity>
    ));
  }

  submitInputReason = (reasonText) => {
    if (reasonText === '') {
      Alert.alert('Please input the reason');
      return;
    }
    this.setState({
      lastStep: true,
    });
  }

  renderReasonsCard = () => (
    <SettingsCard
      header="Please tell us why you want to delete your account"
    >
      <QuicksandText style={styles.smallText}>
        {'We\'re always trying to improve our platform. Any feedback you have would be greatly appreciated.'}
      </QuicksandText>
      <View style={styles.reasonsContainer}>
        {this.renderReasons(this.reasons)}
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          onPress={() => this.onPressCancel()}
          style={[styles.cancelButton, styles.button]}
        >
          <QuicksandText>
            Cancel
          </QuicksandText>
        </TouchableOpacity>
      </View>
    </SettingsCard>
  )

  renderTellMoreCard = () => {
    const {
      state: {
        reasonText,
        chosenReasonId,
      },
      props: {
        isLoading,
      },
    } = this;
    return (
      <SettingsCard
        header={this.reasons[chosenReasonId].label}
      >
        <QuicksandText style={styles.smallText}>
          {'We\'re always trying to improve our platform. Any feedback you have would be greatly appreciated.'}
        </QuicksandText>
        <View style={[styles.textInputWrapper, styles.activeBorder]}>
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={reasonText => this.setState({ reasonText })}
            value={reasonText}
            onFocus={() => this.setState({ isInputActive: true })}
          />
        </View>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            onPress={() => this.onPressCancel()}
            style={[styles.cancelButton, styles.button]}
          >
            <QuicksandText>
             Cancel
            </QuicksandText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.continueButton, styles.button]}
            onPress={() => this.submitInputReason(reasonText)}
          >
            {isLoading ? <ActivityIndicator size="small" color="white" />
              : (
                <QuicksandText style={styles.continueText}>
                Continue
                </QuicksandText>
              )
          }
          </TouchableOpacity>
        </View>
      </SettingsCard>
    );
  }

  renderPasswordConfirmation = () => {
    const {
      state: {
        password,
        isInputActive,
      },
      props: {
        isLoading,
      },
    } = this;
    return (
      <SettingsCard
        header="We're sorry to see you go"
      >
        <QuicksandText>
          {'For security purposes enter your password.'}
        </QuicksandText>
        <View style={[styles.textInputWrapper, isInputActive && styles.activeBorder]}>
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={password}
            onFocus={() => this.setState({ isInputActive: true })}
          />
        </View>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            onPress={() => this.onPressCancel()}
            style={[styles.cancelButton, styles.button]}
          >
            <QuicksandText>
             Cancel
            </QuicksandText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.continueButton, styles.button]}
            onPress={() => this.onPressContinue()}
          >
            {isLoading ? <ActivityIndicator size="small" color="white" />
              : (
                <QuicksandText style={styles.continueText}>
                Continue
                </QuicksandText>
              )
          }
          </TouchableOpacity>
        </View>
      </SettingsCard>
    );
  };

  renderLastStep = () => {
    const {
      props: {
        isLoading,
      },
    } = this;
    return (
      <SettingsCard
        header={null}
      >
        <QuicksandText
          style={styles.confirmationMessage}
        >
          {'I understand this process is irreversable and that all of my account data will be deleted, and unrecoverable.'}
        </QuicksandText>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            onPress={() => this.onPressCancel()}
            style={[styles.cancelButton, styles.button]}
          >
            <QuicksandText>
             Cancel
            </QuicksandText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.continueButton, styles.button, styles.deleteAccountButton]}
            onPress={() => this.onPressDeleteAccount()}
          >
            {isLoading ? <ActivityIndicator size="small" color="white" />
              : (
                <QuicksandText style={styles.continueText}>
                Permanently Delete My Account
                </QuicksandText>
              )
          }
          </TouchableOpacity>
        </View>
      </SettingsCard>
    );
  };

  render() {
    const {
      props: {
        passwordConfirmed,
      },
      state: {
        isReasonChosen,
        lastStep,
      },
    } = this;
    return (
      <ImageBackground
        source={images.backGroundImage}
        style={styles.container}
      >
        {
          lastStep ? this.renderLastStep()
            : !passwordConfirmed ? this.renderPasswordConfirmation()
              : isReasonChosen ? this.renderTellMoreCard() : this.renderReasonsCard()
      }
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  passwordConfirmed: state.profiles.passwordConfirmed,
  isLoading: state.profiles.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setProfiles,
  requestPasswordConfirm,
}, dispatch);

export const Delete = connect(mapStateToProps, mapDispatchToProps)(UnconnectedDelete);
