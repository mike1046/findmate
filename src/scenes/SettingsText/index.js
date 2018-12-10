// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Linking,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearProfile } from '../../redux/actions/profile';
import { images, navigation, screens, colors } from '../../global';
import { SettingsCard, QuicksandText } from '../../components';
import styles from './styles';

type Props = {
  data: Object,
  clearProfile: () => void,
  navigation: Object,
};
type State = {
  isSettingsOpened: boolean,
}

class UnconnectedSettingsText extends PureComponent<Props, State> {

  headers = {
    'terms': 'Findmate Terms of Service',
    'privacy': 'Findmate Privacy Policy',
  };

  state = {
    isSettingsOpened: false,
  };

  urls = {
    terms: 'https://findmate.app/content/terms',
    privacy: 'https://findmate.app/content/privacy',
  };

  onCloseModal = () => {
    this.setState(
      {
        isSettingsOpened: false,
      },
    );
  }

  onPressSignOut = () => {
    const {
      props: {
        clearProfile,
      },
    } = this;
    navigation.reset(screens.login);
    clearProfile();
  }

  renderSections = (data: Object): any[] => Object.keys(data).map(key => (
    <QuicksandText
      key={data[key]}
    >
      {data[key]}
    </QuicksandText>
  ))

  onPressLink = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // reactotron.log('not supported link');
      }
    });
  }

  renderText = (key : string) => (
    <SettingsCard
      header={this.headers[key]}
    >
      {/* <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        {this.renderSections(this.text[key])}
      </ScrollView> */}
      <TouchableOpacity
        onPress={() => this.onPressLink(this.urls[key])}
        style={styles.url}
      >
        <QuicksandText style={styles.urlText}>
          {this.urls[key]}
        </QuicksandText>
      </TouchableOpacity>
    </SettingsCard>
  )

  onPressLogo = () => {
    navigation.reset(screens.home);
  }

  render() {
    const {
      state: {
        isSettingsOpened,
      },
      props: {
        navigation: {
          state: {
            params,
          },
        },
      },
    } = this;
    return (
      <ImageBackground
        source={images.backGroundImage}
        style={[styles.container, styles.background]}
      >
        <Modal
          transparent
          animationType="fade"
          visible={isSettingsOpened}
          onRequestClose={() => this.onCloseModal()}
        >
          <TouchableWithoutFeedback
            onPress={() => this.onCloseModal()}
          >
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.modalStyle}
                onPress={() => this.onPressSignOut()}
              >
                <QuicksandText>
                  Sign Out
                </QuicksandText>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.header}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => this.onPressLogo()}
              style={styles.elevationLow}
            >
              <Image
                style={styles.icon}
                source={images.icon}
              />
            </TouchableOpacity>

            <QuicksandText style={styles.headerText}>
              Findmate
            </QuicksandText>
          </View>
          <TouchableOpacity
            onPress={() => this.setState({ isSettingsOpened: !isSettingsOpened })}
          >
            <Icon name="menu" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>
        {this.renderText(params.key)}
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    clearProfile,
  }, dispatch,
);

export const SettingsText = connect(null, mapDispatchToProps)(UnconnectedSettingsText);
