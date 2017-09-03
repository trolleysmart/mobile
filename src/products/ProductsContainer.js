// @flow

import Immutable, { List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AddItemsToShoppingList,
  RemoveSpecialItemsFromUserShoppingList,
  RemoveStapleShoppingListItemsFromUserShoppingList,
} from '../relay/mutations';
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
      const shoppingListItem = this.props.shoppingList.find(_ => _.specialId === productId);

      RemoveSpecialItemsFromUserShoppingList.commit(this.props.relay.environment, this.props.user.id, shoppingListItem.id, productId);
    } else {
      const shoppingListItem = this.props.user.specials.edges.map(_ => _.node).find(_ => _.id === productId);

      AddItemsToShoppingList.commit(this.props.relay.environment, this.props.user.id, {
        productPrices: List.of(Immutable.fromJS(shoppingListItem)),
      });

      // Remove existing staple item after added products.
      if (this.props.shoppingListId) {
        RemoveStapleShoppingListItemsFromUserShoppingList.commit(
          this.props.relay.environment,
          this.props.user.id,
          this.props.shoppingListId,
          this.props.stapleShoppingListItemId,
        );
      }
    }
  };

  onRefresh = () => {
    const { specials } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(specials.edges.length, error => {
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
        products={this.props.user.specials.edges.map(_ => _.node)}
        shoppingList={this.props.shoppingList}
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
  return {
    shoppingList: state.shoppingList.get('shoppingList').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // productsActions: bindActionCreators(specialsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
