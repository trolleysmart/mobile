// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import Store from './Store';
import { ListItemSeparator } from '../components/list';
import Styles from './Styles';

const Stores = ({ stores, selectedStores, onStoreSelectionChanged, isFetchingTop, onRefresh, onEndReached }) =>
  <View style={Styles.container}>
    <FlatList
      data={stores}
      renderItem={info =>
        <Store
          id={info.item.id}
          name={info.item.name}
          isSelected={selectedStores.find(_ => _.id === info.item.id) != null}
          onStoreSelectionChanged={onStoreSelectionChanged}
        />}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={isFetchingTop}
      ItemSeparatorComponent={() => <ListItemSeparator />}
    />
  </View>;

Stores.propTypes = {
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedStores: PropTypes.arrayOf(
    PropTypes.shape({
      storeId: PropTypes.string,
    }),
  ).isRequired,
  onStoreSelectionChanged: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default Stores;
