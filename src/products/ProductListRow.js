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
        onPress={() => this.props.onItemSelectionChanged(this.props.product, this.props.isInShoppingList)}
        style={this.props.isInShoppingList ? Styles.productListItemRowSelected : Styles.productListItemRow}
      >
        <View>
          <ProductListRowItem product={this.props.product} isInShoppingList={this.props.isInShoppingList} />
        </View>
      </TouchableHighlight>
    );
  }
}

ProductListRow.propTypes = {
  product: ProductProp,
  isInShoppingList: PropTypes.bool.isRequired,
  onItemSelectionChanged: PropTypes.func.isRequired,
};

export default ProductListRow;
