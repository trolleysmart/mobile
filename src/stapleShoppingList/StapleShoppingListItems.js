// @flow

import React, {
  Component,
} from 'react';
import {
  FlatList,
  ListItem,
  SectionList,
  Text,
  View,
  Image,
} from 'react-native';
import Immutable, {
  Map,
} from 'immutable';
import PropTypes from 'prop-types';
import StapleShoppingListItem from './StapleShoppingListItem';
import StapleShoppingListSeparator from './StapleShoppingListSeparator';
import {
  ImageUltility,
} from '../components/image';
import Styles from './Styles';

class StapleShoppingListItems extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     sectionData: [{
  //       data: [{
  //           id: 1,
  //           name: 'apple',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 2,
  //           name: 'beef',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 3,
  //           name: 'broccoli',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 4,
  //           name: 'carrot',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 5,
  //           name: 'chips',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 6,
  //           name: 'dishwash',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 7,
  //           name: 'egg',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 8,
  //           name: 'ham',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 9,
  //           name: 'milk',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 10,
  //           name: 'mushroom',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 11,
  //           name: 'onion',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 12,
  //           name: 'orange',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 13,
  //           name: 'soap',
  //           isCustomItem: false,
  //         },
  //         {
  //           id: 14,
  //           name: 'toast',
  //           isCustomItem: false,
  //         },
  //       ],
  //       title: 'Recent',
  //     }],
  //   }
  // }

  onStapleShoppingListItemSelectionChanged = (id, name, isCustomItem, isSelected) => {
    this.props.onStapleShoppingListItemSelectionChanged(id, name, isCustomItem, isSelected);
  };

  renderRow = ({
    item,
  }) => {
    return (
      <StapleShoppingListItem
        id={item.id}
        name={item.name}
        onStapleShoppingListItemSelectionChanged={this.onStapleShoppingListItemSelectionChanged}
        isCustomItem={item.isCustomItem}
        isSelected={this.props.selectedStapleShoppingListItems.find(_ => _.id === item.id) != null}
      />
    );
  };

  renderSectionHeader = ({
    section,
  }) => {
    return (
      <View style={Styles.sectionHeader}>
        <Text style={Styles.sectionTitle}>
            {section.title}
        </Text>
        <Image source={ImageUltility.getImageSource(section.title)} style={Styles.image} />
      </View>

    );
  };

  render = () => {
    let sectionData = Immutable.fromJS(this.props.stapleShoppingList)
      .groupBy(item =>
        item.get('tags')
        .first()
        .get('name'))
      .mapEntries(([key, value]) => [
        key,
        {
          data: value.toJS(),
          title: key,
        },
      ])
      .valueSeq()
      .toJS();

    return (
      <View style={Styles.container}>
        <View style={Styles.containerHeader}>
          <Text style={Styles.itemsCount}>{this.props.selectedStapleShoppingListItems.count}items selected</Text>
          <Text style={Styles.select}>Select All</Text>
        </View>
        <SectionList
          contentContainerStyle={Styles.sectionListContainer}
          renderItem={this.renderRow}
          // horizontal={false}
          // numColumns={7}
          renderSectionHeader={this.renderSectionHeader}
          sections={sectionData}
          keyExtractor={item => item.id}
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
    )
    .isRequired,
  selectedStapleShoppingListItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isCustomItem: PropTypes.bool,
      }),
    )
    .isRequired,
  onStapleShoppingListItemAdded: PropTypes.func.isRequired,
  onStapleShoppingListItemSelectionChanged: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default StapleShoppingListItems;
