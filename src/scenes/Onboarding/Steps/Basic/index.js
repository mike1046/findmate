// @flow

import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens, colors } from '../../../../global';
import { sendBasic } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button, GenderPicker } from '../../../../components';
import styles from './styles';

type Props = {
  data: Object,
  navigation: Object,
  gender: Object,
  sendBasic: (number, string) => void,
  profiles: Object,
  isLoading: boolean,
};
type State = {
  isSettingsOpened: boolean,
  chosenDate: any,
  chosenGender: number,
  shouldRenderDateWarning: boolean,
  shouldRenderGenderWarning: boolean,
}

// $FlowFixMe
console.ignoredYellowBox = ['Warning: Failed prop type'];

class UnconnectedBasic extends PureComponent<Props, State> {
  state = {
    isSettingsOpened: false,
    chosenDate: null,
    chosenGender: -1,
    shouldRenderDateWarning: false,
    shouldRenderGenderWarning: false,
  };

  componentDidMount() {
    const { profiles } = this.props;
    if (profiles) {
      if (profiles.steps) {
        if (profiles.steps.basic.currentValues) {
          const { dateOfBirth, gender } = profiles.steps.basic.currentValues;
          this.setState({
            chosenGender: gender,
            chosenDate: dateOfBirth,
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

  urlTerms = 'https://findmate.app/content/terms';

  onPressLink = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // reactotron.log('not supported link');
      }
    });
  }

  onPressNext = () => {
    const {
      props: {
        sendBasic,
      },
      state: {
        chosenDate,
        chosenGender,
      },
    } = this;
    if (chosenDate === '') {
      this.setState({ shouldRenderDateWarning: true });
      return;
    }
    if (chosenGender === -1) {
      this.setState({ shouldRenderGenderWarning: true });
      return;
    }

    sendBasic(chosenGender, this.convertDate(chosenDate));

    // navigation.reset(screens.seeking);
  }

  convertDate = date => moment(date).format('YYYY-MM-DD');

  getMinDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 100);
    return this.convertDate(date);
  }

  getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return this.convertDate(date);
  }

  renderDateWarning = () => (
    <QuicksandText style={styles.warning}>
      Please choose the date for your date of birth
    </QuicksandText>
  );

  renderGenderWarning = () => (
    <QuicksandText style={styles.warning}>
      Please choose your gender
    </QuicksandText>
  );

  goBack = () => {
    navigation.goBack();
  }

  render() {
    const {
      state: {
        isSettingsOpened,
        chosenGender,
        chosenDate,
        shouldRenderDateWarning,
        shouldRenderGenderWarning,
      },
      props: {
        navigation,
        gender,
        isLoading,
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
          header="Basic Information"
        >
          <View style={styles.cardContent}>
            <QuicksandText style={styles.subHeaderText}>
              Date of Birth
            </QuicksandText>

            {shouldRenderDateWarning && this.renderDateWarning()}
            <DatePicker
              androidMode="spinner"
              style={styles.datePicker}
              date={chosenDate}
              mode="date"
              placeholder="Choose date"
              format="YYYY-MM-DD"
              minDate={this.getMinDate()}
              maxDate={this.getMaxDate()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0,
                },
                dateInput: {
                  marginLeft: 0,
                  flex: 1,
                  width: '100%',
                  borderColor: colors.blueBorder,
                  borderRadius: 4,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ chosenDate: date,
                  shouldRenderDateWarning: false });
              }}
            />
            <GenderPicker
              text="I am ..."
              chosenGender={chosenGender}
              onPress={chosenGender => this.setState({ chosenGender })}
              gender={gender}
            />
            {shouldRenderGenderWarning && this.renderGenderWarning()}
            <View style={styles.termsContainer}>
              <QuicksandText style={styles.grayText}>
                {'By clicking "Next" you certify that you have read and agree to our'}
              </QuicksandText>
              <TouchableOpacity
                onPress={() => this.onPressLink(this.urlTerms)}
                // style={styles.url}
              >
                <QuicksandText style={styles.urlText}>
                  {'Terms & Conditions.'}
                </QuicksandText>
              </TouchableOpacity>
            </View>
            <Button
              onPress={this.onPressNext}
              text="Next"
              isLoading={isLoading}
            />

          </View>
        </SettingsCard>
      </BackgroundOnboarding>
    );
  }
}

const mapStateToProps = state => ({
  gender: state.cache.gender,
  profiles: state.profiles,
  isLoading: state.onboarding.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendBasic,
  }, dispatch,
);

export const Basic = connect(mapStateToProps, mapDispatchToProps)(UnconnectedBasic);
