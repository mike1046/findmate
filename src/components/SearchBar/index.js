// @flow

import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../global/colors';
import styles from './styles';
import { QuicksandText } from '..';

type Props = {
  onPressBars: () => void,
  onPressTab: (string) => void,
  activeTab: string,
};

export default class SearchBar extends PureComponent<Props> {
  tabKeys = ['online', 'nearby', 'video', 'new'];

  render() {
    const {
      props: {
        onPressBars,
        onPressTab,
        activeTab,
      },
    } = this;

    return (
      <View style={styles.elevationLow}>
        <View
          style={styles.container}
        >
          {this.tabKeys.map((item) => {
            const isActive = item === activeTab;
            let text = 'Online';
            let iconName = 'public';
            if (item === 'nearby') {
              text = 'Nearby';
              iconName = 'my-location';
            }
            if (item === 'video') {
              text = 'Videos';
              iconName = 'videocam';
            }
            if (item === 'new') {
              text = 'New';
              iconName = 'whatshot';
            }
            return (
              <TouchableOpacity
                key={item}
                style={styles.barsButton}
                onPress={() => onPressTab(item)}
              >
                <Icon
                  name={iconName}
                  size={20}
                  color={isActive ? colors.blue1 : colors.bottomMenuInactive}
                />
                <QuicksandText
                  style={[styles.searchButtonText, isActive && styles.buttonActiveText]}
                >
                  {text}
                </QuicksandText>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.barsButton}
            onPress={onPressBars}
          >
            <Icon name="menu" size={20} color={colors.bottomMenuInactive} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
