// @flow

import Immutable, { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShoppingListItems from './ShoppingListItems';
import { RemoveStapleShoppingListItemsFromUserShoppingList, RemoveSpecialItemsFromUserShoppingList } from '../relay/mutations';
import * as ShoppingListActions from './Actions';
import * as StapleShoppingListActions from '../stapleShoppingList/Actions';
import { type ShoppingListItemsRelayContainer_user } from './__generated__/ShoppingListItemsRelayContainer_user.graphql';

type Props = {
  user: ShoppingListItemsRelayContainer_user,
};

type State = {};

class ShoppingListItemsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  constructor(props, context) {
    super(props, context);

    this.props.shoppingListActions.shoppingListChanged(
      Map({
        shoppingList: Immutable.fromJS(this.props.user.shoppingList.edges.map(_ => _.node)),
      }),
    );
  }

  componentWillReceiveProps = nextProps => {
    this.props.shoppingListActions.shoppingListChanged(
      Map({
        shoppingList: Immutable.fromJS(nextProps.user.shoppingList.edges.map(_ => _.node)),
      }),
    );
  };

  onShoppingListItemSelectionChanged = id => {
    const foundItem = this.props.user.shoppingList.edges.map(_ => _.node).find(item => item.id.localeCompare(id) === 0);

    if (foundItem.stapleShoppingListId) {
      RemoveStapleShoppingListItemsFromUserShoppingList.commit(this.props.relay.environment, this.props.user.id, id, foundItem.stapleShoppingListId);
    } else {
      RemoveSpecialItemsFromUserShoppingList.commit(this.props.relay.environment, this.props.user.id, id, foundItem.specialId);
    }
  };

  onShoppingListAddItemClicked = () => {
    // Clear the selected staple list
    this.props.stapleShoppingListActions.stapleShoppingListItemSelectionChanged(
      Map({
        selectedStapleShoppingListItems: List(),
      }),
    );
    this.props.gotoAddStapleShoppingListItems();
  };

  onRefresh = () => {
    const { shoppingList } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(shoppingList.edges.length, error => {
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
      <ShoppingListItems
        shoppingList={this.props.user.shoppingList.edges.map(_ => _.node)}
        onShoppingListItemSelectionChanged={this.onShoppingListItemSelectionChanged}
        onShoppingListAddItemClicked={this.onShoppingListAddItemClicked}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}
ShoppingListItemsContainer.propTypes = {
  gotoAddStapleShoppingListItems: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListActions: bindActionCreators(ShoppingListActions, dispatch),
    stapleShoppingListActions: bindActionCreators(StapleShoppingListActions, dispatch),
    gotoAddStapleShoppingListItems: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'StapleShoppingList',
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItemsContainer);
