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
  static navigationOptions = ({ navigation }) => ({
    headerRight: <HeaderContainer />,
    headerStyle: {
      backgroundColor: Color.primaryColorNormal,
    },
    title: navigation.state.params ? navigation.state.params.title : '',
  });

  shoppingListNameChanged = name => {
    this.props.shoppingListDetailActions.shoppingListNameChanged(
      Map({
        shoppingListName: name,
        shoppingListId: this.props.shoppingListId,
      }),
    );
  };

  render = () => {
    return (
      <ShoppingListDetail
        shoppingListName={this.props.shoppingListName}
        avatarUrl={this.props.avatarUrl}
        shoppingListNameChanged={this.shoppingListNameChanged}
      />
    );
  };
}

function mapStateToProps(state, props) {
  return {
    avatarUrl: state.userAccess.getIn(['userInfo', 'avatar']) ? state.userAccess.getIn(['userInfo', 'avatar']).data.url : null,
    shoppingListName: state.shoppingListDetail.get('shoppingListName')
      ? state.shoppingListDetail.get('shoppingListName')
      : props.navigation.state.params ? props.navigation.state.params.shoppingListName : '',
    shoppingListId: props.navigation.state.params ? props.navigation.state.params.shoppingListId : '',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListDetailActions: bindActionCreators(ShoppingListDetailActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListDetailContainer);
