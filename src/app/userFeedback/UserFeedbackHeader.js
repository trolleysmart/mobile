// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import Styles from './Styles';
import { Color } from '../style/DefaultStyles';
import { TouchableItem } from '../../components/touchableIcon';

const UserFeedbackHeader = ({ userFeedbackClicked }) => (
  <View style={Styles.container}>
    <TouchableItem
      accessibilityComponentType="button"
      accessibilityTraits="button"
      testID="header-filter"
      delayPressIn={0}
      onPress={userFeedbackClicked}
      pressColor={Color.touchableIconPressColor}
      style={Styles.touchableContainer}
      borderless
    >
      <Icon size={28} color={Color.primaryFontColor} name="bullhorn" type="font-awesome" containerStyle={Styles.iconContainerStyle} />
    </TouchableItem>
  </View>
);

UserFeedbackHeader.propTypes = {
  userFeedbackClicked: PropTypes.func.isRequired,
};

export default UserFeedbackHeader;
