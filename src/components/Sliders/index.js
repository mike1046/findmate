// @flow

import React, { PureComponent } from 'react';
import { View, Text, Slider } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { colors, utils } from '../../global';

import styles from './styles';

type Props = {
  age: Array<number>,
  changeAge: () => void,
  height: Array<number>,
  changeHeight: () => void,
  weight: Array<number>,
  changeWeight:() => void,
  lastActive: number,
  changeLastActive: (number) => void,
  distance: number,
  changeDistance: (number) => void,
  trust: number,
  responsiveness: number,
  changeTrust: (number) => void,
  changeResponsiveness: (number) => void,
};

type State = {
  sliderOneChanging: boolean,
}

export default class Sliders extends PureComponent<Props, State> {
  state = {
    sliderOneChanging: false,
  };

  render() {
    const {
      props: {
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
    } = this;
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>
          {`AGE ${age[0]} - ${age[1]}`}
        </Text>
        <MultiSlider
          markerStyle={styles.markerStyle}
          selectedStyle={styles.multiSliderSelected}
          values={age}
          sliderLength={280}
          onValuesChange={changeAge}
          min={18}
          max={60}
          step={1}
          allowOverlap
          snapped
        />
        <Text style={styles.headerStyle}>
          {`HEIGHT ${utils.getHeightString(height[0])} - ${utils.getHeightString(height[1])}`}
        </Text>
        <MultiSlider
          markerStyle={styles.markerStyle}
          selectedStyle={styles.multiSliderSelected}
          values={height}
          sliderLength={280}
          onValuesChange={changeHeight}
          min={48}
          max={78}
          step={1}
          allowOverlap
          snapped
        />
        <Text style={styles.headerStyle}>
          {`WEIGHT ${utils.getWeightString(weight[0])} - ${utils.getWeightString(weight[1])}`}
        </Text>
        <MultiSlider
          markerStyle={styles.markerStyle}
          selectedStyle={styles.multiSliderSelected}
          values={weight}
          sliderLength={280}
          onValuesChange={changeWeight}
          min={35}
          max={110}
          step={1}
          allowOverlap
          snapped
        />
        <Text style={styles.headerStyle}>
          {`ACTIVE IN THE LAST ${utils.getActiveInLast[lastActive]}`}
        </Text>
        <Slider
          thumbTintColor={colors.thumbTintColorAndroid}
          style={styles.slider}
          minimumTrackTintColor={colors.minimumTrackTintColor}
          value={lastActive}
          onValueChange={value => changeLastActive(value)}
          minimumValue={1}
          maximumValue={5}
          step={1}
        />
        <Text style={styles.headerStyle}>
          {`DISTANCE FROM ME ${utils.getDistance[distance]}`}
        </Text>
        <Slider
          thumbTintColor={colors.thumbTintColorAndroid}
          style={styles.slider}
          minimumTrackTintColor={colors.minimumTrackTintColor}
          value={distance}
          onValueChange={value => changeDistance(value)}
          minimumValue={1}
          maximumValue={5}
          step={1}
        />
        <Text style={styles.headerStyle}>
          {`MINIMUM TRUST SCORE ${trust}`}
        </Text>
        <Slider
          thumbTintColor={colors.thumbTintColorAndroid}
          style={styles.slider}
          minimumTrackTintColor={colors.minimumTrackTintColor}
          value={trust}
          onValueChange={value => changeTrust(value)}
          minimumValue={0}
          maximumValue={10}
          step={1}
        />
        <Text style={styles.headerStyle}>
          {`MINIMUM RESPONSIVENESS ${responsiveness}`}
        </Text>
        <Slider
          thumbTintColor={colors.thumbTintColorAndroid}
          style={styles.slider}
          minimumTrackTintColor={colors.minimumTrackTintColor}
          value={responsiveness}
          onValueChange={value => changeResponsiveness(value)}
          minimumValue={0}
          maximumValue={100}
          step={10}
        />
      </View>
    );
  }
}
