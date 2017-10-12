// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import ProductsFilterSorting from './ProductsFilterSorting';
import Styles from './Styles';
import { Color } from '../../framework/style/DefaultStyles';

const ProductsFilter = ({ sortOption, onSortOptionChanged, gotoCategoryFilter, categories, gotoStoreFilter, stores }) => (
  <View style={Styles.container}>
    <View style={Styles.filterOptionContainer}>
      <Text style={Styles.filterTitle}>Sort order</Text>
      <ProductsFilterSorting sortOption={sortOption} onSortOptionChanged={onSortOptionChanged} />
    </View>
    <View style={Styles.filterOptionContainer}>
      <Text style={Styles.filterTitle}>Filter</Text>
      <List>
        <ListItem
          key={1}
          title="Categories"
          onPress={gotoCategoryFilter}
          leftIcon={{ name: 'list', type: 'material-icons' }}
          subtitle={<Text numberOfLines={1}>{categories.map(_ => _.name).toString()}</Text>}
          badge={{
            value: categories.length,
            textStyle: { color: 'white' },
            containerStyle: { backgroundColor: Color.secondaryColorAction },
          }}
        />
        <ListItem
          key={2}
          title="Stores"
          onPress={gotoStoreFilter}
          leftIcon={{ name: 'store', type: 'material-icons' }}
          subtitle={<Text numberOfLines={1}>{stores.map(_ => _.name).toString()}</Text>}
          badge={{
            value: stores.length,
            textStyle: { color: 'white' },
            containerStyle: { backgroundColor: Color.secondaryColorAction },
          }}
        />
      </List>
    </View>
  </View>
);

ProductsFilter.propTypes = {
  gotoCategoryFilter: PropTypes.func.isRequired,
  gotoStoreFilter: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string,
    }),
  ).isRequired,
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      storeId: PropTypes.string,
    }),
  ).isRequired,
  onSortOptionChanged: PropTypes.func.isRequired,
};

export default ProductsFilter;
