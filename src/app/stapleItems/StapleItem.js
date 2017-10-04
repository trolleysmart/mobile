// @flow

import React from 'react';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { TouchableItem } from '../../components/touchableIcon';
import { Color } from '../../framework/style/DefaultStyles';
import { ImageUltility } from '../../components/image';
import { StapleItemProp } from './PropTypes';

class StapleItem extends React.PureComponent {
  onItemPressed = () => {
    this.props.onStapleItemSelectionChanged(this.props.stapleItem, this.props.isSelected);
  };

  render() {
    return (
      <TouchableItem
        accessibilityComponentType="button"
        accessibilityTraits="button"
        delayPressIn={0}
        pressColor={Color.touchableIconPressColor}
        onPress={this.onItemPressed}
        style={Styles.touchableContainer}
        borderless
      >
        <View style={Styles.touchableContainer}>
          <Avatar
            rounded
            overlayContainerStyle={{ backgroundColor: this.props.isSelected ? '#F4CC62' : '#EFF0F1' }}
            source={ImageUltility.getImageSource(this.props.stapleItem.name.toLowerCase().replace(/\s+/g, ''))}
            activeOpacity={0.7}
          />
          <Text style={Styles.itemName}>{this.props.stapleItem.name}</Text>
        </View>
      </TouchableItem>
    );
  }
}

StapleItem.propTypes = {
  stapleItem: StapleItemProp,
  isSelected: PropTypes.bool,
};

StapleItem.defaultProps = {
  isCustomItem: false,
};

export default StapleItem;
