// @flow

import { StyleSheet } from 'react-native';
import { Color, Sizes } from '../../../framework/style/DefaultStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent: 'center',
    height: Sizes.searchBarHeaderHeight,
    width: Sizes.searchBarHeaderWidth,
  },
  headerOptions: {
    flexDirection: 'row',
  },
  menuOption: {
    flexDirection: 'row',
  },
  productListItemRow: {
    backgroundColor: 'white',
    padding: 10,
  },
  productListItemRowContainer: {
    flexDirection: 'row',
  },
  productListItemRowSelected: {
    backgroundColor: 'white',
    padding: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
  },
  storeImage: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
  offerEndDate: {
    color: 'red',
  },
  productSize: {
    textAlign: 'right',
    fontSize: 12,
  },
  savingPercentage: {
    fontSize: 10,
    color: 'red',
    textAlign: 'right',
  },
  storeName: {
    fontSize: 12,
    color: '#666666',
  },
  subTitle: {
    color: Color.primaryFontColor,
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  priceToDisplay: {
    fontWeight: 'bold',
    color: '#3DC62A',
    textAlign: 'right',
  },
});
