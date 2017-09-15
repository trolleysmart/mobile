// @flow

import Immutable, { List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productsActions from './Actions';
import { AddItemsToShoppingList, RemoveItemsFromShoppingList } from '../relay/mutations';
import ProductList from './ProductList';
import { type ProductsRelayContainer_user } from './__generated__/ProductsRelayContainer_user.graphql';

type Props = {
  user: ProductsRelayContainer_user,
};

type State = {
  isFetchingTop: boolean,
};

class ProductsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  onProductItemSelectionChanged = (productId, isInShoppingList) => {
    if (isInShoppingList) {
      const shoppingListItem = this.props.user.shoppingListItems.edges.map(_ => _.node).find(_ => _.productPriceId === productId);

      RemoveItemsFromShoppingList.commit(this.props.relay.environment, this.props.user.id, List.of(shoppingListItem.id));
      this.props.productsActions.productDeselected(productId);
    } else {
      const shoppingListItem = this.props.user.products.edges.map(_ => _.node).find(_ => _.id === productId);

      AddItemsToShoppingList.commit(this.props.relay.environment, this.props.user.id, {
        productPrices: List.of(Immutable.fromJS(shoppingListItem)),
      });
      this.props.productsActions.productSelected(productId);
    }
  };

  onRefresh = () => {
    const { products } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(products.edges.length, error => {
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
      <ProductList
        products={this.props.user.products.edges.map(_ => _.node)}
        shoppingListItems={this.props.user.shoppingListItems.edges.map(_ => _.node)}
        onItemSelectionChanged={this.onProductItemSelectionChanged}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

ProductsContainer.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    productsActions: bindActionCreators(productsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
