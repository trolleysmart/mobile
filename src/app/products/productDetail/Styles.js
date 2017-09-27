// @flow

import {
  StyleSheet,
} from 'react-native';
import {
  Color,
  Sizes,
} from '../../../framework/style/DefaultStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    height: 300,
    width: 400,
  },
  addProductContainer: {
    // marginBottom: 10,
    justifyContent: 'space-between',
    padding: 10,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#262626',
  },
  productTitleContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  productTitle: {
    color: Color.primaryFontColor,
    fontSize: 14,
  },
  productPriceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  productPrice: {
    fontSize: 14,
    color: Color.primaryColorLight,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  productSpecialPrice: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',

  },
});
