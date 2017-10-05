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
import * as StapleItemsActions from '../../stapleItems/Actions';
import * as ProductsActions from '../../products/products/Actions';
import * as localStateActions from '../../../framework/localState/Actions';

type Props = {
  user: ShoppingListItemsRelayContainer_user,
};

type State = {};

class ShoppingListItemsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  componentWillMount = () => {
    if (!this.props.defaultShoppingListId) {
      this.props.localStateActions.setDefaultShoppingList(
        Map({ id: this.props.user.shoppingLists.edges[0].node.id, name: this.props.user.shoppingLists.edges[0].node.name }),
      );
    }

    this.props.shoppingListActions.shoppingListItemsCountChanged(Map({ numberOfItems: this.props.user.shoppingListItems.edges.length }));
  };

  componentWillReceiveProps = nextProps => {
    nextProps.shoppingListActions.shoppingListItemsCountChanged(Map({ numberOfItems: nextProps.user.shoppingListItems.edges.length }));
  };

  onShoppingListItemSelectionChanged = shoppingListItem => {
    RemoveItemsFromShoppingList.commit(this.props.relay.environment, this.props.user.id, this.props.shoppingListId, [shoppingListItem.id]);
  };

  onShoppingListAddItemClicked = () => {
    // Clear the selected staple list
    this.props.stapleItemsActions.stapleItemSelectionChanged(Map({ selectedStapleItems: List() }));
    this.props.gotoAddStapleItemsItems(this.props.defaultShoppingListId);
  };

  onViewProductsPressed = id => {
    const foundItem = this.props.user.shoppingListItems.edges.map(_ => _.node).find(item => item.id.localeCompare(id) === 0);

    this.props.gotoProducts(foundItem.name, foundItem.tags ? foundItem.tags.map(_ => _.key) : '');
  };

  onViewProductDetailPressed = (productId, productName) => {
    this.props.gotoProductDetail(productId, productName);
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
        onViewProductDetailPressed={this.onViewProductDetailPressed}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}
ShoppingListItemsContainer.propTypes = {
  gotoAddStapleItemsItems: PropTypes.func.isRequired,
  shoppingListActions: PropTypes.object.isRequired,
  stapleItemsActions: PropTypes.object.isRequired,
  productsActions: PropTypes.object.isRequired,
  localStateActions: PropTypes.object.isRequired,
  defaultShoppingListId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    defaultShoppingListId: state.localState.getIn(['defaultShoppingList', 'id']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListActions: bindActionCreators(ShoppingListActions, dispatch),
    stapleItemsActions: bindActionCreators(StapleItemsActions, dispatch),
    productsActions: bindActionCreators(ProductsActions, dispatch),
    localStateActions: bindActionCreators(localStateActions, dispatch),
    gotoAddStapleItemsItems: shoppingListId =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'StapleItems',
          params: {
            shoppingListId,
          },
        }),
      ),
    gotoProducts: (defaultSearchKeyword, defaultCategories) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Products',
          params: {
            defaultSearchKeyword,
            defaultCategories,
          },
        }),
      ),
    gotoProductDetail: (productId, productName) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ProductDetail',
          params: {
            title: productName,
            productId,
            isInShoppingList: true,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItemsContainer);
