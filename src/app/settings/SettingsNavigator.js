// @flow

import { StackNavigator } from 'react-navigation';
import { Disclaimer } from '../disclaimer';
import { PricingDisclaimer } from '../pricingDisclaimer';
import SettingsContainer from './SettingsContainer';

export default StackNavigator({
  Settings: {
    screen: SettingsContainer,
  },
  Disclaimer: {
    screen: Disclaimer,
  },
  PricingDisclaimer: {
    screen: PricingDisclaimer,
  },
});
