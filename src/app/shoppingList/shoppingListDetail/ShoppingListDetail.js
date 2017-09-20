// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormInput, Avatar, Icon } from 'react-native-elements';
import Styles from './Styles';
import { TouchableItem } from '../../../components/touchableIcon';
import { Color } from '../../../framework/style/DefaultStyles';

class ShoppingListDetail extends Component {
  render = () => {
    return (
      <View style={Styles.container}>
        <View style={Styles.listNameContainer}>
          <Text style={Styles.listNameLabel}>List Name</Text>
          <FormInput placeholder="Please enter list name..." />
        </View>
        <View style={Styles.membersContainer}>
          <Text style={Styles.membersLabel}>List Members</Text>
          <View style={Styles.avatarContainer}>
            {this.props.avatarUrl
              ? <Avatar containerStyle={Styles.profileAvatar} small rounded source={{ uri: this.props.avatarUrl }} activeOpacity={0.7} />
              : <Avatar containerStyle={Styles.profileAvatar} small rounded icon={{ name: 'person', type: 'material-icons' }} activeOpacity={0.7} />}
            <Text style={Styles.memberName}>You</Text>
          </View>
          <View style={Styles.avatarContainer}>
            {/* <TouchableIcon iconName='plus-circle-outline' iconType='material-community' /> */}
            {/* <View style={Styles.container}> */}
            <TouchableItem
              accessibilityComponentType="button"
              accessibilityTraits="button"
              delayPressIn={0}
              // pressColor={Color.touchableIconPressColor}
              style={Styles.touchableContainer}
              borderless
            >
              <Icon size={38} color={Color.primaryColorDark} name="plus-circle-outline" type="material-community" />
            </TouchableItem>
            {/* </View> */}
            <Text style={Styles.invite}>Invite People</Text>
          </View>
        </View>
      </View>
    );
  };
}

export default ShoppingListDetail;
