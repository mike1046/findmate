// @flow

import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigation, screens } from '../../../../global';
import { requestLocations, sendLocation, setOnboarding } from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button } from '../../../../components';
import styles from './styles';

type Props = {
  navigation: Object,
  closestLocation: Object,
  requestLocations: (string, any) => void,
  sendLocation: (number, string) => void,
  onboarding: Object,
  nearbyLocations: Object,
  searchLocations: Object,
  renderLocation: string,
  setOnboarding: Object => void,
  profiles: Object,
};
type State = {
  isSettingsOpened: boolean,
  searchInput: string,
}

class UnconnectedLocation extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
    searchInput: '',
  };

  componentDidMount() {
    const {
      props: {
        requestLocations,
        renderLocation,
      },
    } = this;
    if (renderLocation === 'closest') {
      requestLocations('closest');
    }
    const { profiles } = this.props;
    if (profiles) {
      if (profiles.steps) {
        if (profiles.steps.location.currentValues) {
          const { location } = profiles.steps.location.currentValues;
          this.setState({
            searchInput: location,
          });
        }
      }
    }
  }

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

  onSendClosest = () => {
    const { sendLocation, closestLocation } = this.props;
    if (closestLocation) {
      const { locationId, city } = closestLocation;
      if (typeof city === 'object') {
        const { cityId, cityName } = city;
        sendLocation(cityId, cityName);
      } else sendLocation(locationId, city);
    }
  }

  onPressNearbyItem = (locationId, location) => {
    const { sendLocation } = this.props;
    sendLocation(locationId, location);
  }

  onChangeText = (text) => {
    const { requestLocations, setOnboarding } = this.props;
    if (text === '' || text === null) {
      setOnboarding({ searchLocations: {} });
    }
    this.setState({ searchInput: text });
    requestLocations('search', text);
  }

  onPressNoClosest = () => {
    const { setOnboarding, requestLocations } = this.props;

    requestLocations('nearby');
    setOnboarding({ renderLocation: 'nearby' });
  }

  onPressNoNearby = () => {
    const { setOnboarding } = this.props;
    setOnboarding({ renderLocation: 'search' });
  }

  renderNearbyLocations = (nearby) => {
    const { nearbyCities } = nearby;

    if (!nearbyCities) return null;
    const citiesKeys = Object.keys(nearbyCities);

    return citiesKeys.map(key => (
      <TouchableOpacity
        key={key}
        style={styles.cityItem}
        onPress={() => this.onPressNearbyItem(key, nearbyCities[key])}
      >
        <QuicksandText>
          {nearbyCities[key]}
        </QuicksandText>
      </TouchableOpacity>
    ));
  }

  renderSearch = (searchLocations) => {
    const { searchResults } = searchLocations;

    if (!searchResults) return null;

    return searchResults.map(item => (
      <TouchableOpacity
        key={item.locationId}
        style={styles.cityItem}
        onPress={() => this.onPressNearbyItem(item.locationId, item.locationName)}
      >
        <QuicksandText>
          {item.locationName}
        </QuicksandText>
      </TouchableOpacity>
    ));
  }

  goBack = () => {
    navigation.goBack();
  }

  render() {
    const {
      state: {
        isSettingsOpened,
        searchInput,
      },
      props: {
        navigation,
        closestLocation,
        nearbyLocations,
        renderLocation: render,
        searchLocations,
      },
    } = this;
    const { city, country } = closestLocation;
    let cityName = '';
    let countryName = '';

    if (typeof city === 'string') {
      cityName = city;
      countryName = country;
    } else if (typeof city === 'object') {
      cityName = city.cityName;
      countryName = country.name;
    }
    let settings = false;
    if (navigation.state.params) {
      const { fromSettings } = navigation.state.params;
      if (fromSettings) {
        settings = true;
      }
    }

    return (
      <BackgroundOnboarding
        onCloseModal={this.onCloseModal}
        onPressMenu={this.onPressMenu}
        onPressMenuButton={settings ? this.goBack : this.onPressSignIn}
        isSettingsOpened={isSettingsOpened}
        buttonMenuText={settings ? 'Go back' : 'Sign In'}
      >
        <SettingsCard
          header="Location"
        >
          <View style={styles.cardContent}>
            {render === 'closest' && (
            <View style={styles.innerContainer}>
              <QuicksandText style={styles.question}>
            Is this location correct?
              </QuicksandText>
              <QuicksandText style={styles.city}>
                {(cityName) || '' }
              </QuicksandText>
              <QuicksandText style={styles.country}>
                {(countryName) || '' }
              </QuicksandText>

              <Button
                onPress={this.onSendClosest}
                text="Yes, this is correct"
              />
              <QuicksandText
                style={styles.noText}
                onPress={this.onPressNoClosest}
              >
              No, its wrong
              </QuicksandText>
            </View>
            ) }
            {render === 'nearby' && (
              <View style={styles.innerContainer}>
                <QuicksandText style={styles.question}>
                Are you in one of these cities?
                </QuicksandText>
                <QuicksandText>
                  Click the city you are in
                </QuicksandText>
                {this.renderNearbyLocations(nearbyLocations)}

                <Button
                  onPress={this.onPressNoNearby}
                  text="No, I am somwere else"
                />

              </View>
            )}
            {render === 'search' && (
              <View style={styles.innerContainer}>
                <QuicksandText style={styles.question}>
                Enter your city
                </QuicksandText>
                <View style={[styles.textInputWrapper, styles.activeBorder]}>
                  <TextInput
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={styles.textInput}
                    placeholderStyle={styles.textInput}
                    placeholder="Type city name..."
                    onChangeText={text => this.onChangeText(text)}
                    value={searchInput}
                  />
                </View>
                {this.renderSearch(searchLocations)}
              </View>
            )}
          </View>
        </SettingsCard>
      </BackgroundOnboarding>
    );
  }
}

const mapStateToProps = state => ({
  closestLocation: state.onboarding.closestLocation,
  renderLocation: state.onboarding.renderLocation,
  nearbyLocations: state.onboarding.nearbyLocations,
  searchLocations: state.onboarding.searchLocations,
  profiles: state.profiles,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestLocations,
    sendLocation,
    setOnboarding,
  }, dispatch,
);

export const Location = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLocation);
