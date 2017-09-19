// @flow

import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { ProductProp } from './PropTypes';
import Styles from './Styles';
import ProductListRowItem from './ProductListRowItem';

class ProductListRow extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        onPress={() => this.props.onItemSelectionChanged(this.props.product)}
        style={this.props.isInShoppingList ? Styles.productListItemRowSelected : Styles.productListItemRow}
      >
        <View>
          <ProductListRowItem product={this.props.product} />
        </View>
      </TouchableHighlight>
    );
  }
}

ProductListRow.propTypes = {
  product: ProductProp,
  onItemSelectionChanged: PropTypes.func.isRequired,
};

export default ProductListRow;
