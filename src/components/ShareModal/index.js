// @flow

import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native';

import { pinterestUrl, tumblrUrl, redditUrl, facebookUrl, twitterUrl, googleUrl } from '../../global/shareUrl';
import styles from './styles';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  shareUrl: string,
}

export default class ShareModal extends Component<Props> {

  openUrl = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    }).catch(error => reactotron.log({ error }));
  }

  onPressItem = (key: string, value: string) => {
    const { props:
       {
         shareUrl,
       },
    } = this;
    let url = '';
    if (value === 'PINTEREST') {
      url = pinterestUrl(shareUrl);
    }
    if (value === 'TUMBLR') {
      url = tumblrUrl(shareUrl);
    }
    if (value === 'REDDIT') {
      url = redditUrl(shareUrl);
    }
    if (value === 'FACEBOOK') {
      url = facebookUrl(shareUrl);
    }
    if (value === 'TWITTER') {
      url = twitterUrl(shareUrl);
    }
    if (value === 'GOOGLEPLUS') {
      url = googleUrl(shareUrl);
    }
    if (url !== '') {
      this.openUrl(url);
    }
    const { onClose } = this.props;
    onClose();
  };

  socialNets = {
    'Facebook': 'FACEBOOK',
    'Twitter': 'TWITTER',
    'Pinterest': 'PINTEREST',
    'Google+': 'GOOGLEPLUS',
    'reddit': 'REDDIT',
    'Tumblr': 'TUMBLR',
  };

  renderKeyValue = (key: string, value: any) => (
    <TouchableOpacity
      key={key}
      onPress={() => this.onPressItem(key, value)}
      style={styles.item}
    >
      <Text style={styles.text}>
        {key}
      </Text>
    </TouchableOpacity>
  )

  renderSocial = (socialNets : Object): any[] => Object.keys(socialNets)
    .map(key => this.renderKeyValue(key, socialNets[key]));

  render() {
    const { isOpen, onClose } = this.props;
    return (

      <Modal
        transparent
        animationType="slide"
        visible={isOpen}
        onRequestClose={() => onClose()}
      >
        <TouchableWithoutFeedback
          onPress={() => onClose()}
        >
          <View style={styles.container}>
            <View style={styles.modalStyle}>
              {this.renderSocial(this.socialNets)}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    );
  }
}
