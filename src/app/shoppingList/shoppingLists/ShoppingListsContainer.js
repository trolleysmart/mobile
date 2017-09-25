// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Map } from 'immutable';
import * as shoppingListsActions from './Actions';
import * as shoppingListDetailActions from '../shoppingListDetail/Actions';
import ShoppingListsList from './ShoppingListsList';
import { RemoveShoppingList } from '../../../framework/relay/mutations';
import { environment } from '../../../framework/relay';
import { type ShoppingListsRelayContainer_user } from './__generated__/ShoppingListsRelayContainer_user.graphql';

type Props = {
  user: ShoppingListsRelayContainer_user,
};

type State = {};

class ShoppingListsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  onShoppingListPressed = shoppingList => {
    this.props.gotoShoppingList(shoppingList);
  };

  onCreateShoppingListPressed = () => {
    this.props.shoppingListDetailActions.shoppingListNameChanged(
      Map({
        shoppingListName: '',
        shoppingListId: '',
      }),
    );
    this.props.gotoCreateShoppingList();
  };

  onEditShoppingListPressed = (shoppingListId, shoppingListName) => {
    this.props.shoppingListDetailActions.shoppingListNameChanged(
      Map({
        shoppingListName: '',
        shoppingListId: '',
      }),
    );
    this.props.gotoEditShoppingList(shoppingListId, shoppingListName);
  };

  onDeleteShoppingListPressed = shoppingListId => {
    RemoveShoppingList.commit(environment, this.props.userId, shoppingListId);
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
        onEditShoppingListPressed={this.onEditShoppingListPressed}
        onDeleteShoppingListPressed={this.onDeleteShoppingListPressed}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

ShoppingListsContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    userId: state.userAccess.get('userInfo').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListsActions: bindActionCreators(shoppingListsActions, dispatch),
    shoppingListDetailActions: bindActionCreators(shoppingListDetailActions, dispatch),
    gotoShoppingList: shoppingList =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingList',
          params: {
            shoppingListId: shoppingList.id,
            title: shoppingList.name,
          },
        }),
      ),
    gotoCreateShoppingList: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingListDetail',
          params: {
            title: 'Create shopping list',
          },
        }),
      ),
    gotoEditShoppingList: (shoppingListId, shoppingListName) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingListDetail',
          params: {
            shoppingListId,
            shoppingListName,
            title: shoppingListName,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListsContainer);
