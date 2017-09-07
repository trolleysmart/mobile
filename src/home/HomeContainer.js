// @flow

import { TabNavigator } from 'react-navigation';
import { ShoppingList } from '../shoppingList';
import { SpecialsNavigationTabs } from '../specials';
import { FlyersContainer } from '../flyers';
import { Color } from '../style/DefaultStyles';
const HomeTabs = TabNavigator(
  {
    ShoppingList: {
      screen: ShoppingList,
      path: '/',
    },
    Browse: {
      screen: SpecialsNavigationTabs,
      path: '/specialsnav',
      navigationOptions: {
        tabBarLabel: 'Browse',
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
