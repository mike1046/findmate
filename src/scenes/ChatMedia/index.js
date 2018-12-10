// @flow

import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Video from 'react-native-video';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestConversationMedia } from '../../redux/actions/message';
import { QuicksandText, ImageFullSize } from '../../components';
import { navigation } from '../../global';
import styles from './styles';

type Props = {
  message: Object,
  profiles: Object,
  requestConversationMedia: (number) => void,
};

type State = {
  showImageFullSize: boolean,
}

class UnconnectedChatMedia extends PureComponent<Props, State> {

  state = {
    showImageFullSize: false,
  };

  viewedImageurl = [];

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
    if (item.isPhoto) {
      this.viewedImageurl = [
        {
          url: item.content.photoLarge,
        },
      ];

      this.setState({ showImageFullSize: true });
    }
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
    </TouchableOpacity>
  )

  onCloseFullSizeImage = () => {
    this.setState({ showImageFullSize: false });
  }

  render() {
    const {
      state: {
        showImageFullSize,
      },
      props: {
        requestConversationMedia,
        message: {
          isLibraryLoading,
          conversationMedia,
        },
        profiles: {
          viewedUser: {
            meta: {
              userId,
            },
          },
        },
      },
    } = this;

    return (
      <View style={styles.container}>
        <ImageFullSize
          visible={showImageFullSize}
          onClose={this.onCloseFullSizeImage}
          viewedImageurl={this.viewedImageurl}
        />
        <FlatList
          data={conversationMedia}
          ListEmptyComponent={this.renderListEmptyComponent()}
          keyExtractor={item => item.isVideo ? item.content.url : item.content.photoMedium}
          renderItem={({ item }) => this.renderContentItem(item)}
          numColumns={3}
          refreshing={isLibraryLoading}
          onRefresh={() => requestConversationMedia(userId)}
          contentContainerStyle={styles.flatListContainer}
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.closeButton}
        >
          <QuicksandText
            style={styles.closeButtonText}
          >
          Close
          </QuicksandText>
        </TouchableOpacity>

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
    requestConversationMedia,
  }, dispatch,
);

export const ChatMedia = connect(mapStateToProps, mapDispatchToProps)(UnconnectedChatMedia);
