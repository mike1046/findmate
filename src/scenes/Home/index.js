// @flow

import React, { Component, Fragment } from 'react';
import { View, FlatList, Image, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { withNavigationFocus } from 'react-navigation';
import memoize from 'memoize-one';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProfileView } from '../../components/ProfileView';
import SearchBar from '../../components/SearchBar';
import FilterInboxModal from '../../components/FilterInboxModal';
import { PortraitButton } from '../../components/PortraitButton';
import { Header, QuicksandText, Button } from '../../components';
import { colors, screens, navigation, images } from '../../global';

import * as filterActions from '../../redux/actions/filter';
import * as pageActions from '../../redux/actions/page';
import * as sortActions from '../../redux/actions/sort';
import * as usersActions from '../../redux/actions/users';
import { requestPreview, setMessages, requestMessages } from '../../redux/actions/message';

import * as profileActions from '../../redux/actions/profile';
import styles from './styles';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'Now',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1month',
    MM: '%dmonths',
    y: '1y',
    yy: '%dy',
  },
});

type Props = {
  navigation: Object,
  nextPage: number,
  profiles: Object,
  requestUsers: () => void,
  requestPreview: (string, number) => void,
  requestProfileMeta: (number) => void,
  requestFetchBlobImages: (Array<Object>) => void,
  clearAnotherProfile: () => void,
  requestProfile: (number) => void,
  requestMessages: (Object) => void,
  setProfiles: (Object) => void,
  setMessages: (Object) => void,
  loadNewUsers: () => void,
  resetPage: () => void,
  clearUsers: () => void,
  refreshing: boolean,
  setSort: (string) => void,
  activeTab: string,
  users: Object,
  usersAr: Array<Object>,
  message: Object,
  isFocused: boolean,
};

type State = {
  filterInbox: boolean,
  isMailSelected: boolean,
};

