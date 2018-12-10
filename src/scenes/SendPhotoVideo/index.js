// @flow

import React, { PureComponent } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Header, QuicksandText } from '../../components';
import { colors, navigation, utils } from '../../global';
import { requestMediaLibrary, requestSendFromLibrary, addMessage, markLibraryItemSent } from '../../redux/actions/message';

import styles from './styles';

type Props = {
  navigation: Object,
  requestMediaLibrary: () => void,
  requestSendFromLibrary: (number, number, string, string) => void,
  addMessage: (Object, number) => void,
  message: Object,
  markLibraryItemSent: (number) => void,
  profiles: Object,
};

type State = {
  activeTab: 'upload' | 'library',
};

class UnconnectedSendPhotoVideo extends PureComponent<Props, State> {

  state = {
    activeTab: 'upload',
  };

  onPressClose = () => {
    navigation.goBack();
  }

  onPressCancel = () => {
    navigation.goBack();
  }

  onPressUploadPhoto = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      cropping: false,
    }).then((image) => {
      const {
        props: {
          navigation: {
            state: {
              params: {
                onAnyChange,
              },
            },
          },
        },
      } = this;
      onAnyChange(image, 'sendPhoto');
      navigation.goBack();
    });
  }

  onPressMakeNewPhoto = () => {
    ImagePicker.openCamera({
    }).then((image) => {
      const {
        props: {
          navigation: {
            state: {
              params: {
                onAnyChange,
              },
            },
          },
        },
      } = this;
      onAnyChange(image, 'sendPhoto');
      navigation.goBack();
    });
  }

  onPressUploadVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then((video) => {
      const {
        props: {
          navigation: {
            state: {
              params: {
                onAnyChange,
              },
            },
          },
        },
      } = this;
      onAnyChange(video, 'sendVideo');
      navigation.goBack();
    });
  }

  renderUpload = () => (
    <View style={styles.uploadContainer}>
      <TouchableOpacity
        onPress={this.onPressMakeNewPhoto}
        style={styles.uploadButton}
      >
        <Icon name="add-a-photo" size={40} color={colors.black} />
        <QuicksandText>
          Make New Photo
        </QuicksandText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={this.onPressUploadPhoto}
      >
        <Icon name="photo" size={40} color={colors.black} />
        <QuicksandText>
          Upload Photo
        </QuicksandText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={this.onPressUploadVideo}
        style={styles.uploadButton}
      >
        <Icon name="videocam" size={40} color={colors.black} />
        <QuicksandText>
          Upload Video
        </QuicksandText>
      </TouchableOpacity>
    </View>
  )

  renderListEmptyComponent = () => {
    const {
      props: {
        message: {
          isLibraryLoading,
        },
      },
    } = this;
    return (isLibraryLoading) ? null
      : (
        <View
          style={styles.emptyListView}
        >
          <QuicksandText style={styles.emptyListText}>
            No data yet
          </QuicksandText>
        </View>
      );
  };

  onPressItem = (item) => {
    const {
      props: {
        addMessage,
        markLibraryItemSent,
        profiles: {
          currentUser: {
            bio: {
              slug: userName,
            },
            images,
          },
          viewedUser: {
            meta: {
              userId,
            },
          },
        },
        requestSendFromLibrary,
      },
    } = this;
    // requestSendFromLibrary(userId, item.messageId);

    const message = {
    };
    message.user = {
      _id: 1,
      name: userName,
      avatar: images[0].medium,
    };
    message.createdAt = moment().format();
    message._id = utils.generateInstanceId();
    if (item.isPhoto) {
      message.image = item.content.photoLarge;
      requestSendFromLibrary(userId, item.messageId, 'photo', item.content.photoLarge);
    }
    if (item.isVideo) {
      message.video = item.content.url;
      requestSendFromLibrary(userId, item.messageId, 'video', item.content.url);
    }
    markLibraryItemSent(item.messageId);
    addMessage(message, userId);
  }

  renderContentItem = item => (
    <TouchableOpacity
      onPress={() => this.onPressItem(item)}
      style={styles.mediaLibraryItemContainer}
    >
      {item.isPhoto
        ? (
          <Image
            source={{ uri: item.content.photoMedium }}
            style={styles.imageItem}
          />
        )
        : (
          <Video
            muted
            source={{ uri: item.content.url }}
            style={styles.imageItem}
            repeat={false}
          />
        )
      }
      {item.isSent && (
        <View style={styles.sentNotification}>
          <View style={styles.sentIconContainer}>
            <Icon name="check-circle" size={30} color={colors.checkCircleLibrary} />
            <QuicksandText style={styles.sentText}>
              Sent
            </QuicksandText>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )

  renderLibrary = () => {
    const {
      props: {
        requestMediaLibrary,
        message: {
          isLibraryLoading,
          mediaLibrary,
        },
      },
    } = this;

    return (
      <FlatList
        data={mediaLibrary}
        ListEmptyComponent={this.renderListEmptyComponent()}
        keyExtractor={item => item.messageId}
        renderItem={({ item }) => this.renderContentItem(item)}
        numColumns={3}
        refreshing={isLibraryLoading}
        onRefresh={() => requestMediaLibrary()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  }

  render() {
    const {
      props: {
        requestMediaLibrary,
      },
      state: {
        activeTab,
      },
    } = this;
    return (
      <View style={styles.container}>
        <Header>
          <QuicksandText style={styles.headerText}>
            Send Photo/Video
          </QuicksandText>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onPressClose}
          >
            <Icon name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        </Header>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ activeTab: 'upload' })}
            style={[styles.tab, activeTab === 'upload' && styles.activeTab]}
          >
            <QuicksandText
              style={[styles.tabName, activeTab === 'upload' && styles.activeTabName]}
            >
            Upload
            </QuicksandText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              requestMediaLibrary();
              this.setState({ activeTab: 'library' });
            }}
            style={[styles.tab, activeTab === 'library' && styles.activeTab]}
          >
            <QuicksandText
              style={[styles.tabName, activeTab === 'library' && styles.activeTabName]}
            >
            Library
            </QuicksandText>
          </TouchableOpacity>
        </View>
        {activeTab === 'upload' && this.renderUpload()}
        {activeTab === 'library' && this.renderLibrary()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  profiles: state.profiles,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestMediaLibrary,
    requestSendFromLibrary,
    addMessage,
    markLibraryItemSent,
  }, dispatch,
);

export const SendPhotoVideo = connect(mapStateToProps,
  mapDispatchToProps)(UnconnectedSendPhotoVideo);
