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
import * as ProductsActions from '../products/Actions';
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
    const shoppingList = Immutable.fromJS(nextProps.user.shoppingList.edges.map(_ => _.node));
    this.props.shoppingListActions.shoppingListChanged(
      Map({
        shoppingList: shoppingList,
      }),
    );

    // Remove existing staple item after added relevant products.
    if (
      nextProps.removeCurrentViewingStapleItem &&
      this.props.viewingStapleItem.has('shoppingListId') &&
      this.props.viewingStapleItem.get('shoppingListId') &&
      shoppingList.find(_ => _.get('id') === this.props.viewingStapleItem.get('shoppingListId'))
    ) {
      RemoveStapleShoppingListItemsFromUserShoppingList.commit(
        this.props.relay.environment,
        this.props.user.id,
        this.props.viewingStapleItem.get('shoppingListId'),
        this.props.viewingStapleItem.get('stapleShoppingListId'),
      );

      // Clear the current viewing staple item
      this.props.shoppingListActions.currentViewingStapleItemChanged(Map());
    }
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

  onViewProductsPressed = id => {
    const foundItem = this.props.user.shoppingList.edges.map(_ => _.node).find(item => item.id.localeCompare(id) === 0);

    this.props.productsActions.searchKeywordChanged(
      Map({
        searchKeyword: foundItem.name,
      }),
    );

    // Set the current viewing staple item
    this.props.shoppingListActions.currentViewingStapleItemChanged(
      Map({
        shoppingListId: id,
        stapleShoppingListId: foundItem.stapleShoppingListId,
      }),
    );

    // Set removeCurrentViewingStapleItem to false
    this.props.shoppingListActions.removeCurrentViewingStapleItemFlagChanged(
      Map({
        removeCurrentViewingStapleItem: false,
      }),
    );
    this.props.gotoProducts();
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
        onViewProductsPressed={this.onViewProductsPressed}
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
  removeCurrentViewingStapleItem: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    removeCurrentViewingStapleItem: state.shoppingList.get('removeCurrentViewingStapleItem'),
    viewingStapleItem: state.shoppingList.get('currentlyViewingStapleItem'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListActions: bindActionCreators(ShoppingListActions, dispatch),
    stapleShoppingListActions: bindActionCreators(StapleShoppingListActions, dispatch),
    productsActions: bindActionCreators(ProductsActions, dispatch),
    gotoAddStapleShoppingListItems: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'StapleShoppingList',
        }),
      ),
    gotoProducts: (shoppingListId, stapleShoppingListItemId) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Products',
          params: {
            shoppingListId,
            stapleShoppingListItemId,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItemsContainer);
