// @flow

import {
  TabNavigator,
} from 'react-navigation';
import {
  ShoppingList,
} from '../shoppingList';
import {
  Specials,
} from '../specials';

const HomeTabs = TabNavigator({
  ShoppingList: {
    screen: ShoppingList,
    path: '/',
  },
  Specials: {
    screen: Specials,
    path: '/specials',
  },
}, {
  tabBarPosition: 'bottom',
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
      backgroundColor: '#3DC62A',
    },
    activeTintColor: '#FAFBFA',
  },
  backBehavior: 'none',
}, );

export default HomeTabs;
