// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import ShoppingListDetail from './ShoppingListDetail';
import HeaderContainer from './HeaderContainer';
import * as ShoppingListDetailActions from './Actions';
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

  shoppingListNameChanged = name => {
    this.props.shoppingListDetailActions.shoppingListNameChanged(
      Map({
        shoppingListName: name,
      }),
    );
  };

  render = () => {
    return <ShoppingListDetail avatarUrl={this.props.avatarUrl} shoppingListNameChanged={this.shoppingListNameChanged} />;
  };
}

function mapStateToProps(state) {
  return {
    avatarUrl: state.userAccess.getIn(['userInfo', 'avatar']) ? state.userAccess.getIn(['userInfo', 'avatar']).data.url : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListDetailActions: bindActionCreators(ShoppingListDetailActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListDetailContainer);
