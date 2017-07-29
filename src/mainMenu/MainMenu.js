// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableItem } from '../components/touchableIcon';
import Styles from './Styles';
import { Color } from '../style/DefaultStyles';

const MainMenu = ({ openDrawer }) =>
  <View style={Styles.container}>
    <TouchableItem
      accessibilityComponentType="button"
      accessibilityTraits="button"
      testID="header-filter"
      delayPressIn={0}
      onPress={() => openDrawer()}
      pressColor={Color.touchableIconPressColor}
      style={Styles.touchableContainer}
      borderless
    >
      <Icon size={28} name="ios-menu" type="ionicon" />
    </TouchableItem>
  </View>;

MainMenu.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default MainMenu;
