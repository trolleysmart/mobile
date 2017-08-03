// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import Styles from './Styles';
import { Color } from '../style/DefaultStyles';
import { TouchableItem } from '../components/touchableIcon';

const MainMenu = ({ showSpecialsFilter }) =>
  <View style={Styles.container}>
    <TouchableItem
      accessibilityComponentType="button"
      accessibilityTraits="button"
      testID="header-filter"
      delayPressIn={0}
      onPress={() => showSpecialsFilter()}
      pressColor={Color.touchableIconPressColor}
      style={Styles.touchableContainer}
      borderless
    >
      <Icon size={28} color={Color.primaryFontColor} name="sliders" type="font-awesome" containerStyle={Styles.iconContainerStyle} />
    </TouchableItem>
  </View>;

MainMenu.propTypes = {
  showSpecialsFilter: PropTypes.func.isRequired,
};

export default MainMenu;
