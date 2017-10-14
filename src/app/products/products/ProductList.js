// @flow

import React from 'react';
import { FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ProductsProp } from './PropTypes';
import ProductListRow from './ProductListRow';
import { ListItemSeparator } from '../../../components/list';
import Styles from './Styles';

const ProductList = ({ products, onItemSelectionChanged, onViewProductDetailPressed, isFetchingTop, onRefresh, onEndReached }) => (
  <View style={Styles.container}>
    {
      products.length > 0 ?
        <FlatList
          data={products}
          renderItem={info => (
            <ProductListRow product={info.item} onItemSelectionChanged={onItemSelectionChanged} onViewProductDetailPressed={onViewProductDetailPressed} />
          )}
          keyExtractor={item => item.id}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={isFetchingTop}
          ItemSeparatorComponent={() => <ListItemSeparator />}
        />
      :
        <View style={Styles.noMatchingProductContainer}>
          <Text style={Styles.noMatchingProductText}>No matching products found</Text>
        </View>
    }

  </View>
);

ProductList.propTypes = {
  products: ProductsProp,
  onItemSelectionChanged: PropTypes.func.isRequired,
  onViewProductDetailPressed: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default ProductList;
