// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Styles from './Styles';
import { TouchableIcon } from '../../components/touchableIcon';
import { Color } from '../../framework/style/DefaultStyles';

const ProductsFilterMenu = ({ showProductsFilter, isFilterSet }) => (
  <View style={Styles.container}>
    <TouchableIcon onPress={showProductsFilter} iconColor={isFilterSet ? 'white' : null} iconName="sliders" iconType="font-awesome" />
  </View>
);

ProductsFilterMenu.propTypes = {
  showProductsFilter: PropTypes.func.isRequired,
  isFilterSet: PropTypes.bool.isRequired,
};

export default ProductsFilterMenu;
