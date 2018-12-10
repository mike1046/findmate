// @flow

import React, { Component, Fragment, type ElementRef } from 'react';
import { View, TouchableOpacity, ScrollView, Text, RefreshControl, Animated, Image, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import { type NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { QuicksandText } from '../../components';
import { requestProfile, requestProfileMeta, requestChangeProfileSettings, requestInterests, setProfiles, clearAnotherProfile } from '../../redux/actions/profile';
import { requestMessages } from '../../redux/actions/message';
import { Card } from '../../components/Card';
import ShareModal from '../../components/ShareModal';
import { colors, navigation, screens } from '../../global';
import { flagUrl, cityMapUrl } from '../../global/apiUrl';
import styles from './styles';

type Params = {
};

type Props = {
  navigation: NavigationScreenProp<{ params: Params }>,
  profiles: Object,
  login: Object,
  requestChangeProfileSettings: (string, boolean, string) => void,
  requestInterests: () => void,
  clearAnotherProfile: () => void,
  requestProfileMeta: (number) => void,
  requestMessages: (Object) => void,
  requestProfile: (number) => void,
  setProfiles: (Object) => void,
  isFavorite: boolean,
  shareUrl: string,
  isInterested: boolean,
  isBlocked: boolean,
  images: Object,
  smallImages: Object,
};

type State = {
  shouldRenderAnimation: boolean,
  opacity: any,
  offset: any,
  icon: string,
  notification: string,
  notificationIconColor: string,
  shareModalOpen: boolean,
};

class UnconnectedAnotherProfile extends Component<Props, State> {
  _notification: ElementRef<typeof Animated.View>;

  state = {
    shouldRenderAnimation: false,
    opacity: new Animated.Value(0),
    offset: new Animated.Value(0),
    icon: 'star',
    notification: '',
    notificationIconColor: 'red',
    shareModalOpen: false,
  };

  componentDidMount() {
    const {
      navigation: {
        state: {
          params,
        },
      },
    } = this.props;
    reactotron.log({ params });
  }

  componentWillUnmount() {
    const { clearAnotherProfile, navigation: {
      state: {
        params,
      },
    },
    } = this.props;
    reactotron.log('another profile will unmount');
    if (params) {
      if (params.sholudClearProfileAfterClosing) {
        reactotron.log('CLERING PROFILE');
        clearAnotherProfile();
      }
    }
  }

  userInteract = false;

  componentDidUpdate(prevProps: Props) {
    const {
      props: {
        isBlocked,
        isFavorite,
        isInterested,
      },
    } = this;
    if (this.userInteract === true) {
      if (isFavorite !== prevProps.isFavorite && isFavorite === true) {
        this.addNotification('star', 'ADDED', colors.starIcon);
      }
      if (isFavorite !== prevProps.isFavorite && isFavorite === false) {
        this.addNotification('star', 'REMOVED', colors.starIcon);
      }
      if (isInterested !== prevProps.isInterested && isInterested === true) {
        this.addNotification('heart', 'ADDED', colors.heartIcon);
      }
      if (isInterested !== prevProps.isInterested && isInterested === false) {
        this.addNotification('heart', 'REMOVED', colors.heartIcon);
      }
      if (isBlocked !== prevProps.isBlocked && isBlocked === true) {
        this.addNotification('ban', 'BLOCKED', colors.resetButton);
        navigation.reset(screens.home);
      }
      if (isBlocked !== prevProps.isBlocked && isBlocked === false) {
        this.addNotification('ban', 'UNBLOCKED', colors.resetButton);
      }
    }
  }

  addNotification = (icon, notification, notificationIconColor) => {
    this.setState({
      notification,
      icon,
      notificationIconColor,
      shouldRenderAnimation: true,
    }, () => {
      const {
        state: {
          opacity,
          offset,
        },
      } = this;
      this._notification.getNode().measure((x, y, width, height) => {
        offset.setValue(height);

        Animated.sequence([

          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 1,
              duration: 300,
            }),
            Animated.timing(offset, {
              toValue: 0,
              duration: 300,
            }),
          ]),

          Animated.delay(1500),

          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
            }),
            Animated.timing(offset, {
              toValue: height,
              duration: 300,
            }),
          ]),

        ]).start(({ finished }) => {
          if (finished) {
            this.setState({ shouldRenderAnimation: false });
          }
        });
      });
    });
  };

  checkedIcon = <Icon name="check" size={25} color={colors.checkIcon} />;

  closeProfile = () => {
    navigation.goBack();
  }

  onPressChat = () => {
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
      },
    } = this;

    const avatar = images[0].medium;
    requestMessages({ userId, name, avatar });
    navigation.navigate(screens.chat, { userId });
  };

  createLocationData = () => {
    const {
      props: {
        profiles: {
          viewedUser: {
            city: {
              name: city,
            },
            country: {
              name: country,
              iso_alpha2: countryCode,
            },
          },
          viewedUserMeta: {
            location: {
              distance,
              meta: {
                isVpn,
                isDifferent,
                country: lastDetectedLocation,
              },
            },
          },
        },
      },
    } = this;
    return {
      statedLocation: `${city}, ${country}`,
      lastDetectedLocation,
      countryFlagUrl: flagUrl(countryCode),
      cityMapUrl: cityMapUrl(city, country),
      isVpn,
      isDifferent,
      distance,
    };
  }

  createHeadlineData = () => {
    const {
      props: {
        profiles: {
          viewedUser,
        },
      },
    } = this;
    return {
      headline: viewedUser.bio.headline,
      description: viewedUser.bio.description,
    };
  }

  renderPhotoes = (data) => {
    const { images, smallImages } = this.props;
    return (
      data.map((item, index) => {
        let large;
        let small;
        let loading = 'Image is loading ';
        if (images[index]) {
          if (images[index].large) {
            large = images[index].large;
          }
          if (images[index].loading) {
            loading = `Image is loading ${images[index].loading}%`;
          }
        }
        if (smallImages[index]) {
          if (smallImages[index].small) {
            small = smallImages[index].small;
          }
        }
        return (
          <View
            style={[styles.slide, styles.image]}
            key={item.large}
          >
            {large ? (
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{ uri: large }}
                defaultSource={images.preloader}
              />) : small
              ? (
                <ImageBackground
                  resizeMode="stretch"
                  style={[styles.image, styles.imageBackground]}
                  source={{ uri: small }}
                  defaultSource={images.preloader}
                  blurRadius={1}
                >
                  <QuicksandText style={styles.isLoading}>
                    {loading}
                    <AnimatedEllipsis
                      animationDelay={50}
                    />
                  </QuicksandText>
                </ImageBackground>
              )
              : (
                <View
                  style={[styles.swiper, styles.slide]}
                >
                  <QuicksandText style={styles.isLoading}>
                    {loading}
                    <AnimatedEllipsis
                      animationDelay={50}
                    />
                  </QuicksandText>
                </View>
              )
            }
          </View>
        );
      })
    );
  }

  renderCards = () => {
    const { profiles: { viewedUserMeta, viewedUser: { city, country, bio } } } = this.props;
    let about;
    let location;
    if (viewedUserMeta) {
      if (viewedUserMeta.about) {
        about = viewedUserMeta.about;
      }
      if (viewedUserMeta.location) {
        location = viewedUserMeta.location;
      }
    }

    return (
      <View>
        {bio && (
        <Card
          type="Headline"
          data={this.createHeadlineData()}
        />
        ) }
        { about && (
        <Card
          type="About"
          data={about}
        />) }
        { location && city && country
        && (
        <Card
          type="Locations"
          data={this.createLocationData()}
        />
        ) }
      </View>
    );
  }

  onRefresh =() => {
    const {
      props: {
        profiles: {
          viewedUser,
        },
      },
    } = this;
    requestProfileMeta(viewedUser.meta.userId, 'anotherProfile');
  }

  onPressReport = () => {
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
    } = this;
    navigation.navigate(screens.report, userId);
  }

  onPressShare = () => {
    const {
      state: {
        shareModalOpen,
      },
    } = this;
    this.setShareModalOpen(!shareModalOpen);
  }

  setShareModalOpen = (isOpened) => {
    this.setState({ shareModalOpen: isOpened });
  }

  renderButtons = () => (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => this.onPressReport()}
        style={styles.button}
      >
        <QuicksandText style={styles.reportText}>
          Report Profile
        </QuicksandText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.onPressShare()}
        style={[styles.button, styles.shareButton]}
      >
        <Icon name="share" size={15} color={colors.white} />
        <QuicksandText style={styles.shareText}>
          Share
        </QuicksandText>
      </TouchableOpacity>
    </View>
  )

  renderTab = () => {
    const {
      props: {
        profiles: {
          viewedUser,
          isLoading,
        },
      },
    } = this;
    let userId;
    let images;
    let trust;
    let responsiveness;
    if (viewedUser.images) {
      images = viewedUser.images;
    }
    if (viewedUser.meta) {
      if (viewedUser.meta.trust && viewedUser.meta.responsiveness) {
        trust = viewedUser.meta.trust;
        responsiveness = viewedUser.meta.responsiveness;
      }
      if (viewedUser.meta.userId) {
        userId = viewedUser.meta.userId;
      }
    }
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
        refreshControl={(
          <RefreshControl
            refreshing={isLoading}
            onRefresh={this.onRefresh}
          />
)}
      >
        { images && (
          <Swiper
            key="swiper"
            loop={false}
            showsPagination={false}
            dotColor="white"
            activeDotColor="red"
            style={styles.swiper}
            showsButtons
            nextButton={(
              <Text style={styles.buttonText}>
              ›
              </Text>
            )}
            prevButton={(
              <Text style={styles.buttonText}>
              ‹
              </Text>
            )}
          >
            {this.renderPhotoes(images)}
          </Swiper>)
        }
        { trust && responsiveness
          && (
          <View
            key="progress"
            style={styles.progressContainer}
          >
            <View style={styles.roundIndicatorContainer}>
              <Progress.Circle
                size={90}
                progress={trust / 10}
                color={colors.profileActiveBlue}
                unfilledColor={colors.indicatorGrey}
                borderWidth={0}
                thickness={3}
                showsText
                textStyle={styles.textProgressCircle}
                formatText={() => `   ${trust * 10}${'\n'}TRUST`}
              />
            </View>
            <View style={styles.roundIndicatorContainer}>
              <Progress.Circle
                size={90}
                progress={responsiveness / 100}
                color={colors.profileActiveBlue}
                unfilledColor={colors.indicatorGrey}
                borderWidth={0}
                thickness={3}
                showsText
                textStyle={styles.textProgressCircle}
                formatText={() => `    ${responsiveness}%${'\n'}REPLIES`}
              />
            </View>
          </View>
          )
        }
        {this.renderCards()}
        {userId && this.renderButtons()}
      </ScrollView>
    );
  }

  renderHeader = () => {
    const {
      props: {
        profiles: {
          viewedUser,
          viewedUserMeta,
        },
      },
    } = this;
    let slug;
    let onlineStatus;
    if (viewedUser) {
      if (viewedUser.bio) {
        if (viewedUser.bio.slug) {
          slug = viewedUser.bio.slug;
        }
      }
      if (viewedUser.meta) {
        if (viewedUser.meta.onlineState) {
          if (viewedUser.meta.onlineState.state) {
            onlineStatus = viewedUser.meta.onlineState.state;
          }
        }
      }
    }
    if (viewedUserMeta.onlineState) {
      if (viewedUserMeta.onlineState.state) {
        onlineStatus = viewedUserMeta.onlineState.state;
      }
    }

    return (
      <View style={styles.header}>
        <View
          key="status"
          style={styles.onlineStatusContainer}
        >
          {onlineStatus && (
          <Fragment>
            <View style={[styles.onlineCircle, onlineStatus === 'online' ? styles.online : styles.offline]} />
            <QuicksandText style={[styles.tabText]}>
              {onlineStatus}
            </QuicksandText>
          </Fragment>)}
        </View>
        { slug && (
          <QuicksandText
            key="text"
            style={[styles.tabText, styles.marginLeft]}
          >
            {slug}
          </QuicksandText>)}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeProfile}
        >
          <Icon name="close" size={20} color={colors.black} />
        </TouchableOpacity>
      </View>
    );
  }

  renderTabBottom = () => {
    const {
      props: {
        setProfiles,
        requestChangeProfileSettings,
        profiles: {
          viewedUser,
          isFavorite,
          isInterested,
          isBlocked,
          viewedUserMeta: {
            settings,
          },
        },
      },
    } = this;

    let isTabVisible = false;
    if (settings) {
      if (settings.canInteract) {
        isTabVisible = true;
      }
    }
    const iconSize = 25;
    if (isTabVisible) {
      return (
        <View style={styles.elevationLow}>
          <View style={styles.bottomTab}>
            <TouchableOpacity
              onPress={() => {
                this.userInteract = true;
                requestChangeProfileSettings(viewedUser.meta.userId, !isInterested, 'interest');
                setProfiles({ 'isInterested': !isInterested });
              }}
              style={styles.bottomButton}
            >
              {isInterested ? this.checkedIcon
                : <FontAwesomeIcon name="heart" size={iconSize} color={colors.heartIcon} />
            }
              <QuicksandText style={styles.bottomText}>
                INTERESTED
              </QuicksandText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressChat()}
              style={styles.bottomButton}
            >
              <Icon name="chat" size={iconSize} color={colors.chatIcon} />
              <QuicksandText style={styles.bottomText}>
                CHAT
              </QuicksandText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.userInteract = true;
                requestChangeProfileSettings(viewedUser.meta.userId, !isFavorite, 'favorite');
                setProfiles({ 'isFavorite': !isFavorite });
              }}
              style={styles.bottomButton}
            >
              { isFavorite ? this.checkedIcon
                : <Icon name="star" size={iconSize} color={colors.starIcon} />
              }
              <QuicksandText style={styles.bottomText}>
                FAVORITE
              </QuicksandText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.userInteract = true;
                requestChangeProfileSettings(viewedUser.meta.userId, !isBlocked, 'block');
                setProfiles({ 'isBlocked': !isBlocked });
              }}
              style={styles.bottomButton}
            >
              {isBlocked ? this.checkedIcon
                : <Icon name="block" size={iconSize} color={colors.blockIcon} /> }
              <QuicksandText style={styles.bottomText}>
                BLOCK
              </QuicksandText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  render() {
    const {
      state: {
        opacity,
        offset,
        icon,
        notification,
        notificationIconColor,
        shareModalOpen,
        shouldRenderAnimation,
      },
      props: {
        profiles,
      },
    } = this;
    const notificationStyle = {
      opacity,
      transform: [
        {
          translateY: offset,
        },
      ],
    };
    return (
      <View style={styles.container}>
        { (!profiles.isLoading && !profiles.isMetaLoading)
        && (
        <ShareModal
          shareUrl={profiles.viewedUserMeta.settings.shareUrl}
          isOpen={shareModalOpen}
          onClose={() => this.setShareModalOpen(false)}
        />)
        }

        {this.renderHeader()}
        {this.renderTab()}
        {(!profiles.isLoading) && this.renderTabBottom()}
        { shouldRenderAnimation && (
        <Animated.View
          style={[styles.notification, styles.elevationLow, notificationStyle]}
          ref={(notification) => { this._notification = notification; }}
        >
          <FontAwesomeIcon name={icon} size={50} color={notificationIconColor} />
          <QuicksandText style={styles.notificationText}>
            {notification}
          </QuicksandText>
        </Animated.View>
        ) }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profiles,
  isFavorite: state.profiles.isFavorite,
  isBlocked: state.profiles.isBlocked,
  isInterested: state.profiles.isInterested,
  login: state.login,
  images: state.profiles.viewedUserBlobImages,
  smallImages: state.profiles.viewedUserSmallBlobImages,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestProfile,
    requestProfileMeta,
    requestChangeProfileSettings,
    setProfiles,
    requestInterests,
    clearAnotherProfile,
    requestMessages }, dispatch,
);

export const AnotherProfile = connect(mapStateToProps,
  mapDispatchToProps)(UnconnectedAnotherProfile);
