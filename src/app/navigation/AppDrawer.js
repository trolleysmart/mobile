// @flow
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import AppNavigationStack from './AppNavigationStack';
import { SettingsNavigator } from '../settings';
import { Icon } from 'react-native-elements';
import AppDrawerMenuContainer from '../../sharedComponents/drawer/AppDrawerMenuContainer';
import { DisclaimerNavigator } from '../../sharedComponents/disclaimer';

export default DrawerNavigator(
  {
    Home: {
      screen: AppNavigationStack,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: () => <Icon name="home" type="material-community" />,
      },
    },
    Disclaimer: {
      screen: DisclaimerNavigator,
      navigationOptions: {
        drawerLabel: 'Alpha Programme',
        drawerIcon: () => <Icon name="new-releases" color="#517fa4" type="material-icons" />,
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        drawerLabel: 'Settings',
        drawerIcon: () => <Icon name="ios-settings" type="ionicon" />,
      },
    },
  },
  {
    contentComponent: AppDrawerMenuContainer,
  },
);
