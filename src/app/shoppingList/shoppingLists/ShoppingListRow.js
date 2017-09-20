// @flow

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ListItem, Icon } from 'react-native-elements';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Styles from './Styles';
import { Color } from '../../../framework/style/DefaultStyles';

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
              {/* <Icon name='sort-amount-asc' type='font-awesome' size={20} /> */}
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
          key={this.props.id}
          title={this.props.name}
          onPress={() => this.props.onShoppingListPressed(this.props.id)}
          badge={{
            value: 3,
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onShoppingListPressed: PropTypes.func.isRequired,
};

export default ShoppingListRow;
