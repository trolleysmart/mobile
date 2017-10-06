// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { TouchableIcon } from '../../../components/touchableIcon';
import Styles from './Styles';

class ShoppingListHeaderContainer extends Component {
  onViewShoppingListsPressed = () => {
    this.props.gotoShoppingLists();
  };

  render = () => {
    return (
      <View style={Styles.headerContainer}>
        <TouchableIcon
          iconContainerStyle={Styles.headerIconContainerStyle}
          iconName="view-list"
          iconType="material-community"
          onPress={this.onViewShoppingListsPressed}
        />
        <Menu>
          <MenuTrigger>
            <Icon name="dots-vertical" type="material-community" />
            {/* <TouchableIcon iconContainerStyle={Styles.headerIconContainerStyle} iconName="dots-vertical" iconType="material-community"/> */}
          </MenuTrigger>
          <MenuOptions>
            <MenuOption>
              <View style={Styles.menuOptionContainer}>
                <Icon name="view-dashboard" type="material-community" />
                <Text>List layout</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };
}

ShoppingListHeaderContainer.propTypes = {
  gotoShoppingLists: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    gotoShoppingLists: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingLists',
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListHeaderContainer);
