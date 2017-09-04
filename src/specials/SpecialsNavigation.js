// @flow
import React from 'react';
import { TabNavigator } from 'react-navigation';
import Specials from './SpecialsStatelessContainer';

const SpecialsNavigationTabs = TabNavigator(
  {
    Specials: {
      screen: props => <Specials {...props} />,
      navigationOptions: {
        tabBarLabel: 'All',
        headerTitle: 'All products header',
      },
      path: '/specials',
    },
    BigSave: {
      screen: props => <Specials {...props} />,
      navigationOptions: {
        tabBarLabel: 'Big Save',
        headerTitle: 'Big Save Header',
      },
      path: '/specialsbig',
    },
    FruitsAndVeg: {
      screen: props => <Specials {...props} />,
      navigationOptions: {
        tabBarLabel: 'Fruits & Vegs',
        headerTitle: 'Fruits and Vegs',
      },
      path: '/specialsfruits',
    },
    Meat: {
      screen: props => <Specials {...props} />,
      navigationOptions: {
        tabBarLabel: 'Meat',
        headerTitle: 'Meat header',
      },
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
