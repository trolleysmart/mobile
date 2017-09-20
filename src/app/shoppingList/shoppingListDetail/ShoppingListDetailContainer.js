// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import ShoppingListDetail from './ShoppingListDetail';
import HeaderContainer from './HeaderContainer';
import { Color } from '../../../framework/style/DefaultStyles';

class ShoppingListDetailContainer extends Component {
  static navigationOptions = {
    headerRight: <HeaderContainer />,
    headerStyle: {
      backgroundColor: Color.primaryColorNormal,
    },
    // headerBackTitle: null,
    // headerLe: <View />,
  };

  render = () => {
    return <ShoppingListDetail avatarUrl={this.props.avatarUrl} />;
  };
}

function mapStateToProps(state) {
  return {
    avatarUrl: state.userAccess.getIn(['userInfo', 'avatar']) ? state.userAccess.getIn(['userInfo', 'avatar']).data.url : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListDetailContainer);
