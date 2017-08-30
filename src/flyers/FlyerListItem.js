// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { ImageUltility } from '../components/image';

class FlyerListItem extends React.PureComponent {
  render() {
    return (
      <Tile
        imageSrc={ImageUltility.getImageSource(this.props.thumbnailImageUrl)}
        onPress={() => this.props.onFlyerListItemPress(this.props.id, this.props.displayName)}
        title={this.props.name}
      >
        <View>
          <Text>
            {this.props.name}
          </Text>
          <Text>
            {this.props.expiryDate}
          </Text>
        </View>
      </Tile>
    );
  }
}

FlyerListItem.PropTypes = {
  onFlyerListItemPress: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  thumbnailImageUrl: PropTypes.string,
  expiryDate: PropTypes.string,
};

export default FlyerListItem;
