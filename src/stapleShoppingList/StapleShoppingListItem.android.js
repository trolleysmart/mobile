// @flow

import React from 'react';
import {
  View,
  // ToastAndroid,
  Image,
} from 'react-native';
import {
  Col,
  Grid,
} from 'react-native-easy-grid';
import {
  Text,
  Icon,
  Avatar,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import {
  TouchableItem,
} from '../components/touchableIcon';
import {
  Color,
} from '../style/DefaultStyles';
import {
  ImageUltility,
} from '../components/image';

class StapleShoppingListItem extends React.PureComponent {
  onItemPressed = () => {
    this.props.onStapleShoppingListItemSelectionChanged(this.props.id, this.props.name, this.props.isCustomItem, this.props.isSelected);
  };

  render() {
    return (
      // <View style={Styles.item}>
      <TouchableItem
              accessibilityComponentType="button"
              accessibilityTraits="button"
              delayPressIn={0}
              pressColor={Color.touchableIconPressColor}
              onPress={this.onItemPressed}
              // style={Styles.touchableContainer}
              borderless
            >
              <View style={Styles.touchableContainer}>
                <Avatar
                  rounded
                  overlayContainerStyle={{ backgroundColor: this.props.isSelected ? 'grey' : 'green' }}
                  source={ImageUltility.getImageSource(this.props.name) }
                  activeOpacity={0.7}
                />
                <Text style={Styles.itemName}>
                     {this.props.name}
                   </Text>
              </View>

            </TouchableItem>
      // </View>
    );
  }
}

StapleShoppingListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isCustomItem: PropTypes.bool,
  onStapleShoppingListItemAdded: PropTypes.func.isRequired,
};

StapleShoppingListItem.defaultProps = {
  isCustomItem: false,
};

export default StapleShoppingListItem;
