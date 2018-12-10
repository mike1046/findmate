// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import { RNCamera } from 'react-native-camera';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigation, screens, colors, utils } from '../../../../global';

import { sendVideo, skipVideoStep } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button } from '../../../../components';
import styles from './styles';

type Props = {
  sendVideo: (Object) => void,
  onboarding: Object,
  skipVideoStep: () => void,
  navigation: Object,
  isLoading: boolean,
};

type State = {
  isSettingsOpened: boolean,
  cameraOpened: boolean,
  recording: boolean,
  processing: boolean,
}

class UnconnectedVideo extends PureComponent<Props, State> {

  camera;

  state = {
    isSettingsOpened: false,
    cameraOpened: false,
    recording: false,
    processing: false,
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

  onPressUploadVideo = () => {
    const { sendVideo } = this.props;
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then((video) => {
      const media = {
        uri: video.path,
        type: video.mime,
        name: Platform.OS === 'ios' ? video.filename : utils.generateInstanceId(),
        inctanceId: utils.generateInstanceId(),
      };
      sendVideo(media);
    });
  }

  goBack = () => {
    navigation.goBack();
  }

  onPressCreateVideo = () => {
    this.setState({
      cameraOpened: true,
    });
  }

  startRecording = async () => {
    const { camera,
      props: {
        sendVideo,
      },
    } = this;
    if (camera) {
      this.setState({ recording: true });
      const { uri, codec = 'mp4' } = await camera.recordAsync();
      this.setState({ recording: false, processing: true });
      const type = `video/${codec}`;

      const media = {
        uri,
        type,
        name: utils.generateInstanceId(),
        inctanceId: utils.generateInstanceId(),
      };
      sendVideo(media);
      this.setState({ processing: false, cameraOpened: false });
    }
  }

  stopRecording = () => {
    const { camera } = this;
    if (camera) {
      camera.stopRecording();
      // this.onPressCloseVideo();
    }
  }

  onPressCloseVideo = () => {
    this.setState({
      cameraOpened: false,
      recording: false,
      processing: false,
    });
    this.camera = null;
  }

  render() {
    const {
      state: {
        isSettingsOpened,
        cameraOpened,
        recording,
        processing,
      },
      props: {
        skipVideoStep,
        navigation,
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
    let button = (
      <TouchableOpacity
        onPress={this.startRecording}
        style={styles.capture}
      >
        <QuicksandText style={styles.recordText}>
          RECORD
        </QuicksandText>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording}
          style={[styles.capture, styles.recordingCapture]}
        >
          <Text style={styles.recordText}>
            STOP
          </Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {!cameraOpened && (
        <BackgroundOnboarding
          onCloseModal={this.onCloseModal}
          onPressMenu={this.onPressMenu}
          onPressMenuButton={settings ? this.goBack : this.onPressSignIn}
          isSettingsOpened={isSettingsOpened}
          buttonMenuText={settings ? 'Go back' : 'Sign In'}
        >
          <SettingsCard
            header="Add a Video Intro"
          >
            <View style={styles.cardContent}>
              <ScrollView>

                <QuicksandText style={styles.grayText}>
                  {'Record a 30 second video, a great way to introduce yourself.'}
                </QuicksandText>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={this.onPressCreateVideo}
                  >
                    <Icon name="videocam" size={30} color={colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={this.onPressUploadVideo}
                  >
                    <Icon name="cloud-upload" size={30} color={colors.black} />
                  </TouchableOpacity>
                </View>
                <QuicksandText style={styles.grayText}>
                  {'Upload Video'}
                </QuicksandText>

                <Button
                  onPress={() => skipVideoStep()}
                  isLoading={isLoading}
                  text="Done With Video"
                />
              </ScrollView>
            </View>
          </SettingsCard>

        </BackgroundOnboarding>) }
        {cameraOpened && (
        <View style={styles.cameraContainer}>
          <RNCamera
            maxDuration={30}
            quality={RNCamera.Constants.VideoQuality['480p']}
            captureAudio
            ref={(ref) => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            permissionDialogTitle="Permission to use camera"
            permissionDialogMessage="We need your permission to use your camera phone"
          />
            {button}
          <TouchableOpacity
            style={styles.closeVideoButton}
            onPress={this.onPressCloseVideo}
          >
            <Icon name="close" size={30} color={colors.black} />
          </TouchableOpacity>
        </View>
        )
            }
      </View>

    );
  }
}

const mapStateToProps = state => ({
  onboarding: state.onboarding,
  isLoading: state.profiles.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendVideo,
    skipVideoStep,
  }, dispatch,
);

export const Video = connect(mapStateToProps, mapDispatchToProps)(UnconnectedVideo);
