// @flow
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import AppNavigator from './AppNavigator';
import { SettingsNavigator } from '../settings';
import { Icon } from 'react-native-elements';
import AppDrawerMenuContainer from './AppDrawerMenuContainer';
import { DisclaimerNavigator } from '../disclaimer';

export default DrawerNavigator(
  {
    Home: {
      screen: AppNavigator,
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
