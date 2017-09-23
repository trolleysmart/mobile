// @flow

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ListItem, Icon } from 'react-native-elements';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Styles from './Styles';
import { Color } from '../../../framework/style/DefaultStyles';
import { ShoppingListProp } from './PropTypes';

class ShoppingListRow extends React.PureComponent {
  renderMenu = () => {
    return (
      <Menu>
        <MenuTrigger>
          <Icon name="dots-vertical" type="material-community" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption>
            <View style={Styles.menuOption}>
              <Text>Edit</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  render = () => {
    return (
      <View>
        <ListItem
          key={this.props.shoppingList.id}
          title={this.props.shoppingList.name}
          onPress={() => this.props.onShoppingListPressed(this.props.shoppingList)}
          badge={{
            value: this.props.shoppingList.totalItemsCount,
            textStyle: { color: 'white' },
            containerStyle: { backgroundColor: Color.secondaryColorAction },
          }}
          leftIcon={{ name: 'list', type: 'font-awesome' }}
          rightIcon={this.renderMenu()}
        />
      </View>
    );
  };
}

ShoppingListRow.propTypes = {
  shoppingList: ShoppingListProp,
  onShoppingListPressed: PropTypes.func.isRequired,
};

export default ShoppingListRow;
