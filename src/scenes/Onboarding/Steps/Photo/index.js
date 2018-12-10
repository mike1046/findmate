// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  SectionList,
  FlatList,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import Spinner from 'react-native-spinkit';
import ImagePicker from 'react-native-image-crop-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigation, screens, colors, utils, images } from '../../../../global';

import { sendPhoto, getImages, addUploadingPhoto, deleteImage, setAsPrimary, completeWithPhotos, getFacebookPhotos } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, ImageFullSize, Button } from '../../../../components';
import styles from './styles';

type Props = {
  sendPhoto: (Object) => void,
  addUploadingPhoto: (Object) => void,
  getImages: () => void,
  completeWithPhotos: () => void,
  deleteImage: (number) => void,
  setAsPrimary: (number) => void,
  onboarding: Object,
  steps: Object,
  navigation: Object,
  getFacebookPhotos: () => void,
};

type State = {
  isSettingsOpened: boolean,
  isImageMenuOpened: boolean,
  showImageFullSize: boolean,
  chosenImage: Object,
  chosenSection: string,
}

class UnconnectedPhoto extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
    isImageMenuOpened: false,
    showImageFullSize: false,
    chosenImage: {},
    chosenSection: '',
  };

  componentWillMount() {
    const { getImages } = this.props;
    getImages();
  }

  viewedImageurl = [];

  onCloseModal = () => {
    this.setState(
      {
        isSettingsOpened: false,
      },
    );
  }

  onCloseImageMenu = () => {
    this.setState(
      {
        isImageMenuOpened: false,
      },
    );
  }

  openImageFullSize = (image) => {
    // reactotron.log(image);
    this.viewedImageurl = [
      {
        url: image,
      },
    ];
    this.setState({ showImageFullSize: true });
  }

  onPressSignIn = () => {
    navigation.reset(screens.login);
  }

  onPressMenu = () => {
    const { isSettingsOpened } = this.state;
    this.setState({ isSettingsOpened: !isSettingsOpened });
  }

  onPressImage = (item, section) => {
    const { isImageMenuOpened } = this.state;
    if (section !== 'Uploading photos') {
      this.setState({ chosenImage: item,
        chosenSection: section,
        isImageMenuOpened: !isImageMenuOpened });
    }
  }

  onPressUpload = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      cropping: false,
    }).then((image) => {
      this.sendPhoto(image);
    });
  }

  sendPhoto = (image) => {
    const {
      props: {
        sendPhoto,
        addUploadingPhoto,
      },
    } = this;
    const media = {
      uri: image.path,
      medium: image.path,
      type: image.mime,
      name: Platform.OS === 'ios' ? image.filename : utils.generateInstanceId(),
      inctanceId: utils.generateInstanceId(),
    };
    sendPhoto(media);
    addUploadingPhoto(media);
  }

  onPressMakeNewPhoto = () => {
    ImagePicker.openCamera({
    }).then((image) => {
      this.sendPhoto(image);
    });
  }

  onPressNext = () => {
    const { completeWithPhotos } = this.props;
    completeWithPhotos();
  }

  setAsPrimaryImage = (image) => {
    // reactotron.log(image);
    const { setAsPrimary } = this.props;
    setAsPrimary(image.imageId);
  }

  deletePhoto = (image) => {
    const { deleteImage } = this.props;
    deleteImage(image.imageId);
  }

  onCloseFullSizeImage = () => {
    this.setState({ showImageFullSize: false });
  }

  createDataForSectionList = (onboarding) => {
    const sections = [];
    if (onboarding) {
      const { uploadingPhotos, privatePhotos, approvedPhotos } = onboarding;
      if (uploadingPhotos.length > 0) {
        sections.push({ title: 'Uploading photos', data: [uploadingPhotos] });
      }
      if (approvedPhotos.length > 0) {
        sections.push({ title: 'Approved Photos', data: [approvedPhotos] });
      }
      if (privatePhotos.length > 0) {
        sections.push({ title: 'Private Photos', data: [privatePhotos] });
      }
    }
    return sections;
  }

  renderItemSectionList = (data) => {
    const { title } = data.section;
    return (
      <FlatList
        keyExtractor={item => item.imageId}
        data={data.item}
        numColumns={3}
        renderItem={item => this.renderItemFlatList(item, title)}
        contentContainerStyle={styles.flatListContainer}
      />
    );
  }

  renderItemFlatList = (rowitem, title) => {
    const { item } = rowitem;
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.onPressImage(item, title)}
      >
        <ImageBackground
          style={styles.image}
          source={{ uri: item.medium }}
          defaultSource={images.defaultImage}
          imageStyle={styles.image}
        >
          {item.isPrimary && title === 'Approved Photos'
          && <Icon name="star" size={30} color={colors.starIcon} />}

        </ImageBackground>
        {title === 'Uploading photos' && (
        <View style={styles.uploading}>
          <Spinner
            color={colors.white}
            type="ThreeBounce"
            size={50}
          />
        </View>
        )}
      </TouchableOpacity>
    );
  }

  goBack = () => {
    navigation.goBack();
  }

  render() {
    const {
      state: {
        isImageMenuOpened,
        isSettingsOpened,
        showImageFullSize,
        chosenImage,
        chosenSection,
      },
      props: {
        onboarding,
        steps,
        navigation,
        getFacebookPhotos,
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
      <View style={styles.container}>
        <Modal
          transparent
          animationType="fade"
          visible={isImageMenuOpened}
          onRequestClose={this.onCloseImageMenu}
        >
          <TouchableWithoutFeedback
            onPress={this.onCloseImageMenu}
          >
            <View style={styles.container}>
              <View style={styles.modalStyle}>
                { chosenSection === 'Approved Photos' && (
                <TouchableOpacity
                  style={styles.imageMenuItem}
                  onPress={() => {
                    this.setState({ isImageMenuOpened: false });
                    this.setAsPrimaryImage(chosenImage);
                  }}
                >
                  <View style={styles.buttonsContainer}>
                    <Icon name="star" size={30} color={colors.starIcon} />
                    <QuicksandText>
                    Set as primary
                    </QuicksandText>
                  </View>
                </TouchableOpacity>
                )}
                { chosenSection === 'Private Photos' && (
                  <TouchableOpacity
                    style={styles.imageMenuItem}
                    onPress={() => {
                      this.setState({ isImageMenuOpened: false });
                      this.deletePhoto(chosenImage);
                    }}
                  >
                    <View style={styles.buttonsContainer}>
                      <Icon name="star" size={30} color={colors.starIcon} />
                      <QuicksandText>
                      Delete photo
                      </QuicksandText>
                    </View>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.imageMenuItem}
                  onPress={() => {
                    this.setState({ isImageMenuOpened: false });
                    this.openImageFullSize(chosenImage.large);
                  }}
                >
                  <View style={styles.buttonsContainer}>
                    <Icon name="fullscreen" size={30} color={colors.starIcon} />
                    <QuicksandText>
                      View Image Full Size
                    </QuicksandText>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <ImageFullSize
          visible={showImageFullSize}
          onClose={this.onCloseFullSizeImage}
          viewedImageurl={this.viewedImageurl}
        />
        <BackgroundOnboarding
          onCloseModal={this.onCloseModal}
          onPressMenu={this.onPressMenu}
          onPressMenuButton={settings ? this.goBack : this.onPressSignIn}
          isSettingsOpened={isSettingsOpened}
          buttonMenuText={settings ? 'Go back' : 'Sign In'}
        >
          <SettingsCard
            header="Add Photos"
          >
            <View style={styles.cardContent}>
              <ScrollView>

                <QuicksandText style={styles.grayText}>
                  {'Upload a photo of you clearly showing your face'}
                </QuicksandText>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={this.onPressUpload}
                  >
                    <Icon name="cloud-upload" size={30} color={colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={this.onPressMakeNewPhoto}
                  >
                    <Icon name="photo-camera" size={30} color={colors.black} />
                  </TouchableOpacity>
                  {steps.photo.facebookPhotos ? (
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => getFacebookPhotos()}
                    >
                      <MCIcon name="facebook" size={30} color={colors.facebookLogo} />
                    </TouchableOpacity>
                  ) : null }
                </View>
                <QuicksandText style={styles.grayText}>
                  {'Upload Photo'}
                </QuicksandText>
                <SectionList
                  renderItem={item => (
                    this.renderItemSectionList(item))}
                  // refreshing={profiles.isLoading}
                  renderSectionHeader={({ section: { title } }) => (
                    <QuicksandText style={styles.sectionListHeader}>
                      {title}
                    </QuicksandText>
                  )}
                  sections={this.createDataForSectionList(onboarding)}
                  keyExtractor={(item, index) => item.userId + index}
                  keyboardShouldPersistTaps="handled"
                />
                {onboarding.approvedPhotos.length > 0
                  && (
                  <Button
                    marginVertical={10}
                    onPress={this.onPressNext}
                    text="Done With Photos"
                  />
                  )
                }
              </ScrollView>
            </View>
          </SettingsCard>

        </BackgroundOnboarding>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  onboarding: state.onboarding,
  steps: state.profiles.steps,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendPhoto,
    getImages,
    deleteImage,
    setAsPrimary,
    addUploadingPhoto,
    completeWithPhotos,
    getFacebookPhotos,
  }, dispatch,
);

export const Photo = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPhoto);
