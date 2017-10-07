// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import Styles from './Styles';

const LoadingInProgressPresentational = ({ messageToDisplay }) => (
  <View style={Styles.activityIndicator}>
    <Text>{messageToDisplay}</Text>
    <ActivityIndicator size="large" color="#3b5998" style={Styles.activityIndicator} />
  </View>
);

LoadingInProgressPresentational.propTypes = {
  messageToDisplay: PropTypes.string,
};

LoadingInProgressPresentational.defaultProps = {
  messageToDisplay: '',
};

export default LoadingInProgressPresentational;
