// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import SpecialItemRow from './SpecialItemRow';
import SpecialItemSeparator from './SpecialItemSeparator';
import Styles from './Styles';

const SpecialItems = ({
  specials,
  shoppingList,
  onSpecialItemSelectionChanged,
  isFetchingTop,
  onRefresh,
  onEndReached,
}) =>
  <View style={Styles.container}>
    <FlatList
      data={specials}
      renderItem={info =>
        <SpecialItemRow
          id={info.item.id}
          name={info.item.name}
          imageUrl={info.item.imageUrl}
          priceToDisplay={info.item.priceToDisplay}
          storeImageUrl={info.item.storeImageUrl}
          storeName={info.item.storeName}
          comments={info.item.comments}
          unitPrice={info.item.unitPrice}
          offerEndDate={info.item.offerEndDate}
          size={info.item.size}
          multiBuy={info.item.multiBuy}
          savingPercentage={info.item.savingPercentage}
          saving={info.item.saving}
          isInShoppingList={
            shoppingList.find(_ => _.specialId === info.item.id) != null
          }
          onSpecialItemSelectionChanged={onSpecialItemSelectionChanged}
        />}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={isFetchingTop}
      ItemSeparatorComponent={() => <SpecialItemSeparator />}
    />
  </View>;

SpecialItems.propTypes = {
  specials: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
  shoppingList: PropTypes.arrayOf(
    PropTypes.shape({
      stapleShoppingListId: PropTypes.string,
      specialId: PropTypes.string,
    }),
  ).isRequired,
  onSpecialItemSelectionChanged: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default SpecialItems;
