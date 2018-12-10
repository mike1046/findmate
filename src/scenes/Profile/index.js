// @flow

import React, { Component, type ElementRef } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, RefreshControl, Animated, SectionList, FlatList, Switch } from 'react-native';
import Swiper from 'react-native-swiper';
import { type NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { QuicksandText, Card, SettingsCard } from '../../components';
import { requestProfile, requestProfileMeta, requestChangeProfileSettings, requestInterests, clearProfile } from '../../redux/actions/profile';
import { setOnboarding } from '../../redux/actions/onboarding';
import { logOut } from '../../redux/actions/login';
import { requestSettings, requestNotificationsChange, requestSmsPrivacyChange } from '../../redux/actions/settings';
import { ProfileView } from '../../components/ProfileView';
import { colors, navigation, screens } from '../../global';
import { flagUrl, cityMapUrl } from '../../global/apiUrl';
import styles from './styles';

type Params = {
};

type Props = {
  navigation: NavigationScreenProp<{ params: Params }>,
  profiles: Object,
  settings: Object,
  login: Object,
  requestChangeProfileSettings: (string, boolean, string) => void,
  requestInterests: () => void,
  requestProfileMeta: (number) => void,
  setOnboarding: (Object) => void,
  requestProfile: (number) => void,
  requestSmsPrivacyChange: (boolean, string) => void,
  requestSettings: () => void,
  logOut: () => void,
  requestNotificationsChange: (number, string, boolean) => void,
  shareUrl: string,
};

type State = {
  activeTab: string,
};

class UnconnectedProfile extends Component<Props, State> {
  _notification: ElementRef<typeof Animated.View>;

  state = {
    activeTab: 'myProfile',
  };

  componentWillMount() {
  }

  userInteract = false;

  closeProfile = () => {
    navigation.goBack();
  };

  onPressMyProfile = () => {
    this.setState({
      activeTab: 'myProfile',
    });
  };

  onPressInterests = () => {
    const {
      props: {
        requestInterests,
      },
    } = this;
    this.setState({
      activeTab: 'interests',
    });
    requestInterests();
  };

  onPressSettings = () => {
    const {
      props: {
        requestSettings,
      },
    } = this;
    requestSettings();
    this.setState({
      activeTab: 'settings',
    });
  };

  onPressChangeAbout = () => {
    reactotron.log('change about pressed');
  };

  onPressChangeHeadline = () => {
    reactotron.log('change headline pressed');
  };

  onPressChangeLocation = () => {
    reactotron.log('change  location pressed');
  };

  createAboutData = () => {
    const {
      props: {
        profiles: {
          currentUserMeta,
        },
      },
    } = this;
    return currentUserMeta.about;
  };

  createLocationData = () => {
    const {
      props: {
        profiles: {
          currentUser: {
            city: {
              name: city,
            },
            country: {
              name: country,
              iso_alpha2: countryCode,
            },
          },
          currentUserMeta: {
            location: {
              meta: {
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
    };
  };

  createHeadlineData = () => {
    const {
      props: {
        profiles: {
          currentUser,
        },
      },
    } = this;
    const response = currentUser;
    return {
      headline: response.bio.headline,
      description: response.bio.description,
    };
  };

  renderPhotoes = data => (
    data.map(item => (
      <View
        style={styles.slide}
        key={item.large}
      >
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: item.large }}
        />
      </View>
    ))
  );

  renderCards = () => (
    <View>
      <Card
        pressible
        onPress={() => this.onPressChangeHeadline()}
        type="Headline"
        data={this.createHeadlineData()}
      />
      <Card
        pressible
        onPress={() => this.onPressChangeAbout()}
        type="About"
        data={this.createAboutData()}
      />
      <Card
        pressible
        onPress={() => this.onPressChangeLocation()}
        type="Locations"
        data={this.createLocationData()}
      />
    </View>
  )

  onRefresh =() => {
    const {
      props: {
        profiles: {
          currentUser,
        },
      },
    } = this;
    requestProfileMeta(currentUser.meta.userId, 'myProfile');
  };

  renderMyProfileTab = () => {
    const {
      props: {
        profiles: {
          currentUser,
          isLoading,
          isMetaLoading,
        },
      },
    } = this;
    const trust = currentUser.meta.trust;
    const responsiveness = currentUser.meta.responsiveness;
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
        <Swiper
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
          {this.renderPhotoes(currentUser.images)}
        </Swiper>
        <View style={styles.progressContainer}>
          <View style={styles.roundIndicatorContainer}>
            <Progress.Circle
              size={90}
              progress={trust / 10}
              color={colors.profileActiveBlue}
              unfilledColor={colors.indicatorGrey}
              borderWidth={0}
              thickness={3}
              showsText
              textStyle={styles.textCircle}
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
              textStyle={styles.textCircle}
              formatText={() => `    ${responsiveness}%${'\n'}REPLIES`}
            />
          </View>
        </View>
        {!isLoading && !isMetaLoading && this.renderCards()}
      </ScrollView>
    );
  };

  onPressAnotherProfile = (item) => {
    const {
      props: {
        requestProfileMeta,
        requestProfile,
      },
    } = this;
    requestProfile(item.userId);
    requestProfileMeta(item.userId);
    navigation.navigate(screens.anotherProfile, { sholudClearProfileAfterClosing: true });
  };

  renderItem = (rowitem) => {
    const { item } = rowitem;
    return (
      <ProfileView
        onPressProfile={() => this.onPressAnotherProfile(item)}
        key={item.userId}
        pictureUrl={item.primaryImageUrl}
        countryName={item.created}
      />

    );
  };

  renderItemSectionList = item => (
    <FlatList
      keyExtractor={item => item.userId}
      data={item}
      numColumns={3}
      renderItem={this.renderItem}
    />
  );

  createDataForSectionList = (array) => {
    const result = [];
    let i;
    for (i = 0; i < array.length; i++) {
      if (array[i].success === true) {
        const data = [];
        data.push(array[i].users);
        const section = {
          title: array[i].meta.title,
          data,
        };
        result.push(section);
      }
    }
    return result;
  };

  renderInterestsTab = () => {
    const {
      props: {
        profiles,
      },
    } = this;
    return (
      <SectionList
        renderItem={({ item }) => (
          this.renderItemSectionList(item))}
        refreshing={profiles.isLoading}
        renderSectionHeader={({ section: { title } }) => (
          <QuicksandText style={styles.sectionListHeader}>
            {title}
          </QuicksandText>
        )}
        sections={this.createDataForSectionList(profiles.interests)}
        keyExtractor={(item, index) => item.userId + index}
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  onPressListItem = (key: string) => {
    const { setOnboarding } = this.props;
    if (key === 'manualLocation') {
      key = 'location';
      setOnboarding({ renderLocation: 'search' });
    }
    if (key === 'login') {
      key = 'password';
    }
    if (key === 'phoneNumber') {
      key = 'phone';
    }
    if (key === 'profile') {
      key = 'questions';
    }
    navigation.navigate(screens[key], { fromSettings: true });
  };

  onPressSignOut = () => {
    const {
      props: {
        logOut,
      },
    } = this;
    navigation.reset(screens.login);
    logOut();
  };

  onPressPrivacyPolicy = () => {
    navigation.navigate(screens.settingsText, { key: 'privacy' });
  };

  onPressTermsAndConditions = () => {
    navigation.navigate(screens.settingsText, { key: 'terms' });
  };

  onPressDeleteAccount = () => {
    navigation.reset(screens.delete);
  };

  renderProfileSettingsItems = (data: Object) => {
    const dataArray = Object.keys(data);
    const lastElement = dataArray.length - 1;
    return dataArray.map((key, index) => (
      <TouchableOpacity
        key={key}
        style={[styles.listElement, index === lastElement && styles.lastElement]}
        onPress={() => this.onPressListItem(key)}
      >
        {data[key].complete
          ? (<MCIcon name="check-circle-outline" size={20} color={colors.greenProfile} />)
          : (<MCIcon name="minus-circle-outline" size={20} color={colors.gray1} />)
       }
        <QuicksandText style={styles.plainText}>
          {data[key].label}
        </QuicksandText>
        <Icon name="keyboard-arrow-right" size={20} color={colors.black} />
      </TouchableOpacity>
    ));
  };

  renderNotifications = (notifications, smsNotifications) => (
    <View>
      <View style={styles.notificationLine}>
        <QuicksandText style={styles.notificationName} />
        <View style={styles.notificationItemWrapper}>
          <QuicksandText>
            Email
          </QuicksandText>
        </View>
        <View style={styles.notificationItemWrapper}>
          <QuicksandText>
          Push
          </QuicksandText>
        </View>
      </View>
      {notifications.map(item => (
        <View
          key={item.notificationName}
          style={styles.notificationLine}
        >
          <QuicksandText style={styles.notificationName}>
            {item.notificationName}
          </QuicksandText>
          <Switch
            value={item.unsubscribed.email}
            onValueChange={value => this.onValueChangeNotification(item, 'email', value)}
          />
          <Switch
            value={item.unsubscribed.push}
            onValueChange={value => this.onValueChangeNotification(item, 'push', value)}
          />
        </View>
      ))}

      <View style={styles.separator} />
      <View style={styles.notificationLine}>
        <Switch
          value={smsNotifications}
          onValueChange={value => this.onValueChangeSmsPrivacy(value, 'setSmsNotifications')}
        />
        <QuicksandText style={styles.textRightToSwitcher}>
            SMS Notifications
        </QuicksandText>
      </View>
    </View>
  );

  onValueChangeNotification = (item, type, value) => {
    const {
      props: {
        requestNotificationsChange,
      },
    } = this;
    requestNotificationsChange(item.notificationId, type, value);
  };

  onValueChangeSmsPrivacy = (value, type) => {
    const {
      props: {
        requestSmsPrivacyChange,
      },
    } = this;
    requestSmsPrivacyChange(value, type);
  };

  privacyUpperMessage = 'By setting your profile to private, you will no longer show up in search. Only members you have already interacted with will be able to see your profile.';

  renderPrivacy = privacy => (
    <View>
      <QuicksandText style={styles.privacyUpperMessage}>
        {this.privacyUpperMessage}
      </QuicksandText>
      <View style={styles.notificationLine}>
        <Switch
          value={privacy}
          onValueChange={value => this.onValueChangeSmsPrivacy(value, 'setPrivate')}
        />
        <QuicksandText style={styles.textRightToSwitcher}>
          {privacy ? 'Private' : 'Public'}
        </QuicksandText>
      </View>
      <QuicksandText style={styles.boldText}>
      We take your privacy seriously
      </QuicksandText>
      <View style={styles.notificationLine}>
        <TouchableOpacity onPress={() => this.onPressTermsAndConditions()}>
          <QuicksandText style={styles.signOutText}>
            {'Terms & Conditions'}
          </QuicksandText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPressPrivacyPolicy()}>
          <QuicksandText style={styles.signOutText}>
          Privacy Policy
          </QuicksandText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => this.onPressDeleteAccount()}>
        <QuicksandText style={styles.deleteAccountText}>
        Delete Your Profile
        </QuicksandText>
      </TouchableOpacity>
    </View>
  );

  renderSettingsTab = () => {
    const {
      props: {
        profiles: {
          currentUser,
        },
        settings: {
          isLoading,
          profileStatusItems,
          notifications,
          privacy,
          smsNotifications,
        },
      },
    } = this;

    let nickName = '';
    if (currentUser) {
      const {
        bio,
      } = currentUser;
      if (bio) {
        const { slug } = bio;
        nickName = slug;
      }
    }
    const sms = smsNotifications === '1' || smsNotifications === true || smsNotifications === 1;
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
        <SettingsCard
          header={null}
        >
          <View style={styles.cardHeader}>
            <QuicksandText>
              Logged in as
            </QuicksandText>
            <TouchableOpacity
              onPress={() => this.onPressSignOut()}
            >
              <QuicksandText style={styles.signOutText}>
                Sign out
              </QuicksandText>
            </TouchableOpacity>
          </View>
          <QuicksandText style={styles.nickNameText}>
            {nickName}
          </QuicksandText>
        </SettingsCard>
        {!isLoading ? (
          <View>
            <SettingsCard
              header="Profile"
            >
              {this.renderProfileSettingsItems(profileStatusItems)}
            </SettingsCard>
            <SettingsCard
              header="Notifications"
            >
              {this.renderNotifications(notifications, sms)}
            </SettingsCard>
            <SettingsCard
              header="Privacy"
            >
              {this.renderPrivacy(privacy)}
            </SettingsCard>

          </View>
        ) : null }
      </ScrollView>
    );
  };

  renderTab = () => {
    const {
      state: {
        activeTab,
      },
    } = this;
    if (activeTab === 'myProfile') {
      return this.renderMyProfileTab();
    } if (activeTab === 'interests') {
      return this.renderInterestsTab();
    } if (activeTab === 'settings') {
      return this.renderSettingsTab();
    }
  };

  renderHeader = () => {
    const {
      state: {
        activeTab,
      },
    } = this;

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => this.onPressMyProfile()}>
          <QuicksandText style={[styles.tabText, (activeTab === 'myProfile') && styles.activeTabText]}>
            My Profile
          </QuicksandText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPressInterests()}>
          <QuicksandText style={[styles.tabText, (activeTab === 'interests') && styles.activeTabText]}>
            Interests
          </QuicksandText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPressSettings()}>
          <QuicksandText style={[styles.tabText, (activeTab === 'settings') && styles.activeTabText]}>
            Settings
          </QuicksandText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeProfile}
        >
          <Icon name="close" size={20} color={colors.black} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderTab()}
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
  settings: state.settings,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestProfile,
    requestProfileMeta,
    requestChangeProfileSettings,
    requestInterests,
    clearProfile,
    requestSettings,
    requestNotificationsChange,
    requestSmsPrivacyChange,
    logOut,
    setOnboarding,
  }, dispatch,
);

export const Profile = connect(mapStateToProps, mapDispatchToProps)(UnconnectedProfile);
