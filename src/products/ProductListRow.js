// @flow

import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import ProductListRowItem from './ProductListRowItem';

class ProductListRow extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        onPress={() => this.props.onItemSelectionChanged(this.props.id, this.props.isInShoppingList)}
        style={this.props.isInShoppingList ? Styles.productListItemRowSelected : Styles.productListItemRow}
      >
        <View>
          <ProductListRowItem
            id={this.props.id}
            name={this.props.name}
            imageUrl={this.props.imageUrl}
            priceToDisplay={this.props.priceToDisplay}
            storeImageUrl={this.props.storeImageUrl}
            storeName={this.props.storeName}
            comments={this.props.comments}
            unitPrice={this.props.unitPrice}
            offerEndDate={this.props.offerEndDate}
            size={this.props.size}
            multiBuy={this.props.multiBuy}
            savingPercentage={this.props.savingPercentage}
            saving={this.props.saving}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

ProductListRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  priceToDisplay: PropTypes.number,
  savingPercentage: PropTypes.number,
  saving: PropTypes.number,
  storeImageUrl: PropTypes.string,
  storeName: PropTypes.string,
  comments: PropTypes.string,
  unitPrice: PropTypes.shape({
    price: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
  }),
  multiBuy: PropTypes.shape({
    awardQuantity: PropTypes.number.isRequired,
    awardValue: PropTypes.number.isRequired,
  }),
  offerEndDate: PropTypes.string,
  size: PropTypes.string,
  isInShoppingList: PropTypes.bool.isRequired,
  onItemSelectionChanged: PropTypes.func.isRequired,
};

export default ProductListRow;
