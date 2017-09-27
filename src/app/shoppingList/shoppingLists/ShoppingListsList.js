// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import { ListItemSeparator } from '../../../components/list';
import ShoppingListRow from './ShoppingListRow';
import Styles from './Styles';
import { ShoppingListsProp } from './PropTypes';

class ShoppingListsList extends Component {
  render = () => {
    return (
      <View style={Styles.container}>
        <FlatList
          data={this.props.shoppingLists}
          renderItem={info => (
            <ShoppingListRow
              shoppingList={info.item}
              onShoppingListPressed={this.props.onShoppingListPressed}
              onEditShoppingListPressed={this.props.onEditShoppingListPressed}
              onDeleteShoppingListPressed={this.props.onDeleteShoppingListPressed}
            />
          )}
          keyExtractor={item => item.id}
          onEndReached={this.props.onEndReached}
          onRefresh={this.props.onRefresh}
          refreshing={this.props.isFetchingTop}
          ItemSeparatorComponent={() => <ListItemSeparator />}
        />
        <ActionButton buttonColor="rgba(242,135,79,1)" onPress={() => this.props.onCreateShoppingListPressed()} />
      </View>
    );
  };
}

ShoppingListsList.propTypes = {
  shoppingLists: ShoppingListsProp,
  onShoppingListPressed: PropTypes.func.isRequired,
  onCreateShoppingListPressed: PropTypes.func.isRequired,
  onEditShoppingListPressed: PropTypes.func.isRequired,
  onDeleteShoppingListPressed: PropTypes.func.isRequired,
};

export default ShoppingListsList;
