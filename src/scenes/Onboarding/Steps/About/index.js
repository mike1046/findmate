// @flow

import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens } from '../../../../global';
import { pastingDetected, sendAbout } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button } from '../../../../components';
import styles from './styles';

type Props = {
  setOnboarding: any => void,
  pastingDetected: () => void,
  sendAbout: (string, string, string) => void,
  profiles: Object,
  navigation: Object,
};
type State = {
  isSettingsOpened: boolean,
  name: string,
  headline: string,
  aboutYou: string,
  isPastingDetectionSent: boolean,
}

class UnconnectedAbout extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
    name: '',
    headline: '',
    aboutYou: '',
    isPastingDetectionSent: false,
  };

  componentDidMount() {
    const { profiles } = this.props;
    if (profiles) {
      if (profiles.steps) {
        if (profiles.steps.about.currentValues) {
          const { headline, description, slug } = profiles.steps.about.currentValues;
          this.setState({
            headline,
            aboutYou: description,
            name: slug,
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

  onPressNextButton = () => {
    const {
      props: {
        sendAbout,
      },
      state: {
        name, headline, aboutYou,
      },
    } = this;
    sendAbout(headline, aboutYou, name);
  }

  onChangeDescriptionText = (text) => {
    const {
      state: { isPastingDetectionSent },
      props: { pastingDetected },
    } = this;
    this.setState({ aboutYou: text });
    if (!isPastingDetectionSent) {
      pastingDetected();
      this.setState({ isPastingDetectionSent: true });
    }
  }

  goBack = () => {
    navigation.goBack();
  }

  render() {
    const {
      state: {
        isSettingsOpened,
        name,
        headline,
        aboutYou,
      },
      props: {
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
          header="About You"
        >
          <View style={styles.cardContent}>
            <View style={styles.subHeader}>
              <QuicksandText
                numberOfLines={5}
              >
                {'Name '}
              </QuicksandText>
              <QuicksandText
                style={styles.smallSubHeader}
                numberOfLines={5}
              >
                (use your first name, or make up a fun name)
              </QuicksandText>
            </View>

            <View style={[styles.textInputWrapper, styles.activeBorder]}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                style={styles.textInput}
                placeholderStyle={styles.textInput}
                placeholder="Your name"
                onChangeText={text => this.setState({ name: text })}
                value={name}
              />
            </View>
            <View style={styles.subHeader}>
              <QuicksandText
                numberOfLines={5}
              >
                {'Headline '}
              </QuicksandText>
              <QuicksandText
                style={styles.smallSubHeader}
                numberOfLines={5}
              >
                (shows in search)
              </QuicksandText>
            </View>
            <View style={[styles.textInputWrapper, styles.activeBorder]}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                style={styles.textInput}
                placeholderStyle={styles.textInput}
                placeholder="A quick bit about yourself"
                onChangeText={text => this.setState({ headline: text })}
                value={headline}
              />
            </View>
            <View style={styles.subHeader}>
              <QuicksandText
                numberOfLines={5}
              >
                {'About you  '}
              </QuicksandText>
              <QuicksandText
                style={styles.smallSubHeader}
                numberOfLines={5}
              >
                (shows on your profile)
              </QuicksandText>
            </View>
            <View style={[styles.textInputWrapper, styles.activeBorder]}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                style={[styles.textInput, styles.textAlignVertical, styles.heightContainer]}
                placeholderStyle={styles.textInput}
                maxLength={2000}
                multiline
                scrollEnabled
                placeholder={'What kind of person are you?\n\nWhat are your interest, hobbies, passions? \n\nDo not put any contact information or URLs in your profile'}
                onChangeText={text => this.onChangeDescriptionText(text)}
                value={aboutYou}
              />
            </View>
            <QuicksandText style={styles.remainingCharacters}>
              {`${2000 - aboutYou.length} characters remaining`}
            </QuicksandText>
            <Button
              text="Next"
              onPress={this.onPressNextButton}
            />

          </View>

        </SettingsCard>
      </BackgroundOnboarding>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profiles,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    pastingDetected,
    sendAbout,
  }, dispatch,
);

export const About = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAbout);
