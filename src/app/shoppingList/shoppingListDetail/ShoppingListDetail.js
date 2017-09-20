// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormInput } from 'react-native-elements';

class ShoppingListDetail extends Component {
  render = () => {
    return (
      <View>
        <Text>List Name</Text>
        <FormInput placeholder="Please enter list name..." />
      </View>
    );
  };
}

export default ShoppingListDetail;
