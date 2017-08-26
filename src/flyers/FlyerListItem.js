// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';

class FlyerListItem extends React.PureComponent {
  render() {
    return <View >
      <Text onPress={this.props.onFlyerListItemPress}>{this.props.name}</Text>
      <Text>{this.props.expiryDate}</Text>
    </View>;
  }
}

FlyerListItem.PropTypes = {
  onFlyerListItemPress: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnailImageUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  expiryDate: PropTypes.string,
};

export default FlyerListItem;
