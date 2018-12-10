// @flow

import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import { colors, images } from '../../global';
import QuicksandText from '../QuicksandText';

type Props = {
  type: string,
  onPress?: () => void,
  pressible? : boolean,
  data: Object,
};

const renderPencilButton = onPress => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.pencilButton}
  >
    <Icon name="pencil" size={15} color={colors.black} />
  </TouchableOpacity>);

const renderKeyValue = (key, value) => (
  <View
    key={key}
  >
    <QuicksandText style={styles.subHeaderText}>
      {key}
    </QuicksandText>
    <QuicksandText style={styles.plainText}>
      {value}
    </QuicksandText>
  </View>
);

const renderLastLocation = (data) => {

  if (data.isVpn) {
    return <MIcon name="warning" size={15} color={colors.warning} style={styles.iconWrapper} />;
  }
  if (data.isDifferent) {
    return <MIcon name="info" size={15} color={colors.warning} style={styles.iconWrapper} />;
  }
  return <MIcon name="check" size={15} color={colors.check} style={styles.iconWrapper} />;
};

const renderDistance = (data) => {
  const {
    distance: {
      isLocal,
      distance,
      actualDistance,
    },
  } = data;
  const icon = isLocal ? <MIcon name="my-location" size={15} color={colors.isLocal} style={styles.iconWrapper} />
    : <MIcon name="flight-takeoff" size={15} color={colors.isLocal} style={styles.iconWrapper} />;

  return (
    <View style={styles.rowContainer}>
      {icon}
      <View style={styles.row}>
        <QuicksandText style={[styles.plainText]}>
          {distance}
        </QuicksandText>
        <QuicksandText style={[styles.actualDistance]}>
          {actualDistance}
        </QuicksandText>
      </View>
    </View>
  );

};

const renderLocationData = data => (
  <View>
    <QuicksandText style={styles.subHeaderText}>
      Stated Location
    </QuicksandText>
    <View style={styles.rowContainer}>
      <QuicksandText style={styles.plainText}>
        {data.statedLocation}
      </QuicksandText>
      <Image
        style={styles.flag}
        source={{ uri: data.countryFlagUrl }}
        defaultSource={images.defaultImage}
      />
    </View>
    <QuicksandText style={styles.subHeaderText}>
      Last Detected Location
    </QuicksandText>
    <View style={styles.rowContainer}>
      {renderLastLocation(data)}
      <QuicksandText style={[styles.plainText, data.isVpn && styles.redText]}>
        {data.lastDetectedLocation}
      </QuicksandText>
    </View>
    {data.distance && renderDistance(data)}
    <Image
      style={styles.cityMap}
      source={{ uri: data.cityMapUrl }}
      defaultSource={images.defaultImage}
    />
  </View>
);

const renderData = data => (
  Object.keys(data).map(key => renderKeyValue(key, data[key]))
);

const renderHeadline = data => (
  <QuicksandText style={styles.plainText}>
    {data.description}
  </QuicksandText>
);

export const Card = ({ type, pressible, onPress, data } : Props) => (
  <View style={styles.container}>
    <View style={styles.elevationLow}>
      <View style={styles.header}>
        <QuicksandText style={styles.headerText}>
          {(type === 'Locations' || type === 'About') ? type : data.headline}
        </QuicksandText>
        {pressible && renderPencilButton(onPress)}
      </View>
      { type === 'Locations' && renderLocationData(data)}
      { type === 'About' && renderData(data)}
      { type === 'Headline' && renderHeadline(data)}
    </View>
  </View>
);
