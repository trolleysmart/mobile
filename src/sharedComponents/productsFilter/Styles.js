// @flow

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  divider: {
    backgroundColor: 'grey',
  },
  filterOptionContainer: {
    padding: 5,
  },
  filterTitle: {
    fontWeight: 'bold',
  },
  applyButton: {
    marginTop: 30,
  },
  sortingOption: {
    flexDirection: 'row',
  },
  sortingOptionText: {
    marginLeft: 10,
  },
  selectedSortOption: {
    justifyContent: 'center',
    marginLeft: 15,
    padding: 5,
  },
});
