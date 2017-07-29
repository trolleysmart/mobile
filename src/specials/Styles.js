// @flow

import { StyleSheet, Platform } from 'react-native';
import { Color, Sizes } from '../style/DefaultStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: Sizes.searchBarHeaderHeight,
    width: Platform.OS === 'ios' ? Sizes.searchBarHeaderWidth : null,
  },
  specialItemImage: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
  },
  storeImage: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
  specialItemSeparator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  offerEndDate: {
    color: 'red',
  },
  size: {
    textAlign: 'right',
    fontSize: 12,
  },
  savingPercentage: {
    fontSize: 10,
    color: 'red',
    textAlign: 'right',
  },
  comments: {},
  unitPrice: {},
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
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: -15,
  },
  specialItemRow: {
    backgroundColor: 'white',
    padding: 10,
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
