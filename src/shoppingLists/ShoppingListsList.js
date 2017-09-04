// @flow

import React, {
  Component,
} from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  ListItemSeparator,
} from '../components/list';
import ShoppingListRow from './ShoppingListRow';
import Styles from './Styles';

class ShoppingListsList extends Component {
  render = () => {
    return <View style={Styles.container}>
      <FlatList
        data={this.props.shoppingLists}
        renderItem={info =>
          <ShoppingListRow
            id={info.item.id}
            name={info.item.name}
            owner={info.item.owner}
            onShoppingListPressed={this.props.onShoppingListPressed}
          />}
        keyExtractor={item => item.id}
        onEndReached={this.props.onEndReached}
        onRefresh={this.props.onRefresh}
        refreshing={this.props.isFetchingTop}
        ItemSeparatorComponent={() => <ListItemSeparator />}
      />
    </View>;
  }
}

ShoppingListsList.propTypes = {
  shoppingLists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        owner: PropTypes.string,
      })
    )
    .isRequired,
  onShoppingListPressed: PropTypes.func.isRequired,
}

export default ShoppingListsList;
