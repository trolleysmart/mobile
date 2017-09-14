// @flow
import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ShoppingList } from '../shoppingList';
import { BrowseProductsNavigationTab } from '../browseProducts';
import { FlyersContainer } from '../flyers';
import { Color } from '../style/DefaultStyles';
import { ProductsHeaderContainer } from '../products';
import { ShoppingListsNavigationStack } from '../shoppingLists';

const HomeTabs = TabNavigator(
  {
    ShoppingLists: {
      screen: ShoppingList,
      path: '/',
    },
    Browse: {
      screen: BrowseProductsNavigationTab,
      path: '/browse',
      navigationOptions: {
        tabBarLabel: 'Browse',
        tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? 'ios-cart' : 'ios-cart-outline'} size={26} style={{ color: tintColor }} />,
        headerTitle: <ProductsHeaderContainer />,
        headerStyle: {
          backgroundColor: Color.primaryColorNormal,
        },
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
    swipeEnabled: false,
    lazyLoad: true,
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
      inactiveTintColor: Color.primaryColorDark,
      activeTintColor: Color.primaryColorNormal, //'#FAFBFA',
    },
    backBehavior: 'none',
  },
);

export default HomeTabs;
