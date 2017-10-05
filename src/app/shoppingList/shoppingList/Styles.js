// @flow

import { StyleSheet } from 'react-native';
import { Sizes } from '../../../framework/style/DefaultStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 5,
    marginLeft: 7,
    marginRight: -15,
  },
  stapleItemName: {
    justifyContent: 'center',
  },
  specialItemRow: {
    backgroundColor: 'white',
    // padding: 10,
  },
  stapleItemRow: {
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
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
  },
  sectionHeaderImage: {
    width: 25,
    height: 25,
  },
  headerTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerTitleNumberText: {
    fontSize: 12,
  },
});
