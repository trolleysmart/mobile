// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import {
  Tile,
} from 'react-native-elements';

class FlyerListItem extends React.PureComponent {
  render() {
    return <Tile
        onPress={this.props.onFlyerListItemPress}
        title={this.props.name}>
        <View>
          <Text >{this.props.name}</Text>
          <Text>{this.props.expiryDate}</Text>
        </View>
      </Tile>;
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
