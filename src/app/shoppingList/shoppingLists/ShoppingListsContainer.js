// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as shoppingListsActions from './Actions';
import ShoppingListsList from './ShoppingListsList';

class ShoppingListsContainer extends Component {
  state = {
    isFetchingTop: false,
  };

  onShoppingListPressed = shoppingList => {
    this.props.showShoppingList(shoppingList.id);
  };

  onCreateShoppingListPressed = () => {
    this.props.showCreateShoppingList();
  };

  onRefresh = () => {
    const { shoppingLists } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(shoppingLists.edges.length, error => {
      //TODO: 20170610 - Morteza - Should handle the error here
      this.setState({
        isFetchingTop: false,
      });
    });
  };

  onEndReached = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(30, error => {
      //TODO: 20170610 - Morteza - Should handle the error here
    });
  };

  render = () => {
    return (
      <ShoppingListsList
        shoppingLists={this.props.user.shoppingLists.edges.map(_ => _.node)}
        onShoppingListPressed={this.onShoppingListPressed}
        onCreateShoppingListPressed={this.onCreateShoppingListPressed}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

ShoppingListsContainer.propTypes = {};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListsActions: bindActionCreators(shoppingListsActions, dispatch),
    showShoppingList: id =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingList',
          params: {
            id,
          },
        }),
      ),
    showCreateShoppingList: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingListDetail',
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListsContainer);
