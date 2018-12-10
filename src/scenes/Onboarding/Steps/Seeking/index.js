// @flow

import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens } from '../../../../global';

import { sendSeeking } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button, GenderPicker } from '../../../../components';
import styles from './styles';

type Props = {
  data: Object,
  profiles: Object,
  navigation: Object,
  gender: Object,
  sendSeeking: (number, number, number) => void,
  isLoading: boolean,
};

type State = {
  isSettingsOpened: boolean,
  chosenGender: number,
  age: [number, number], // Array<number>,
  shouldRenderGenderWarning: boolean,
}

class UnconnectedSeeking extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
    chosenGender: -1,
    age: [18, 65],
    shouldRenderGenderWarning: false,
  };

  componentDidMount() {
    const { profiles } = this.props;
    if (profiles) {
      if (profiles.steps) {
        if (profiles.steps.seeking.currentValues) {
          const { seeking, ageFrom, ageTo } = profiles.steps.seeking.currentValues;
          const age = [+ageFrom, +ageTo];
          this.setState({
            chosenGender: seeking,
            age,
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

  onPressNext = () => {
    // navigation.reset(screens.location);
    const {
      props: {
        sendSeeking,
      },
      state: {
        chosenGender,
        age,
      },
    } = this;
    if (chosenGender === -1) {
      this.setState({ shouldRenderGenderWarning: true });
      return;
    }

    sendSeeking(chosenGender, age[0], age[1]);

  }

  renderGenderWarning = () => (
    <QuicksandText style={styles.warning}>
      Please choose gender
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
        shouldRenderGenderWarning,
        age,
      },
      props: {
        gender,
        isLoading,
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
          header="Who do you want to meet"
        >
          <View style={styles.cardContent}>
            <GenderPicker
              onPress={chosenGender => this.setState({ chosenGender,
                shouldRenderGenderWarning: false })}
              text="I want to meet a..."
              chosenGender={chosenGender}
              gender={gender}
            />
            {shouldRenderGenderWarning && this.renderGenderWarning()}
            <QuicksandText style={styles.subHeaderText}>
              {`Age range (${age[0]} - ${age[1]})`}
            </QuicksandText>
            <View style={styles.multiSliderWrapper}>
              <MultiSlider
                markerStyle={styles.markerStyle}
                selectedStyle={styles.multiSliderSelected}
                values={age}
                sliderLength={240}
                onValuesChange={age => this.setState({ age })}
                min={18}
                max={65}
                step={1}
                allowOverlap
                snappe
              />
              <QuicksandText style={styles.grayText}>
                {'Only users in this age range will be able to see your profile'}
              </QuicksandText>
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
  steps: state.profiles.steps,
  profiles: state.profiles,
  gender: state.cache.gender,
  isLoading: state.onboarding.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendSeeking,
  }, dispatch,
);

export const Seeking = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSeeking);
