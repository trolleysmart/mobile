// @flow

import React, { Component } from 'react';
import { FlatList, SectionList, Text, View, Image } from 'react-native';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import StapleShoppingListItem from './StapleShoppingListItem';
import { ImageUltility } from '../components/image';
import Styles from './Styles';

class StapleShoppingListItems extends Component {
  onStapleShoppingListItemSelectionChanged = (id, name, isCustomItem, isSelected) => {
    this.props.onStapleShoppingListItemSelectionChanged(id, name, isCustomItem, isSelected);
  };

  renderItem = ({ item }) => {
    return (
      // <Text>{item.name}</Text>
      <StapleShoppingListItem
        id={item.id}
        name={item.name}
        onStapleShoppingListItemSelectionChanged={this.onStapleShoppingListItemSelectionChanged}
        isCustomItem={item.isCustomItem}
        isSelected={this.props.selectedStapleShoppingListItems.find(_ => _.id === item.id) != null}
      />
    );
  };

  renderList = ({ item }) =>
    <View>
      <FlatList numColumns={5} data={item.data} renderItem={this.renderItem} keyExtractor={item => item.id} />
    </View>;

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
    let sectionData = Immutable.fromJS(this.props.stapleShoppingList)
      .groupBy(item => (item.has('tags') && item.get('tags') ? item.get('tags').first().get('name') : 'Unknown'))
      .mapEntries(([key, value]) => [
        key,
        {
          data: [
            {
              data: value.toJS(),
              key: uuid(),
            },
          ],
          title: key,
        },
      ])
      .valueSeq()
      .toJS();

    return (
      <View style={Styles.container}>
        <View style={Styles.containerHeader}>
          <Text style={Styles.itemsCount}>
            {this.props.selectedStapleShoppingListItems.length} items selected
          </Text>
        </View>
        <SectionList
          contentContainerStyle={Styles.sectionListContainer}
          renderItem={this.renderList}
          renderSectionHeader={this.renderSectionHeader}
          sections={sectionData}
          keyExtractor={item => {
            //console.log(item);
            return item.key;
          }}
          onEndReached={this.props.onEndReached}
          onRefresh={this.props.onRefresh}
          refreshing={this.props.isFetchingTop}
        />
      </View>
    );
  };
}

StapleShoppingListItems.propTypes = {
  stapleShoppingList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isCustomItem: PropTypes.bool,
    }),
  ).isRequired,
  selectedStapleShoppingListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isCustomItem: PropTypes.bool,
    }),
  ).isRequired,
  onStapleShoppingListItemAdded: PropTypes.func.isRequired,
  onStapleShoppingListItemSelectionChanged: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default StapleShoppingListItems;
