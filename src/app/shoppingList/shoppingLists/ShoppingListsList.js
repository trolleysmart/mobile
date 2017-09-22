// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
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
          renderItem={info => <ShoppingListRow shoppingList={info.item} onShoppingListPressed={this.props.onShoppingListPressed} />}
          keyExtractor={item => item.id}
          onEndReached={this.props.onEndReached}
          onRefresh={this.props.onRefresh}
          refreshing={this.props.isFetchingTop}
          ItemSeparatorComponent={() => <ListItemSeparator />}
        />
        <ListItem
          title="Create list"
          titleStyle={Styles.createListFont}
          leftIcon={{ name: 'plus', type: 'material-community', color: 'blue' }}
          rightIcon={<View />}
          onPress={this.props.onCreateShoppingListPressed}
        />
      </View>
    );
  };
}

ShoppingListsList.propTypes = {
  shoppingLists: ShoppingListsProp,
  onShoppingListPressed: PropTypes.func.isRequired,
  onCreateShoppingListPressed: PropTypes.func.isRequired,
};

export default ShoppingListsList;
