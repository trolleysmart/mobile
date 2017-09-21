// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { ProductsProp } from './PropTypes';
import ProductListRow from './ProductListRow';
import { ListItemSeparator } from '../../../components/list';
import Styles from './Styles';

const ProductList = ({ products, onItemSelectionChanged, isFetchingTop, onRefresh, onEndReached }) => (
  <View style={Styles.container}>
    <FlatList
      data={products}
      renderItem={info => <ProductListRow product={info.item} onItemSelectionChanged={onItemSelectionChanged} />}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={isFetchingTop}
      ItemSeparatorComponent={() => <ListItemSeparator />}
    />
  </View>
);

ProductList.propTypes = {
  products: ProductsProp.isRequired,
  onItemSelectionChanged: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default ProductList;
