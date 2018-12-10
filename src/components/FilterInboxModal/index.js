// @flow

import React, { PureComponent } from 'react';
import { View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import colors from '../../global/colors';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  setFilter: (string) => void,
}

export default class FilterInboxModal extends PureComponent<Props> {

  onPressItem = (text: string) => {
    const { onClose, setFilter } = this.props;
    onClose();
    setFilter(text);
  };

  render() {
    const { isOpen, onClose } = this.props;
    return (

      <Modal
        transparent
        animationType="fade"
        visible={isOpen}
        onRequestClose={() => onClose()}
      >
        <TouchableWithoutFeedback
          onPress={() => onClose()}
        >
          <View style={styles.container}>
            <View style={styles.modalStyle}>
              <TouchableOpacity
                onPress={() => this.onPressItem('empty')}
                style={styles.item}
              >
                <View style={styles.iconContainer}>
                  <Icon name="email-outline" size={15} color={colors.black} />
                </View>
                <Text style={styles.text}>
              Inbox
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPressItem('online')}
                style={styles.item}
              >
                <View style={styles.iconContainer}>
                  <View style={styles.online} />
                </View>
                <Text style={styles.text}>
                Online
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.onPressItem('unread')}
                style={styles.item}
              >
                <View style={styles.iconContainer}>
                  <Icon name="mailbox" size={15} color={colors.black} />
                </View>
                <Text style={styles.text}>
                Unread
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPressItem('sent')}
                style={styles.item}
              >
                <View style={styles.iconContainer}>
                  <Icon name="send" size={15} color={colors.black} />
                </View>
                <Text style={styles.text}>
                Sent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPressItem('favorites')}
                style={styles.item}
              >
                <View style={styles.iconContainer}>
                  <Icon name="star" size={15} color={colors.black} />
                </View>
                <Text style={styles.text}>
                Favorites
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    );
  }
}
