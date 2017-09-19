// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import Styles from './Styles';
import { Color } from '../../framework/style/DefaultStyles';
import TouchableItem from './TouchableItem';

const TouchableIcon = ({ onPress, iconName, iconType }) => (
  <View style={Styles.container}>
    <TouchableItem
      accessibilityComponentType="button"
      accessibilityTraits="button"
      delayPressIn={0}
      onPress={onPress}
      pressColor={Color.touchableIconPressColor}
      style={Styles.touchableContainer}
      borderless
    >
      <Icon size={28} color={Color.primaryFontColor} name={iconName} type={iconType} containerStyle={Styles.iconContainerStyle} />
    </TouchableItem>
  </View>
);

TouchableIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
};

export default TouchableIcon;
