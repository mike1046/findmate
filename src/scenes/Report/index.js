// @flow

import React, { PureComponent } from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Header, QuicksandText } from '../../components';
import { colors, navigation, screens } from '../../global';
import { submitReport } from '../../redux/actions/profile';

import styles from './styles';

type Props = {
  navigation: Object,
  submitReport: (string, string, string) => void;
};

type State = {
  isInputActive: boolean,
  reportInput: string,
  render: string,
  chosenReason: string,
};

class UnconnectedReport extends PureComponent<Props, State> {

  state = {
    isInputActive: false,
    reportInput: '',
    render: 'list',
    chosenReason: '',
  };

  onPressClose = () => {
    navigation.goBack();
  }

  onPressCancel = () => {
    navigation.goBack();
  }

  reasons = {
    '1': 'Rude or abusive behavior',
    '2': 'Inappropriate content',
    '3': 'Fake photos (celebrity, model, etc)',
    '4': 'Sending spam messages',
    '5': 'Seems like a scammer',
    '9': 'Other',
  }

  renderReasons = () => Object.keys(
    this.reasons,
  ).map(key => this.renderKeyValue(key, this.reasons[key]));

  onPressListItem = (key) => {
    this.setState({ chosenReason: key,
      render: 'input',
    });
  };

  onFocusTextInput = () => {
    this.setState({ isInputActive: true });
  }

  handleChangeText = (text) => {
    this.setState({ reportInput: text });
  }

  renderInput = () => {
    const {
      state: {
        isInputActive,
        reportInput,
      },
    } = this;
    return (
      <View style={styles.inputWrapper}>
        <QuicksandText style={styles.tellUsMoreText}>
          PLEASE TELL US A BIT MORE TO FINISH YOUR REPORT
        </QuicksandText>
        <View style={[styles.inputContainer, isInputActive && styles.activeBorder]}>
          <TextInput
            multiline
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.textInput}
            placeholderStyle={styles.textInput}
            onChangeText={text => this.handleChangeText(text)}
            value={reportInput}
            onFocus={this.onFocusTextInput}
          />
        </View>
      </View>
    );
  }

  renderKeyValue = (key, value) => (
    <TouchableOpacity
      key={key}
      style={styles.listElement}
      onPress={() => this.onPressListItem(key)}
    >
      <QuicksandText style={styles.plainText}>
        {value}
      </QuicksandText>
      <Icon name="keyboard-arrow-right" size={20} color={colors.black} />
    </TouchableOpacity>
  )

  submitReport = () => {
    const {
      state: {
        chosenReason,
        reportInput,
      },
      props: {
        submitReport,
        navigation: {
          state: {
            params: userId,
          },
        },
      },
    } = this;

    if (chosenReason === '') {
      Alert.alert('Please choose category');
      return;
    }
    if (reportInput === '') {
      Alert.alert('Please leave your report');
      return;
    }
    submitReport(userId, chosenReason, reportInput);
    navigation.reset(screens.home);
  }

  renderButtons = () => (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => this.onPressCancel()}
        style={styles.button}
      >
        <QuicksandText style={styles.reportText}>
            Cancel
        </QuicksandText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.submitReport()}
        style={[styles.button, styles.submitReport]}
      >
        <QuicksandText style={styles.shareText}>
            Submit Report
        </QuicksandText>
      </TouchableOpacity>
    </View>
  )

  renderList = () => (
    <View>
      <View style={styles.listElement}>
        <QuicksandText style={styles.text}>
              Why are you reporting them?
        </QuicksandText>
      </View>
      {this.renderReasons()}
    </View>
  );

  render() {
    const {
      state: {
        render,
      },
    } = this;
    return (
      <View style={styles.container}>
        <Header>
          <QuicksandText style={styles.headerText}>
            Report Profile
          </QuicksandText>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onPressClose}
          >
            <Icon name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        </Header>
        { render === 'list' && this.renderList()}
        { render === 'input' && this.renderInput()}
        {this.renderButtons()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ submitReport }, dispatch);

export const Report = connect(null, mapDispatchToProps)(UnconnectedReport);
