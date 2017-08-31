// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { ImageUltility } from '../components/image';

class FlyerListItem extends React.PureComponent {
  // imageSrc={ImageUltility.getImageSource(this.props.thumbnailImageUrl)}
  render() {
    return (
      <Tile
        imageSrc={ImageUltility.getImageSource('briscoes_thumb')}
        onPress={() => this.props.onFlyerListItemPress(this.props.id, this.props.name)}
        title={this.props.name}
      >
        <View>
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
  thumbnailImageUrl: PropTypes.string,
  expiryDate: PropTypes.string,
};

export default FlyerListItem;
