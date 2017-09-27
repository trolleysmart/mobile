// @flow

import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements';
// import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import Styles from './Styles';

class ProductDetail extends Component {
  render = () => {
    return (
      <View>
        <Image source={require('../../../../assets/Cadbury-Treat.jpg')} resizeMode="cover" style={Styles.productImage} />
        <Text>Cadbury Treat Size Individually Wrapped Crunchie Sharepack 180g bag 12pk</Text>
        <Card title="Store" />
      </View>
    );
  };
}

export default ProductDetail;
