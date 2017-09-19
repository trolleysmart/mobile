// @flow

import { StackNavigator } from 'react-navigation';
import { Disclaimer } from '../../sharedComponents/disclaimer';
import SettingsContainer from './SettingsContainer';

export default StackNavigator({
  Settings: {
    screen: SettingsContainer,
  },
  Disclaimer: {
    screen: Disclaimer,
  },
});
