// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Styles from './Styles';
import { TouchableIcon } from '../../components/touchableIcon';

const ProductsFilterMenu = ({ showProductsFilter }) => (
  <View style={Styles.container}>
    <TouchableIcon onPress={showProductsFilter} iconName="sliders" iconType="font-awesome" />
  </View>
);

ProductsFilterMenu.propTypes = {
  showProductsFilter: PropTypes.func.isRequired,
};

export default ProductsFilterMenu;
