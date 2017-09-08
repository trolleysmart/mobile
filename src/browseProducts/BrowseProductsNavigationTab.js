// @flow
import React from 'react';
import { Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Products } from '../products';

const BrowseProductsNavigationTab = TabNavigator(
  {
    All: {
      screen: props => <Products {...props} />,
      navigationOptions: {
        tabBarLabel: 'All',
      },
      path: '/all',
    },
    BigSave: {
      screen: props => <Products {...props} defaultSortOption="SavingDescending" />,
      navigationOptions: {
        tabBarLabel: 'Big Save',
      },
      path: '/specialsbig',
    },
    FruitsAndVeg: {
      screen: props => <Products {...props} defaultCategories={['LcqN2sponb']} />,
      navigationOptions: {
        tabBarLabel: 'Fruits & Vegs',
      },
      path: '/fruits',
    },
    Meat: {
      screen: props => <Products {...props} defaultCategories={['jeRdBSKvSx']} />,
      navigationOptions: {
        tabBarLabel: 'Meat',
      },
      path: '/meat',
    },
  },
  {
    lazy: true,
    tabBarPosition: 'top',
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarOptions: {
      scrollEnabled: true,
      showIcon: false,
      tabStyle: {
        // height: 30,
        width: 150,
      },
      labelStyle: {
        fontSize: 13,
      },
      iconStyle: {
        marginBottom: 0,
      },
      style: {
        backgroundColor: '#3DC62A',
      },
      activeTintColor: '#FAFBFA',
    },
    backBehavior: 'none',
  },
);

export default BrowseProductsNavigationTab;