class UnconnectedHome extends Component<Props, State> {
  state = {
    isMailSelected: false,
    filterInbox: false,
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidMount() {
    const { clearAnotherProfile,
    } = this.props;
    reactotron.log('CLERING PROFILE');
    clearAnotherProfile();
    this.loadUsers();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const {
      props: {
        isFocused,
      },
      state: {
        isMailSelected,
      } } = this;
    if (isMailSelected && isFocused) {
      this.setState({ isMailSelected: false });
      return true;
    }
  };

  onPressBars = () => {
    navigation.navigate(screens.filter);
  };

  loadUsers = () => {
    const {
      props: {
        requestUsers,
      },
    } = this;
    requestUsers();
  };

  onPressAnotherProfile = (item) => {
    const {
      props: {
        requestProfileMeta,
        setProfiles,
        requestFetchBlobImages,
      },
    } = this;

    navigation.navigate(screens.anotherProfile, { sholudClearProfileAfterClosing: true });
    setProfiles({ 'viewedUser': item });
    requestFetchBlobImages(item.images);
    requestProfileMeta(item.meta.userId);

  };

  onPressPreviewItem = (item) => {
    const {
      props: {
        clearAnotherProfile,
        requestProfileMeta,
        requestProfile,
        requestMessages,
      },
    } = this;
    clearAnotherProfile();
    const { userId, slug: name, previewPrimaryImageUrl: avatar } = item;
    requestProfile(item.userId);
    requestProfileMeta(item.userId);
    requestMessages({ userId, name, avatar });

    navigation.navigate(screens.chat, { userId });
  };

  renderProfile = (item) => {
    if (item.empty === true) {
      return <View style={styles.emptyListComponent} />;
    }
    return (
      <ProfileView
        onPressProfile={() => this.onPressAnotherProfile(item)}
        pictureUrl={item.images[0].medium}
        age={item.bio.age}
        cityName={item.city.name}
        countryName={item.country.name}
      />
    );
  };

  setFilterInbox = (visible) => {
    this.setState({ filterInbox: visible });
  };

  onPressUpdate =() => {
    const {
      props: {
        resetPage,
        clearUsers,
      },
    } = this;
    resetPage();
    clearUsers();
    this.loadUsers();
  };

  renderListEmptyComponent = () => {
    const {
      props: {
        refreshing,
        message: {
          isMessagesLoading,
        },
      },
      state: {
        isMailSelected,
      },
    } = this;
    return (refreshing || isMessagesLoading) ? null
      : (
        <View
          style={styles.emptyListView}
        >
          {isMailSelected
          && (
          <QuicksandText style={styles.emptyListText}>
                No messages yet
          </QuicksandText>
          )
        }
          {!isMailSelected && this.renderNoUsersMessage()}
        </View>
      );
  };

  onPressNoUsersMessageButton = () => {
    // reactotron.log('onPressNoUsersMessageButton pressed');
    navigation.navigate(screens.video, { fromSettings: true });
  };

  onPressSubscribeButton = () => {
    // reactotron.log('onPressSubscribeButton pressed');
  };

  renderNoUsersMessage = () => {
    const {
      users: {
        noUsersMessage,
      },
      activeTab,
    } = this.props;
    if (activeTab === 'video' || 'nearby') {
      if (noUsersMessage) {
        const {
          title,
          message,
          buttonLabel,
          subscribeLabel,
          subscribeButtonLabel,
        } = noUsersMessage;
        return (
          <View style={styles.emptyListView}>
            <QuicksandText style={styles.emptyListTitle}>
              {title}
            </QuicksandText>
            {message && (
            <QuicksandText style={styles.emptyListMessage}>
              {message}
            </QuicksandText>
            )}
            <Button
              text={buttonLabel}
              onPress={this.onPressNoUsersMessageButton}
              marginVertical={20}
            />
            {subscribeLabel && subscribeButtonLabel && (
              <Fragment>
                <QuicksandText style={styles.subscribeText}>
                  {subscribeLabel}
                </QuicksandText>
                <QuicksandText
                  onPress={this.onPressSubscribeButton}
                  style={styles.subscribeButton}
                >
                  {subscribeButtonLabel}
                </QuicksandText>
              </Fragment>
            )}
          </View>
        );
      }
    } return (
      <QuicksandText style={styles.emptyListText}>
        {"We couldn't find anyone with those search filters"}
      </QuicksandText>
    );
  };

  onPressTab = (activeTab: string) => {
    const {
      props: {
        setSort,
      },
    } = this;
    setSort(activeTab);
    this.onPressUpdate();
  };

  formatData = memoize((data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      const meta = { userId: `blank-${numberOfElementsLastRow}` };
      data.push({ meta, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  });

  createData = memoize((users) => {
    const data = Object.values(users);
    return data;
  });

  onPressUserProfile = () => {
    navigation.navigate(screens.profile);
  };

  onPressMailButton = () => {
    const {
      state: {
        isMailSelected,
      },
      props: {
        message: {
          chosenType: filter,
        },
        setMessages,
        requestPreview,
      },
    } = this;
    this.setState(
      {
        isMailSelected: !isMailSelected,
      },
    );
    setMessages({ 'preview': [] });
    requestPreview(filter, 0);
  };

  onPressLogo = () => {
    this.setState(
      {
        isMailSelected: false,
      },
    );
  };

  renderOnlineView = (state) => {
    let icon;
    if (state === 'online') icon = <Icon name="circle" size={10} color={colors.online} />;
    if (state === 'offline') icon = <Icon name="circle" size={10} color={colors.offline} />;
    if (state === 'away') icon = <Icon name="circle" size={10} color={colors.away} />;

    return (
      <View
        style={styles.onlineIcon}
      >
        {icon}
      </View>
    );
  };

  renderPreviewItem = (item) => {
    const color = item.isUnread ? colors.black : colors.gray;
    return (
      <TouchableOpacity
        style={styles.previewItemMessage}
        onPress={() => this.onPressPreviewItem(item)}
      >
        <ImageBackground
          style={styles.icon}
          source={{ uri: item.previewPrimaryImageUrl }}
          defaultSource={images.defaultImage}
          imageStyle={styles.icon}
        >
          {this.renderOnlineView(item.onlineStatus.state)}
        </ImageBackground>
        <View style={styles.slugContentContainer}>
          <QuicksandText style={styles.previewNametext}>
            {item.slug}
          </QuicksandText>
          {item.type === 'text'
          && (
          <QuicksandText
            style={item.isUnread && item.fromMe === false
              ? styles.overViewUnreadText : styles.overViewContentText}
            numberOfLines={1}
          >

            {item.content}
          </QuicksandText>
          ) }
          {item.type === 'photo'
          && (
            <View style={styles.mediaPreviewContainer}>
              <MIcon name="photo" size={15} color={color} />
              <QuicksandText
                style={item.isUnread && item.fromMe === false
                  ? styles.overViewUnreadText : styles.overViewContentText}
                numberOfLines={1}
              >
              New Photo
              </QuicksandText>
            </View>
          ) }
          {item.type === 'video'
          && (
            <View style={styles.mediaPreviewContainer}>
              <MIcon name="videocam" size={15} color={color} style={styles.iconPreview} />
              <QuicksandText
                style={item.isUnread && item.fromMe === false
                  ? styles.overViewUnreadText : styles.overViewContentText}
                numberOfLines={1}
              >
              New Video
              </QuicksandText>
            </View>
          ) }
        </View>
        <View style={styles.dateContainer}>
          <QuicksandText style={styles.overViewContentText}>
            {moment(moment.utc(item.created), 'YYYYMMDD').fromNow()}
          </QuicksandText>
        </View>

      </TouchableOpacity>
    );
  };

  setFilter = (filter) => {
    const {
      props: {
        setMessages,
        requestPreview,
      },
    } = this;
    setMessages({ 'chosenType': filter, 'preview': [] });
    requestPreview(filter, 0);
  };

  renderHeaderLeftPart = (filter) => {

    if (filter === 'empty') {
      return (
        <View style={styles.headerLeftPart}>
          <Icon name="email-outline" size={15} color={colors.black} />
          <QuicksandText
            style={styles.previewHeaderText}
          >
              Inbox
          </QuicksandText>
        </View>
      );
    }
    if (filter === 'online') {
      return (
        <View style={styles.headerLeftPart}>
          <Icon name="circle" size={15} color={colors.online} />
          <QuicksandText
            style={styles.previewHeaderText}
          >
              Online
          </QuicksandText>
        </View>
      );
    }
    if (filter === 'unread') {
      return (
        <View style={styles.headerLeftPart}>
          <Icon name="mailbox" size={15} color={colors.black} />
          <QuicksandText
            style={styles.previewHeaderText}
          >
              Unread
          </QuicksandText>
        </View>
      );
    }
    if (filter === 'sent') {
      return (
        <View style={styles.headerLeftPart}>
          <Icon name="send" size={15} color={colors.black} />
          <QuicksandText
            style={styles.previewHeaderText}
          >
              Sent
          </QuicksandText>
        </View>
      );
    }
    if (filter === 'favorites') {
      return (
        <View style={styles.headerLeftPart}>
          <Icon name="star" size={15} color={colors.black} />
          <QuicksandText
            style={styles.previewHeaderText}
          >
              Favorites
          </QuicksandText>
        </View>
      );
    }
  };

  filterPreview = (data, filter) => {
    if (filter === 'inbox') return data;
    if (filter === 'online') return data.filter(item => item.onlineStatus.state !== 'offline');
    if (filter === 'unread') return data.filter(item => item.isUnread === true);
    if (filter === 'sent') return data.filter(item => item.fromMe === true);
    return data;
  };

  onRefreshPreview = (chosenType) => {
    const {
      props: {
        setMessages,
        requestPreview,
      },
    } = this;
    setMessages({ 'nextPagePreview': 0, 'preview': [] });
    requestPreview(chosenType, 0);
  };

  addNewMessagePreviews = (chosenType, nextPagePreview) => {
    const {
      props: {
        requestPreview,
        message: {
          probablyHasMoreResults,
        },
      },
    } = this;
    if (probablyHasMoreResults) {
      requestPreview(chosenType, nextPagePreview);
    }
  };

  renderMessagePreview = () => {
    const {
      state: {
        filterInbox,
        isMailSelected,
      },
      props: {
        message: {
          preview,
          isMessagesLoading,
          chosenType,
          nextPagePreview,
        },
      },
    } = this;
    return (
      <View style={isMailSelected ? styles.container : styles.hiddenScreen}>
        <TouchableOpacity
          style={[styles.previewItemMessage, styles.previewHeader]}
          onPress={() => this.setFilterInbox(true)}
        >
          {this.renderHeaderLeftPart(chosenType)}

          <Icon name="chevron-down" size={15} color={colors.black} />
        </TouchableOpacity>
        <FlatList
          data={preview}
          ListEmptyComponent={this.renderListEmptyComponent}
          keyExtractor={item => item.userId}
          renderItem={({ item }) => this.renderPreviewItem(item)}
          refreshing={isMessagesLoading}
          onRefresh={() => this.onRefreshPreview(chosenType)}
          onEndReachedThreshold={1}
          onEndReached={() => {
            if (isMailSelected) {
              this.addNewMessagePreviews(chosenType, nextPagePreview);
            }
          }}
        />
        <FilterInboxModal
          isOpen={filterInbox}
          onClose={() => this.setFilterInbox(false)}
          setFilter={filter => this.setFilter(filter)}
        />
      </View>
    );
  };

  keyExtractor = item => item.meta.userId;

  renderItem = ({ item }) => this.renderProfile(item);

  render() {
    const {
      state: {
        isMailSelected,
      },
      props: {
        usersAr,
        refreshing,
        activeTab,
        profiles,
      },
    } = this;
    return (
      <View style={[styles.container, styles.background]}>

        <Header>
          <TouchableOpacity
            onPress={this.onPressLogo}
            style={styles.elevationLow}
          >
            <Image
              style={styles.icon}
              source={images.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressMailButton}
            style={[styles.mailButton, isMailSelected && styles.chosenMailButton]}
          >
            <Icon name="email-outline" size={40} color={isMailSelected ? colors.envelopeSelected : colors.white} />
          </TouchableOpacity>
          <PortraitButton
            pictureUrl={profiles ? profiles.currentUser.images[0].medium : 'https://i.ytimg.com/vi/WKB0JUkksJg/maxresdefault.jpg'}
            onPress={this.onPressUserProfile}
          />
        </Header>
        <View style={!isMailSelected ? styles.container : styles.hiddenScreen}>
          <FlatList
            data={this.formatData(usersAr, 3)}
            ListEmptyComponent={this.renderListEmptyComponent}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            numColumns={3}
            refreshing={refreshing}
            onRefresh={this.loadUsers}
            onEndReached={() => {
              if (!isMailSelected) {
                this.loadUsers();
              }
            }
          }
            onEndReachedThreshold={10}
            contentContainerStyle={styles.contentContainer}
          />
          <SearchBar
            key="searchBar"
            onPressBars={this.onPressBars}
            onPressTab={this.onPressTab}
            activeTab={activeTab}
          />
        </View>
        {this.renderMessagePreview()}
      </View>
    );
  }
}

const getUsers = memoize((userIds, users) => userIds.map(id => users[id]));

function mapStateToProps(state) {
  const {
    users: {
      users,
      userIds,
    },
  } = state;
  return {
    users: state.users,
    activeTab: state.sort.activeTab,
    locations: state.filter.locations,
    nextPage: state.page.nextPage,
    maxPage: state.page.maxPage,
    usersAr: getUsers(userIds, users),
    profiles: state.profiles,
    refreshing: state.users.refreshing,
    message: state.message,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { ...filterActions,
    ...pageActions,
    ...usersActions,
    ...sortActions,
    ...profileActions,
    requestPreview,
    requestMessages,
    setMessages,
  }, dispatch,
);

export const Home = connect(mapStateToProps,
  mapDispatchToProps)(withNavigationFocus(UnconnectedHome));
