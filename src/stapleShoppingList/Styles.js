// @flow

import {
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Sizes,
} from '../style/DefaultStyles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  touchableContainer: {

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
  item: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 12,
  },
  image: {
    width: 30,
    height: 30,
    borderWidth: 2,
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
    justifyContent: 'space-between',
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
});
