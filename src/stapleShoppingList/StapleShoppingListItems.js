// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import PropTypes from 'prop-types';
import StapleShoppingListItem from './StapleShoppingListItem';
import StapleShoppingListSeparator from './StapleShoppingListSeparator';
import Styles from './Styles';

class StapleShoppingListItems extends Component {
  onStapleShoppingListItemAdded = (id, name, isCustomItem) => {
    this.props.onStapleShoppingListItemAdded(id, name, isCustomItem);

    return this.refs.toast;
  };

  render = () => {
    return (
      <View style={Styles.container}>
        <Toast
          ref="toast"
          opacity={0.9}
          fadeOutDuration={1000}
          position="top"
        />
        <FlatList
          data={this.props.stapleShoppingList}
          renderItem={info =>
            <StapleShoppingListItem
              id={info.item.id}
              name={info.item.name}
              onStapleShoppingListItemAdded={this.onStapleShoppingListItemAdded}
              isCustomItem={info.item.isCustomItem}
            />}
          keyExtractor={item => item.id}
          onEndReached={this.props.onEndReached}
          onRefresh={this.props.onRefresh}
          refreshing={this.props.isFetchingTop}
          ItemSeparatorComponent={() => <StapleShoppingListSeparator />}
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
  onStapleShoppingListItemAdded: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default StapleShoppingListItems;
