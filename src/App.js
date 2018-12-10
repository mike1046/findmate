// @flow

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ModalQueue } from './components/ModalQueue';
import { AppNavigator } from './navigation';

import { onMount } from './redux/actions/core';
import { navigation } from './global';

type Props = {
  onMount: () => void,
};

export class UnconnectedApp extends PureComponent<Props> {
  componentDidMount() {
    const {
      onMount,
    } = this.props;
    onMount();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppNavigator
          ref={navigation.setNavigator}
        />
        <ModalQueue />
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

const mapDispatchToProps = dispatch => bindActionCreators(
  { onMount }, dispatch,
);
export const App = connect(null, mapDispatchToProps)(UnconnectedApp);
