// @flow

import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Clipboard,
  Platform,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import Video from 'react-native-video';
import moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens, colors, utils } from '../../global';
import { QuicksandText, PortraitButton, ImageFullSize } from '../../components';
import { requestChangeProfileSettings } from '../../redux/actions/profile';
import { socket } from '../../redux/sagas/pusher';
import { sendMessage, sendMedia, requestDeleteMessage, requestMessages, requestDeleteConversation,
  requestConversationMedia, setMessages, markPreviewItemSeen, controlPlayingVideo } from '../../redux/actions/message';
import styles from './styles';

type Props = {
  profiles: Object,
  requestChangeProfileSettings: (string, boolean, string) => void,

  // messages: [],
  viewedUser: Object,
  isLoading: boolean,
  sendMessage: (Object, number) => void,
  sendMedia: (Object, number, string) => void,
  requestMessages: (Object) => void,
  requestDeleteMessage: (Object, boolean, number) => void,
  login: Object,
  requestDeleteConversation: (number) => void,
  controlPlayingVideo: (number, number, boolean) => void,
  requestConversationMedia: (number) => void,
  markPreviewItemSeen: (number) => void,
  isTyping: Object,
  message: Object,
  channelKey: string,
  setMessages: (Object) => void,
  navigation: Object,
};

type State = {
  isModalOpened: boolean,
  showImageFullSize: boolean,
  rate: number,
  volume: number,
  muted: boolean,
  resizeMode: string,
  duration: number,
  currentTime: number,
  messageMenuItem: Object,
  openMessageMenu: boolean,
  isBuffering: boolean,
}

class UnconnectedChat extends PureComponent<Props, State> {

  state = {
    isModalOpened: false,
    showImageFullSize: false,
    openMessageMenu: false,
    messageMenuItem: {},
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    isBuffering: false,
  };

  typingChannel = null;
  canSandTypingNotification = true;
  firstTimeChangeTextTriggered = true;

  componentWillMount() {
  }

  componentWillUnmount() {
    const {
      props: {
        setMessages,
      },
    } = this;
    socket.unsubscribe(this.typingChannel);
    setMessages({ 'openedChatId': null });
  }

  componentDidMount() {
    reactotron.log('chat rendered');
    const {
      props: {
        navigation: {
          state: {
            params: userId,
          },
        },
        markPreviewItemSeen,
        setMessages,
        channelKey,
      },
    } = this;
    reactotron.log(userId);
    if (channelKey) {
      this.subscribeOnTypingChannel(channelKey);
    }
    setMessages({ 'openedChatId': userId });
    markPreviewItemSeen(userId);
  }

  subscribeOnTypingChannel = (key) => {
    this.typingChannel = socket.subscribe(key);
  }

