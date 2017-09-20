// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { TouchableIcon } from '../../../components/touchableIcon';
class HeaderContainer extends Component {
  render = () => {
    return (
      <View>
        <TouchableIcon iconName="md-checkmark" iconType="ionicon" />
      </View>
    );
  };
}

export default HeaderContainer;
