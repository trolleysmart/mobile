// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import ShoppingListDetail from './ShoppingListDetail';
import HeaderContainer from './HeaderContainer';

class ShoppingListDetailContainer extends Component {
  static navigationOptions = {
    headerRight: <HeaderContainer />,
    // headerBackTitle: null,
    // headerLe: <View />,
  };

  render = () => {
    return <ShoppingListDetail />;
  };
}

export default ShoppingListDetailContainer;
