// @flow
import React from 'react';
import { TabNavigator } from 'react-navigation';
import { ShoppingList } from '../shoppingList';
import { BrowseProductsNavigationTab } from '../browseProducts';
import { FlyersContainer } from '../flyers';
import { Color } from '../style/DefaultStyles';
import { ProductsHeaderContainer } from '../products';

const HomeTabs = TabNavigator(
  {
    ShoppingList: {
      screen: ShoppingList,
      path: '/',
    },
    Browse: {
      screen: BrowseProductsNavigationTab,
      path: '/browse',
      navigationOptions: {
        tabBarLabel: 'Browse',
        headerTitle: <ProductsHeaderContainer />,
      },
    },
    Flyers: {
      screen: FlyersContainer,
      path: '/flyers',
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      tabStyle: {
        height: 49,
      },
      labelStyle: {
        fontSize: 9,
      },
      iconStyle: {
        marginBottom: 0,
      },
      style: {
        backgroundColor: 'white', //Color.primaryColorLight, //'#3DC62A',
      },
      activeTintColor: Color.primaryColorNormal, //'#FAFBFA',
    },
    backBehavior: 'none',
  },
);

export default HomeTabs;
