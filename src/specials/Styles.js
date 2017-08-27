// @flow

import { StyleSheet, Platform } from 'react-native';
import { Sizes } from '../style/DefaultStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: Sizes.searchBarHeaderHeight,
    width: Platform.OS === 'ios' ? Sizes.searchBarHeaderWidth : null,
  },
});
