// @flow

// import Immutable from 'immutable';
import React, {
  Component,
} from 'react';
// import { View } from 'react-native';
import {
  connect,
} from 'react-redux';
import { Linking } from 'react-native';
// import { bindActionCreators } from 'redux';
import ProductDetail from './ProductDetail';
import { ProductProp } from './PropTypes';

class ProductDetailContainer extends Component {
  handleClickHyperLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  handleVisitStorePressed = (url) => {
    this.handleClickHyperLink(url);
  };

  render = () => {
    return <ProductDetail product={this.props.product} handleVisitStorePressed={this.handleVisitStorePressed}/>;
  };
}

ProductDetailContainer.propTypes = {
  product: ProductProp,
};

function mapStateToProps(state, props) {
  return {
    product: props.navigation.state.params.product,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
