// @flow

import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Products } from '../products';
import { Color } from '../../framework/style/DefaultStyles';

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
      screen: props => <Products {...props} defaultCategories={['fruit-vegetables']} />,
      navigationOptions: {
        tabBarLabel: 'Fruits & Vegs',
      },
      path: '/fruits',
    },
    Meat: {
      screen: props => <Products {...props} defaultCategories={['meat-seafood']} />,
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
        width: 150,
      },
      labelStyle: {
        fontSize: 13,
      },
      iconStyle: {
        marginBottom: 0,
      },
      style: {
        backgroundColor: Color.primaryColorNormal,
      },
      activeTintColor: '#FAFBFA',
    },
    backBehavior: 'none',
  },
);

export default BrowseProductsNavigationTab;
