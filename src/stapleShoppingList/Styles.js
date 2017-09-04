// @flow

import { StyleSheet, Platform } from 'react-native';
import { Sizes } from '../style/DefaultStyles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  touchableContainer: {
    padding: 10,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 10,
    textAlign: 'center',
  },
  sectionHeaderImage: {
    width: 25,
    height: 25,
  },
  sectionHeader: {
    width: Sizes.screenWidth,
    backgroundColor: '#E9E9EF',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerHeader: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  itemsCount: {
    color: 'blue',
  },
  select: {
    color: 'blue',
  },
  sectionTitle: {
    fontWeight: '700',
  },
  sectionListContainer: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  addItemsHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemsTouchableContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  addItemsIconContainer: {
    height: Sizes.searchBarHeaderHeight,
    width: 30,
  },
});
