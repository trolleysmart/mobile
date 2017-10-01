// @flow

// import Immutable from 'immutable';
import React, { Component } from 'react';
// import { View } from 'react-native';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
// import { bindActionCreators } from 'redux';
import ProductDetailView from './ProductDetailView';
import { ProductProp } from './PropTypes';

class ProductDetailContainer extends Component<any, Props, State> {
  handleClickHyperLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  handleVisitStorePressed = url => {
    this.handleClickHyperLink(url);
  };

  render = () => {
    return <ProductDetailView product={this.props.user.product} handleVisitStorePressed={this.handleVisitStorePressed} />;
  };
}

ProductDetailContainer.propTypes = {
  // product: ProductProp,
};

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
