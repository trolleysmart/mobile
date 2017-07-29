// @flow

import { StyleSheet } from 'react-native';

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
});
