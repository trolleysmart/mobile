// @flow

import React, { Component } from 'react';
import { SectionList, Text, View, Image } from 'react-native';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import ShoppingListItem from './ShoppingListItem';
import { ListItemSeparator } from '../components/list';
import { ImageUltility } from '../components/image';
import Styles from './Styles';

class ShoppingListItems extends Component {
  renderItem = ({ item }) => {
    return (
      <ShoppingListItem
        id={item.id}
        name={item.name}
        imageUrl={item.imageUrl}
        priceToDisplay={item.priceToDisplay}
        storeImageUrl={item.storeImageUrl}
        storeName={item.storeName}
        comments={item.comments}
        unitPrice={item.unitPrice}
        offerEndDate={item.offerEndDate}
        size={item.size}
        multiBuy={item.multiBuy}
        savingPercentage={item.savingPercentage}
        saving={item.saving}
        onShoppingListItemSelectionChanged={this.props.onShoppingListItemSelectionChanged}
        onViewProductsPressed={this.props.onViewProductsPressed}
      />
    );
  };

  renderSectionHeader = ({ section }) => {
    return (
      <View style={Styles.sectionHeader}>
        <Text style={Styles.sectionTitle}>
          {section.title}
        </Text>
        <Image source={ImageUltility.getImageSource(section.title)} style={Styles.sectionHeaderImage} />
      </View>
    );
  };

  render = () => {
    let sectionData = Immutable.fromJS(this.props.shoppingList)
      .groupBy(item => (item.has('tags') && item.get('tags') ? item.get('tags').first().get('name') : 'Unknown'))
      .mapEntries(([key, value]) => [
        key,
        {
          data: value.toJS(),
          title: key,
        },
      ])
      .sortBy(_ => _.title)
      .valueSeq()
      .toJS();
    return (
      <View style={Styles.container}>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={sectionData}
          keyExtractor={item => item.id}
          onEndReached={this.props.onEndReached}
          onRefresh={this.props.onRefresh}
          refreshing={this.props.isFetchingTop}
          ItemSeparatorComponent={() => <ListItemSeparator />}
        />
        <ActionButton buttonColor="rgba(242,135,79,1)" onPress={() => this.props.onShoppingListAddItemClicked()} />
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
  onViewProductsPressed: PropTypes.func.isRequired,
  onShoppingListAddItemClicked: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default ShoppingListItems;
