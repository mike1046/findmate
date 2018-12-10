// @flow

import React, { PureComponent } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Header, QuicksandText } from '../../../../components';
import { colors, navigation } from '../../../../global';
import { sendPhotoFacebook, addUploadingPhoto } from '../../../../redux/actions/onboarding';

import styles from './styles';

type Props = {
  navigation: Object,
  fbPhotos: [Object],
  sendPhotoFacebook: (Object) => void,
  addUploadingPhoto: (Object) => void,
};

type State = {
};

class UnconnectedFBPhotos extends PureComponent<Props, State> {

  state = {
  };

  onPressClose = () => {
    navigation.goBack();
  }

  onPressCancel = () => {
    navigation.goBack();
  }

  renderListEmptyComponent = () => (
    <View
      style={styles.emptyListView}
    >
      <QuicksandText style={styles.emptyListText}>
        No Photos
      </QuicksandText>
    </View>)

  sendPhotoFacebook = (image) => {
    const {
      props: {
        sendPhotoFacebook,
        addUploadingPhoto,
      },
    } = this;
    const path = image.images[0].source;
    const media = {
      uri: path,
      medium: path,
      name: image.id,
    };
    sendPhotoFacebook(media);
    addUploadingPhoto(media);
    navigation.goBack();
  }

  renderContentItem = item => (
    <TouchableOpacity
      onPress={() => this.sendPhotoFacebook(item)}
      style={styles.mediaLibraryItemContainer}
    >
      <Image
        source={{ uri: item.images[0].source }}
        resizeMode="contain"
        style={styles.imageItem}
      />
    </TouchableOpacity>
  )

  render() {
    const {
      props: {
        fbPhotos,
      },
    } = this;
    return (
      <View style={styles.container}>
        <Header>
          <QuicksandText style={styles.headerText}>
            Choose Photo
          </QuicksandText>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onPressClose}
          >
            <Icon name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        </Header>
        <FlatList
          data={fbPhotos}
          ListEmptyComponent={this.renderListEmptyComponent()}
          keyExtractor={item => item.id}
          renderItem={({ item }) => this.renderContentItem(item)}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fbPhotos: state.onboarding.fbPhotos,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendPhotoFacebook,
    addUploadingPhoto,
  }, dispatch,
);

export const FBPhotos = connect(mapStateToProps,
  mapDispatchToProps)(UnconnectedFBPhotos);
