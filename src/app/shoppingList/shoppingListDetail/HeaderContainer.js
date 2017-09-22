// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { TouchableIcon } from '../../../components/touchableIcon';
import { AddShoppingList } from '../../../framework/relay/mutations';
import { environment } from '../../../framework/relay';

class HeaderContainer extends Component {
  saveShoppingListDetail = () => {
    AddShoppingList.commit(environment, this.props.userId, this.props.shoppingListName);
    this.props.gotoShoppingLists();
  };

  render = () => {
    return (
      <View>
        <TouchableIcon
          disabled={this.props.shoppingListName.trim() ? false : true}
          iconName="md-checkmark"
          iconType="ionicon"
          onPress={this.saveShoppingListDetail}
        />
      </View>
    );
  };
}

function mapStateToProps(state) {
  return {
    shoppingListName: state.shoppingListDetail.get('shoppingListName'),
    userId: state.userAccess.get('userInfo').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gotoShoppingLists: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingLists',
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
