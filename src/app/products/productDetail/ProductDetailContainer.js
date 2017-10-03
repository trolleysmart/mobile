// @flow

import Immutable from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ProductDetailView from './ProductDetailView';
import { AddItemsToShoppingList } from '../../../framework/relay/mutations';

class ProductDetailContainer extends Component<any, Props, State> {
  handleClickHyperLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  onAddProductPressed = productId => {
    // TODO: Refactor once multiple shopping list home done
    if (this.props.user.product.id === productId){
      AddItemsToShoppingList.commit(this.props.relay.environment, this.props.user.id, this.props.user.shoppingLists.edges[0].node.id, {
        productPrices: [Immutable.fromJS(this.props.user.product)],
      });
    }

    this.props.goBack();
    // this.props.productsActions.productSelected(productId);
  };

  handleVisitStorePressed = url => {
    this.handleClickHyperLink(url);
  };

  render = () => {
    return (
      <ProductDetailView
        product={this.props.user.product}
        handleVisitStorePressed={this.handleVisitStorePressed}
        onAddProductPressed={this.onAddProductPressed}
      />
    );
  };
}

ProductDetailContainer.propTypes = {
  // product: ProductProp,
};

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => dispatch(NavigationActions.back()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
