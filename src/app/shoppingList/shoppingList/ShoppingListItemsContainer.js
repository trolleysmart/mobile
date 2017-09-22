// @flow

import Immutable, { List, Map } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShoppingListItems from './ShoppingListItems';
import { RemoveItemsFromShoppingList } from '../../../framework/relay/mutations';
import * as ShoppingListActions from './Actions';
import * as StapleShoppingListActions from '../../stapleShoppingList/Actions';
import * as ProductsActions from '../../products/products/Actions';
import { type ShoppingListItemsRelayContainer_user } from './__generated__/ShoppingListItemsRelayContainer_user.graphql';

type Props = {
  user: ShoppingListItemsRelayContainer_user,
};

type State = {};

class ShoppingListItemsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  componentWillReceiveProps = nextProps => {
    const shoppingListItems = Immutable.fromJS(nextProps.user.shoppingListItems.edges.map(_ => _.node));

    // Remove existing staple item after added relevant products.
    if (
      nextProps.removeCurrentViewingStapleItem &&
      this.props.viewingStapleItem.has('shoppingListId') &&
      this.props.viewingStapleItem.get('shoppingListId') &&
      shoppingListItems.find(_ => _.get('id') === this.props.viewingStapleItem.get('shoppingListId'))
    ) {
      RemoveItemsFromShoppingList.commit(this.props.relay.environment, this.props.user.id, this.props.shoppingListId, [
        this.props.viewingStapleItem.get('shoppingListId'),
      ]);

      // Clear the current viewing staple item
      this.props.shoppingListActions.currentViewingStapleItemChanged(Map());
    }
  };

  onShoppingListItemSelectionChanged = shoppingListItem => {
    RemoveItemsFromShoppingList.commit(this.props.relay.environment, this.props.user.id, this.props.shoppingListId, [shoppingListItem.id]);
  };

  onShoppingListAddItemClicked = () => {
    // Clear the selected staple list
    this.props.stapleShoppingListActions.stapleShoppingListItemSelectionChanged(
      Map({
        selectedStapleShoppingListItems: List(),
      }),
    );
    this.props.gotoAddStapleShoppingListItems(this.props.shoppingListId);
  };

  onViewProductsPressed = id => {
    const foundItem = this.props.user.shoppingListItems.edges.map(_ => _.node).find(item => item.id.localeCompare(id) === 0);

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
    this.props.gotoProducts(foundItem.name);
  };

  onRefresh = () => {
    const { shoppingListItems } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(shoppingListItems.edges.length, error => {
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
        shoppingListItems={this.props.user.shoppingListItems.edges.map(_ => _.node)}
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
    gotoAddStapleShoppingListItems: shoppingListId =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'StapleShoppingList',
          params: {
            shoppingListId,
          },
        }),
      ),
    gotoProducts: defaultSearchKeyword =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Products',
          params: {
            defaultSearchKeyword,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItemsContainer);
