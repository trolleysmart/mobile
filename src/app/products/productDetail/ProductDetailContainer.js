// @flow

import Immutable from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import ProductDetailView from './ProductDetailView';
import * as productsActions from '../products/Actions';
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
    if (this.props.user.product.id === productId) {
      AddItemsToShoppingList.commit(this.props.relay.environment, this.props.user.id, this.props.defaultShoppingListId, {
        productPrices: [Immutable.fromJS(this.props.user.product)],
      });
    }

    this.props.goBack();
    this.props.productsActions.productSelected(productId);
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
  defaultShoppingListId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    defaultShoppingListId: state.localState.getIn(['defaultShoppingList', 'id']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productsActions: bindActionCreators(productsActions, dispatch),
    goBack: () => dispatch(NavigationActions.back()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
