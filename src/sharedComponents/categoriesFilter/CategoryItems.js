// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import { ListItemSeparator } from '../../components/list';
import Styles from './Styles';

const CategoryItems = ({ categories, selectedCategories, onCategoryItemSelectionChanged, isFetchingTop, onRefresh, onEndReached }) => (
  <View style={Styles.container}>
    <FlatList
      data={categories}
      renderItem={info => (
        <CategoryItem
          id={info.item.id}
          name={info.item.name}
          isSelected={selectedCategories.find(_ => _.id === info.item.id) != null}
          onCategoryItemSelectionChanged={onCategoryItemSelectionChanged}
        />
      )}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={isFetchingTop}
      ItemSeparatorComponent={() => <ListItemSeparator />}
    />
  </View>
);

CategoryItems.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedCategories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string,
    }),
  ).isRequired,
  onCategoryItemSelectionChanged: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default CategoryItems;
