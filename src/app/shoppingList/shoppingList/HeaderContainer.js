// @flow

import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { TouchableIcon } from '../../../components/touchableIcon';
import Styles from './Styles';

class ShoppingListHeaderContainer extends Component {
  onViewShoppingListsPressed = () => {

  }

  render = () => {
    return (
      <View style={Styles.header}>
        <TouchableIcon
          iconName='view-list'
          iconType='material-community'
          onPress={this.onViewShoppingListsPressed}
        />
      </View>
    );
  }
}

ShoppingListHeaderContainer.propTypes = {
  // onViewShoppingListsPressed: PropTypes.func.isRequired,
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListHeaderContainer);
