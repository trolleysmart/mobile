// @flow

import React, { Component } from 'react';
import { SectionList, Text, View, Image } from 'react-native';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { ShoppingListItemsProp } from './PropTypes';
import ActionButton from 'react-native-action-button';
import ShoppingListItem from './ShoppingListItem';
import { ListItemSeparator } from '../../../components/list';
import { ImageUltility } from '../../../components/image';
import Styles from './Styles';

class ShoppingListItems extends Component {
  renderItem = ({ item }) => {
    return (
      <ShoppingListItem
        shoppingListItem={item}
        onShoppingListItemSelectionChanged={this.props.onShoppingListItemSelectionChanged}
        onViewProductsPressed={this.props.onViewProductsPressed}
        onViewProductDetailPressed={this.props.onViewProductDetailPressed}
      />
    );
  };

  renderSectionHeader = ({ section }) => {
    return (
      <View style={Styles.sectionHeader}>
        <Text style={Styles.sectionTitle}>{section.categoryTitle}</Text>
        <Image source={ImageUltility.getImageSource(section.categoryKey.replace(/-/g, ''))} style={Styles.sectionHeaderImage} />
      </View>
    );
  };

  render = () => {
    let sectionData = Immutable.fromJS(this.props.shoppingListItems)
      .groupBy(
        item =>
          item.has('tags') && item.get('tags') && !item.get('tags').isEmpty()
            ? item
                .get('tags')
                .first()
                .get('name')
            : 'Other',
      )
      .mapEntries(([key, value]) => [
        key,
        {
          data: value.toJS(),
          categoryTitle: key,
          categoryKey:
            value.first().has('tags') &&
            value.first().get('tags') &&
            !value
              .first()
              .get('tags')
              .isEmpty()
              ? value
                  .first()
                  .get('tags')
                  .first()
                  .get('key')
              : key,
        },
      ])
      .sortBy(_ => _.categoryKey)
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
  shoppingListItems: ShoppingListItemsProp,
  onShoppingListItemSelectionChanged: PropTypes.func.isRequired,
  onViewProductsPressed: PropTypes.func.isRequired,
  onViewProductDetailPressed: PropTypes.func.isRequired,
  onShoppingListAddItemClicked: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default ShoppingListItems;
