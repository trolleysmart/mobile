// @flow

import React, {
  Component,
} from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  NavigationActions,
} from 'react-navigation';
import {
  bindActionCreators,
} from 'redux';
import FlyerDetail from './FlyerDetail';

class FlyersContainer extends Component {
  render = () => {
    return <FlyerDetail />;
  }
}

export default FlyersContainer;