  sendNotificationAboutTyping = () => {
    const {
      props: {
        profiles: {
          currentUser: {
            meta: {
              userId,
            },
          },
        },
      },
    } = this;

    if (this.firstTimeChangeTextTriggered) {
      this.firstTimeChangeTextTriggered = false;
      return;
    }
    if (this.canSandTypingNotification && this.typingChannel) {
      this.typingChannel.trigger('client-typing', {
        userId,
      });
      this.canSandTypingNotification = false;
      setTimeout(() => {
        this.canSandTypingNotification = true;
      }, 3000);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {
      props: {
        channelKey,
      },
    } = this;
    if (channelKey !== prevProps.channelKey) {
      this.subscribeOnTypingChannel(channelKey);
    }
  }

  viewedImageurl = [];

  onPressLogo = () => {
    navigation.reset(screens.home);
  }

  closeChat = () => {
    navigation.goBack();
  }

  onCloseModal = () => {
    this.setState(
      {
        isModalOpened: false,
      },
    );
  }

  onPressViewPhotos = () => {
    const {
      props: {
        requestConversationMedia,
        profiles: {
          viewedUser: {
            meta: {
              userId,
            },
          },
        },
      },
    } = this;
    requestConversationMedia(userId);
    this.onCloseModal();
    navigation.navigate(screens.chatMedia);
  }

  onPressDeleteConversation = (userId) => {

    const {
      props: {
        requestDeleteConversation,
      },
    } = this;
    requestDeleteConversation(userId);
    this.onCloseModal();
    navigation.reset(screens.home);
  }

  onPressReportUser = (userId) => {
    navigation.navigate(screens.report, userId);
  }

  onPressUserPortrait = () => {
    navigation.navigate(screens.anotherProfile);
  }

  onSend = (messages) => {
    const instanceId = utils.generateInstanceId();
    const message = messages[0];
    const {
      props: {
        profiles: {
          currentUser,
          viewedUser,
        },
        sendMessage,
      },
    } = this;
    message.user.name = currentUser.bio.slug;
    message.user.avatar = currentUser.images[0].medium;
    message.instanceId = instanceId;
    sendMessage(message, viewedUser.meta.userId);
  }

  deleteMessage = (message, both) => {
    const {
      props: {
        requestDeleteMessage,
        profiles: {
          viewedUser: {
            meta: {
              userId,
            },
          },
        },
      },

    } = this;
    requestDeleteMessage(message, both, userId);
  }

  openImageFullSize = (image) => {
    this.viewedImageurl = [
      {
        url: image,
      },
    ];
    this.setState({ showImageFullSize: true });
  }

  onCloseFullSizeImage = () => {
    this.setState({ showImageFullSize: false });
  }

  onLoadEarlier = () => {
    const {
      props: {
        requestMessages,
        profiles: {
          viewedUser: {
            meta: {
              userId,
            },
            bio: {
              slug: name,
            },
            images,
          },
        },
        message,
      },
    } = this;
    const avatar = images[0].medium;
    const lastItemId = message[userId][message[userId].length - 1]._id;
    requestMessages({ userId, name, avatar, lastItemId });
  }

  openMessageMenu = (message) => {
    this.setState({
      messageMenuItem: message,
      openMessageMenu: true,
    });
  }

  renderMessageMenu = () => {
    const {
      state: {
        messageMenuItem: {
          text,
          video,
          image,
          user,
        },
        messageMenuItem,
      },
    } = this;
    let id;
    if (user) {
      const { _id } = user;
      id = _id;
    }
    return (
      <View style={styles.messageMenuContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              this.deleteMessage(messageMenuItem, false);
              this.setState({
                openMessageMenu: false,
                messageMenuItem: {},
              });
            }}
            style={styles.modalMenuItem}
          >
            <QuicksandText>
              Delete for myself
            </QuicksandText>
          </TouchableOpacity>
          {
            id === 1
            && (
              <TouchableOpacity
                onPress={() => {
                  this.deleteMessage(messageMenuItem, true);
                  this.setState({
                    openMessageMenu: false,
                    messageMenuItem: {},
                  });
                }}
                style={styles.modalMenuItem}
              >
                <QuicksandText>
                Delete for both of us
                </QuicksandText>
              </TouchableOpacity>
            )
          }
          {
            text
            && (
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(text);
                  this.setState({
                    openMessageMenu: false,
                    messageMenuItem: {},
                  });
                }}
                style={styles.modalMenuItem}
              >
                <QuicksandText>
                Copy text
                </QuicksandText>
              </TouchableOpacity>
            )
          }
          {
            image
            && [
              <TouchableOpacity
                key="viewFullSize"
                onPress={() => {
                  this.openImageFullSize(image);
                  this.setState({
                    openMessageMenu: false,
                    messageMenuItem: {},
                  });
                }}
                style={styles.modalMenuItem}
              >
                <QuicksandText>
                View Full Size
                </QuicksandText>
              </TouchableOpacity>,
              <TouchableOpacity
                key="copyImageUrl"
                onPress={() => {
                  Clipboard.setString(image);
                  this.setState({
                    openMessageMenu: false,
                    messageMenuItem: {},
                  });
                }}
                style={styles.modalMenuItem}
              >
                <QuicksandText>
                Copy image url
                </QuicksandText>
              </TouchableOpacity>,
            ]
          }
          {
          video
          && (
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(video);
                this.setState({
                  openMessageMenu: false,
                  messageMenuItem: {},
                });
              }}
              style={styles.modalMenuItem}
            >
              <QuicksandText>
              Copy video url
              </QuicksandText>
            </TouchableOpacity>
          )
        }
          <TouchableOpacity
            onPress={() => this.setState({
              openMessageMenu: false,
              messageMenuItem: {},
            })}
            style={styles.modalMenuItem}
          >
            <QuicksandText>
            Cancel
            </QuicksandText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onAnyChange = (media, contentType) => {
    const {
      props: {
        profiles: {
          currentUser,
          viewedUser,
        },
        sendMedia,
      },
    } = this;
    const instanceId = utils.generateInstanceId();
    const message: {
      path?: string,
      filename?: string,
      format?: string,
      video?: string,
      image?: string,
    } = {
      instanceId,
      _id: instanceId,
      createdAt: moment().format(),
      user: {
        _id: 1,
        name: currentUser.bio.slug,
        avatar: currentUser.images[0].medium,
      },
    };

    if (contentType === 'sendPhoto') {
      message.path = media.path;
      message.filename = Platform.OS === 'ios' ? media.filename : instanceId;
      message.format = media.mime;
      message.image = media.path;
    }
    if (contentType === 'sendVideo') {
      message.path = media.path;
      message.filename = Platform.OS === 'ios' ? media.filename : instanceId;
      message.format = media.mime;
      message.video = media.path;
    }

    sendMedia(message, viewedUser.meta.userId, contentType);
  }

  renderActions = () => ( // props
    <TouchableOpacity
      onPress={() => navigation.navigate(screens.sendPhotoVideo, { onAnyChange: this.onAnyChange })}
      style={styles.attachmentButton}
    >
      <Icon name="photo-camera" size={20} color={colors.blue1} />
    </TouchableOpacity>
  )

  video: Video;

  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
    this.setState({ isBuffering });
  }

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  getCurrentTimePercentage = () => {
    const { currentTime, duration } = this.state;
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    }
    return 0;
  }

  onPressPlay = (userId, id, playing) => {

    // const { playingVideos } = this.state;
    // const someProperty = { ...playingVideos };

    // if (playingVideos[id]) {
    //   someProperty[id] = false;
    // } else {
    //   someProperty[id] = true;
    // }
    // this.setState({ playingVideos: someProperty });
    // reactotron.log('on press play');
    const { controlPlayingVideo } = this.props;
    controlPlayingVideo(userId, id, playing);
  }

  renderBubble = (props) => {
    const { video, createdAt } = props.currentMessage;
    const isRight = props.currentMessage.user._id === 1;
    const {
      props: {
        profiles: {
          viewedUser: {
            meta: {
              userId,
            },
          },
        },
      },
      state: {
        volume,
        muted,
        rate,
        resizeMode,
      },
    } = this;
    const {
      currentMessage,
    } = props;
    if (video) {
      return (
        <View style={[styles.videoContainer,
          isRight ? styles.rightContainerVideo : styles.leftContainerVideo]}
        >
          <TouchableOpacity
            onPress={() => this.onPressPlay(userId, currentMessage._id, !currentMessage.playing)}
            onLongPress={() => this.openMessageMenu(currentMessage)}
          >
            <View
              style={styles.videoWrapper}
            >
              <Video
                source={{ uri: video }}
                style={styles.fullScreen}
                resizeMode={resizeMode}
                rate={rate}
                muted={muted}
                volume={volume}
                paused={!currentMessage.playing}
                onLoad={this.onLoad}
                onBuffer={this.onBuffer}
                onProgress={this.onProgress}
              />
            </View>

          </TouchableOpacity>
          <View style={styles.bottomMessage}>
            <QuicksandText style={[styles.timeText, !isRight && styles.leftTimeText]}>
              {moment(createdAt).format('hh:mm A')}
            </QuicksandText>
          </View>
        </View>
      );
    }
    return (
      <Bubble
        {...props}
      />
    );
  }

  renderFooter = () => {
    const {
      props: {
        message: {
          typing,
        },
        profiles: {
          viewedUser: {
            meta: {
              userId,
            },
            bio: {
              slug,
            },
          },
        },
      },
    } = this;
    return (
      <View style={styles.footerContainer}>
        <QuicksandText style={styles.footerText}>
          { typing[userId] ? `${slug} is typing...` : ''}
        </QuicksandText>
      </View>
    );
  }

  render() {
    const {
      state: {
        isModalOpened,
        showImageFullSize,
        openMessageMenu,
      },
      props: {
        profiles,
        isLoading,
        message,
        requestChangeProfileSettings,
      },
    } = this;
    if (isLoading || !profiles.viewedUser.meta) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      );
    }

    let shouldLoadEarlier = false;

    if (message && profiles && !isLoading) {
      if (profiles.viewedUser) {
        if (message[profiles.viewedUser.meta.userId]) {
          if (message[profiles.viewedUser.meta.userId].length > 29) {
            shouldLoadEarlier = true;
          }
        }
      }
    }
    return (
      <View style={styles.container}>

        <Modal
          transparent
          animationType="fade"
          visible={isModalOpened}
          onRequestClose={() => this.onCloseModal()}
        >
          <TouchableWithoutFeedback
            onPress={() => this.onCloseModal()}
          >
            <View style={styles.modalContainer}>
              {!isLoading && (
              <View
                style={styles.modalStyle}
              >
                <TouchableOpacity
                  onPress={this.onPressViewPhotos}
                  style={[styles.modalMenuItem, styles.firstModalMenuItem]}
                >
                  <View style={styles.modalIcon}>
                    <Icon name="photo-library" size={20} color={colors.black} />
                  </View>
                  <QuicksandText>
                    View Photos / Videos
                  </QuicksandText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onPressDeleteConversation(profiles.viewedUser.meta.userId)}
                  style={styles.modalMenuItem}
                >
                  <View style={styles.modalIcon}>
                    <Icon name="delete" size={20} color={colors.black} />
                  </View>
                  <QuicksandText>
                    Delete Conversation
                  </QuicksandText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.onCloseModal();
                    requestChangeProfileSettings(profiles.viewedUser.meta.userId, true, 'block');
                    navigation.reset(screens.home);
                  }}
                  style={styles.modalMenuItem}
                >
                  <View style={styles.modalIcon}>
                    <Icon name="close" size={20} color={colors.black} />
                  </View>
                  <QuicksandText>
                    {`Block ${profiles.viewedUser.bio.slug}`}
                  </QuicksandText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressReportUser(profiles.viewedUser.meta.userId);
                    this.onCloseModal();
                  }}
                  style={styles.modalMenuItem}
                >
                  <View style={styles.modalIcon}>
                    <Icon name="flag" size={20} color={colors.black} />
                  </View>
                  <QuicksandText>
                    {`Report ${profiles.viewedUser.bio.slug}`}
                  </QuicksandText>
                </TouchableOpacity>

              </View>
              )
            }
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <ImageFullSize
          visible={showImageFullSize}
          onClose={this.onCloseFullSizeImage}
          viewedImageurl={this.viewedImageurl}
        />
        <View style={styles.header}>
          <PortraitButton
            pictureUrl={profiles ? profiles.viewedUser.images[0].medium : 'https://i.ytimg.com/vi/WKB0JUkksJg/maxresdefault.jpg'}
            onPress={() => this.onPressUserPortrait()}
          />
          <View style={styles.userInfo}>
            <QuicksandText>
              {profiles.viewedUser.bio.slug}
            </QuicksandText>
            <QuicksandText style={styles.ageCityText}>
              {`${profiles.viewedUser.bio.age} · ${profiles.viewedUser.city.name}, ${profiles.viewedUser.country.name}`}
            </QuicksandText>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => this.setState({ isModalOpened: true })}
            >
              <Icon name="keyboard-arrow-down" size={30} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={this.closeChat}
            >
              <Icon name="close" size={30} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>
        { !isLoading
            && (
            <GiftedChat
              renderBubble={this.renderBubble}
              showUserAvatar
              showAvatarForEveryMessage
              renderAvatarOnTop
              onInputTextChanged={() => this.sendNotificationAboutTyping()}
              loadEarlier={shouldLoadEarlier}
              onLoadEarlier={this.onLoadEarlier}
              isLoadingEarlier={message.isLoadingEarlier}
              onSend={this.onSend}
              renderActions={this.renderActions}
              onLongPress={(a, b) => this.openMessageMenu(b)}
              renderFooter={this.renderFooter}
              renderMessageImage={props => (
                <TouchableOpacity
                  activeOpacity={1}
                  onLongPress={() => this.openMessageMenu(props.currentMessage)}
                  onPress={() => this.openImageFullSize(props.currentMessage.image)}
                >
                  <Image
                    source={{ uri: props.currentMessage.image }}
                    style={styles.imageWrapper}
                  />
                </TouchableOpacity>
              )}
              messages={message[profiles.viewedUser.meta.userId]}
              user={{
                _id: 1,
              }}
            />
            )
        }
        {openMessageMenu && this.renderMessageMenu()}
      </View>
    );

  }
}

const mapStateToProps = state => ({
  profiles: state.profiles,
  login: state.login,
  message: state.message,
  isLoading: state.message.isMessagesLoading,
  channelKey: state.profiles.chatChannelKey,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestChangeProfileSettings,
    setMessages,
    sendMessage,
    sendMedia,
    requestDeleteMessage,
    requestMessages,
    requestDeleteConversation,
    requestConversationMedia,
    markPreviewItemSeen,
    controlPlayingVideo,
  }, dispatch,
);

export const Chat = connect(mapStateToProps, mapDispatchToProps)(UnconnectedChat);
