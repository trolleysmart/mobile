// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
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

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListDetailContainer);
