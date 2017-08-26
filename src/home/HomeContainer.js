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
import {
  FlyersContainer,
} from '../flyers';

const HomeTabs = TabNavigator({
  ShoppingList: {
    screen: ShoppingList,
    path: '/',
  },
  Specials: {
    screen: Specials,
    path: '/specials',
  },
  Flyers: {
    screen: FlyersContainer,
    path: '/flyers',
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
