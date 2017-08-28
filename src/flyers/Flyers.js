// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import FlyerListItem from './FlyerListItem';
import Styles from './Styles';

class Flyers extends React.PureComponent {
  renderItem = ({ item }) => {
    return (
      <FlyerListItem
        id={item.id}
        name={item.name}
        expiryDate={item.expiryDate}
        thumbnailImageUrl={item.thumbnailImageUrl}
        onFlyerListItemPress={this.props.onFlyerListItemPress}
      />
    );
  };

  render = () => {
    return <FlatList data={this.props.flyers} renderItem={this.renderItem} keyExtractor={item => item.id} />;
  };
}

Flyers.PropTypes = {
  onFlyerListItemPress: PropTypes.func.isRequired,
  flyers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbnailImageUrl: PropTypes.string,
      imageUrl: PropTypes.string,
      expiryDate: PropTypes.string,
    }),
  ).isRequired,
};

export default Flyers;
