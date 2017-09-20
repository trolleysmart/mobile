// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { TouchableIcon } from '../../../components/touchableIcon';
class HeaderContainer extends Component {
  render = () => {
    return (
      <View>
        <TouchableIcon iconName="tick" iconType="font-awesome" />
      </View>
    );
  };
}

export default HeaderContainer;
