// @flow

import { StyleSheet, Platform } from 'react-native';
import { Sizes } from '../style/DefaultStyles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  searchHeader: {
    flexDirection: 'row',
    height: Sizes.searchBarHeaderHeight,
    width: Platform.OS === 'ios' ? Sizes.searchBarHeaderWidth - 30 : null,
    marginRight: Platform.OS === 'ios' ? null : 10,
  },
  row: {
    padding: 10,
  },
  itemName: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
