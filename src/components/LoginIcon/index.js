// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import colors from '../../global/colors';

type Props = {
icon: string,
onPress: () => void,
loginName: string,
};

const LoginIcon = ({ icon, onPress, loginName }: Props) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.image}
      onPress={onPress}
    >
      { (loginName === 'Facebook')
        ? (<FontAwesomeIcon name={icon} size={20} color={colors.facebookLogo} />)

        : <Icon name={icon} size={20} color={colors.black} />
}
    </TouchableOpacity>
    <Text style={styles.nameText}>
      {loginName}
    </Text>
  </View>
);

export default LoginIcon;
