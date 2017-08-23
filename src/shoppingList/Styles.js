// @flow

import { StyleSheet } from 'react-native';
import { Sizes } from '../style/DefaultStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  name: {
    fontSize: 14,
  },
  offerEndDate: {
    color: 'red',
  },
  comments: {},
  unitSize: {},
  storeName: {
    fontWeight: 'bold',
  },
  priceToDisplay: {
    fontWeight: 'bold',
    color: 'red',
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 9,
    marginRight: -13,
  },
  stapleItemCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: -15,
  },
  stapleItemName: {
    justifyContent: 'center',
  },
  specialItemRow: {
    backgroundColor: 'white',
    padding: 10,
  },
  stapleItemRow: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  sectionHeader: {
    width: Sizes.screenWidth,
    backgroundColor: '#E9E9EF',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontWeight: '700',
  },
  sectionHeaderImage: {
    width: 25,
    height: 25,
  },
});
