// @flow

import React, { PureComponent } from 'react';
import { Modal, TouchableOpacity } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../global';

import styles from './styles';

type Props = {
  visible: boolean,
  onClose: () => void,
  viewedImageurl: [],
}

export class ImageFullSize extends PureComponent<Props> {

  render() {
    const { visible, onClose, viewedImageurl } = this.props;
    return (

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => onClose()}
      >
        <ImageViewer
          imageUrls={viewedImageurl}
          renderIndicator={() => null}
          enableSwipeDown
          onSwipeDown={() => onClose()}
        />
        <TouchableOpacity
          style={styles.imageViewerHeader}
          onPress={() => onClose()}
        >
          <Icon name="keyboard-arrow-left" size={30} color={colors.white} />
        </TouchableOpacity>
      </Modal>

    );
  }
}
