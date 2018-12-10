// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SectionList, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as filterActions from '../../redux/actions/filter';
import * as usersActions from '../../redux/actions/users';
import { resetPage } from '../../redux/actions/page';
import { Header, Sliders } from '../../components';

import { colors, navigation } from '../../global';
import styles from './styles';

type Props = {
  withdrawLocation: (Object) => void,
  resetFilter: () => void,
  resetPage: () => void,
  clearUsers: () => void,
  requestUsers: () => void,
  cities: Array<Object>,
  addLocation: (Object) => void,
  locations: Array<Object>,
  age: Array<number>,
  changeAge: () => void,
  height: Array<number>,
  changeHeight: () => void,
  weight: Array<number>,
  changeWeight: () => void,
  lastActive: number,
  changeLastActive: () => void,
  distance: number,
  changeDistance: () => void,
  trust: number,
  responsiveness: number,
  changeTrust: () => void,
  changeResponsiveness: () => void,
};

type State = {
  locationsChosen: Array<string>,
  locationIds: Array<string>,
  searchInput: string,
  countries: Array<Object>,
  shouldSectionListShow: boolean,
};

class UnconnectedFilter extends PureComponent<Props, State> {

  state = {
    locationsChosen: [],
    locationIds: [],
    searchInput: '',
    countries: [],
    shouldSectionListShow: false,
  };

  componentDidMount() {
    const countriesObj = require('./countries.json').search.location.countriesById;
    const countriesArr = [];

    Object.keys(countriesObj).forEach((key) => {
      countriesArr.push({
        type: 'country',
        id: key,
        name: countriesObj[key],
      });
    });
    this.setState({
      countries: countriesArr,
    });
  }

  handleChangeText = (text) => {
    this.setState({ searchInput: text });
  }

  onFocusTextInput = () => {
    this.setState({ shouldSectionListShow: true });
  }

  renderChosenLocations = (data) => {
    const {
      props: {
        withdrawLocation,
      },
      state: {
        searchInput,
      },
    } = this;
    const placeholder = data.length > 0 ? '...' : 'Choose a country...';
    return (
      <View style={styles.mapView}>
        {data.map(item => (
          <View
            style={styles.chosenLocationContainer}
            key={item.id}
          >
            <Text
              style={styles.chosenLocationText}
            >
              {item.name}
            </Text>
            <TouchableOpacity
              style={styles.deleteLocationButton}
              onPress={() => withdrawLocation(item)}
            >
              <Icon name="close" size={15} color={colors.red} />
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.textInput}
          placeholderStyle={styles.textInput}
          placeholder={placeholder}
          onChangeText={text => this.handleChangeText(text)}
          value={searchInput}
          onFocus={this.onFocusTextInput}
        />
      </View>
    );
  }

  peelData = (data) => {
    const {
      state: {
        searchInput,
      },
    } = this;
    const result = data.filter(item => item.name.startsWith(searchInput) || searchInput === '');
    return result;
  }

  onPressItem = (item) => {
    const {
      state: {
        locationIds,
      },
    } = this;
    this.setState({
      locationIds: [...locationIds, item.id],
      shouldSectionListShow: false,
    });
    Keyboard.dismiss();
    this.onPressLocation(item);
  }

   onPressClose= () => {
     navigation.goBack();
   }

   onPressUpdate= () => {
     const {
       props: {
         resetPage,
         requestUsers,
         clearUsers,
       },
     } = this;
     resetPage();
     clearUsers();
     requestUsers();
     this.onPressClose();
   }

   onPressReset = () => {
     const {
       props: {
         resetFilter,
       },
     } = this;
     resetFilter();
     this.onPressUpdate();
   }

   onPressLocation= (item) => {
     const {
       state: {
         locationsChosen,
       },
       props: {
         addLocation,
       },
     } = this;
     this.setState({
       locationsChosen: [...locationsChosen, item],
     });
     addLocation(item);
   }

   renderItemSectionList = (item, index) => {
     const {
       state: {
         locationIds,
       },
     } = this;
     if (!locationIds.includes(item.id)) {
       return (
         <TouchableOpacity
           style={styles.itemAtSectionList}
           onPress={() => this.onPressItem(item)}
         >
           <Text
             style={styles.textItemAtList}
             key={index}
           >
             { item.name }
           </Text>
         </TouchableOpacity>
       );
     }
     return null;
   }

  renderLocationsSections = () => {
    const {
      state: {
        countries,
      },
      props: {
        cities,
      },
    } = this;
    return (
      <View style={styles.sectionListContainer}>
        <SectionList
          renderItem={({ item, index }) => this.renderItemSectionList(item, index)}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={[styles.itemAtSectionList, styles.sectionListHeader]}>
              {title}
            </Text>
          )}
          sections={[
            { title: 'LOCATIONS', data: this.peelData(cities) },
            { title: 'COUNTIRES', data: this.peelData(countries) },
          ]}
          keyExtractor={(item, index) => item.name + index}
          keyboardShouldPersistTaps="handled"
          style={styles.sectionList}
        />
      </View>
    );
  }

  render() {
    const { props: {
      locations,
      age,
      changeAge,
      height,
      changeHeight,
      weight,
      changeWeight,
      lastActive,
      changeLastActive,
      distance,
      changeDistance,
      trust,
      responsiveness,
      changeTrust,
      changeResponsiveness,
    },
    state: {
      shouldSectionListShow,
    },
    } = this;
    return (
      <View style={styles.modalContainer}>
        <Header>
          <Text style={styles.headerText}>
                Search Filters
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onPressClose}
          >
            <Icon name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        </Header>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.containerLocations}>
            <Text style={styles.headerStyleLocations}>
            LOCATIONS
            </Text>
            <View style={[styles.inputContainer, shouldSectionListShow && styles.activeBorder]}>
              {this.renderChosenLocations(locations)}

            </View>
            <View style={styles.slidersContainer}>

              <Sliders
                age={age}
                changeAge={changeAge}
                height={height}
                changeHeight={changeHeight}
                weight={weight}
                changeWeight={changeWeight}
                lastActive={lastActive}
                changeLastActive={changeLastActive}
                distance={distance}
                changeDistance={changeDistance}
                trust={trust}
                changeTrust={changeTrust}
                responsiveness={responsiveness}
                changeResponsiveness={changeResponsiveness}
              />

              {shouldSectionListShow && this.renderLocationsSections()}
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonsPanel}>
          <TouchableOpacity
            onPress={() => this.onPressReset()}
          >
            <Text style={styles.resetButtonText}>
                Reset Filters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressUpdate()}
            style={styles.updateButton}
          >
            <Text style={styles.updateButtonText}>
                Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.filter.locations,
  age: state.filter.age,
  height: state.filter.height,
  weight: state.filter.weight,
  lastActive: state.filter.lastActive,
  distance: state.filter.distance,
  trust: state.filter.trust,
  responsiveness: state.filter.responsiveness,
  cities: state.cache.cities,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...filterActions,
  ...usersActions,
  resetPage }, dispatch);

export const Filter = connect(mapStateToProps, mapDispatchToProps)(UnconnectedFilter);
