// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import ShoppingListItem from './ShoppingListItem';
import SpecialItemSeparator from '../specials/SpecialItemSeparator';
import Styles from './Styles';

class ShoppingListItems extends Component {
  onRefresh = () => {
    return;
  };

  onEndReached = () => {
    return;
  };

  render = () => {
    return (
      <View style={Styles.container}>
        <FlatList
          data={this.props.shoppingList}
          renderItem={info =>
            <ShoppingListItem
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
              onShoppingListItemSelectionChanged={
                this.props.onShoppingListItemSelectionChanged
              }
            />}
          keyExtractor={item => item.id}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={false}
          ItemSeparatorComponent={() => <SpecialItemSeparator />}
        />
        <ActionButton
          buttonColor="rgba(242,135,79,1)"
          onPress={() => this.props.onShoppingListAddItemClicked()}
        />
      </View>
    );
  };
}

ShoppingListItems.propTypes = {
  shoppingList: PropTypes.arrayOf(
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
  onShoppingListItemSelectionChanged: PropTypes.func.isRequired,
  onShoppingListAddItemClicked: PropTypes.func.isRequired,
};

export default ShoppingListItems;
