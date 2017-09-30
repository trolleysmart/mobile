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
  storeInfoContainer:{
    flexDirection: 'row',
  },
  storeDetail:{
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  productTitle: {
    color: Color.primaryFontColor,
    fontSize: 20,
  },
  productDescription:{
    color: Color.primaryFontColor,
  },
  productPriceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  savingPercentage: {
    fontSize: 10,
    color: 'red',
    textAlign: 'right',
  },
  priceToDisplay: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Color.primaryColorNormal,
    textAlign: 'right',
  },
  // productPrice: {
  //   fontSize: 14,
  //   color: Color.primaryColorLight,
  //   textDecorationLine: 'line-through',
  //   textDecorationStyle: 'solid',
  // },
  // productSpecialPrice: {
  //   color: 'red',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
});
