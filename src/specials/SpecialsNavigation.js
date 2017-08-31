// @flow

import { TabNavigator } from 'react-navigation';
import Specials from './Specials';
import { FlyersContainer } from '../flyers';

const SpecialsNavigationTabs = TabNavigator(
  {
    Specials: {
      screen: Specials,
      path: '/specials',
    },
    BigSave: {
      screen: Specials,
      path: '/specialsbig',
    },
    FruitsAndVeg: {
      screen: Specials,
      path: '/specialsfruits',
    },
    Meat: {
      screen: Specials,
      path: '/specialsfruits',
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

export default SpecialsNavigationTabs;
