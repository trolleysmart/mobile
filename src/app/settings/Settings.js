// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { List, ListItem, Text } from 'react-native-elements';
import Styles from './Styles';
import packageInfo from '../../../package.json';

class Settings extends Component {
  render() {
    return (
      <View>
        <List>
          <ListItem title="Disclaimer" leftIcon={{ name: 'ios-information-outline', type: 'ionicon' }} onPress={this.props.gotoDisclaimer} />
          <ListItem
            title="Pricing Disclaimer"
            leftIcon={{ name: 'ios-information-outline', type: 'ionicon' }}
            onPress={this.props.gotoPricingDisclaimer}
          />
          <ListItem title="Sign out" leftIcon={{ name: 'ios-log-out-outline', type: 'ionicon' }} onPress={this.props.signOut} />
        </List>
        <View style={Styles.aboutContainer}>
          <Text>Version {packageInfo.version}</Text>
          <Text>Copyright 2016 - {new Date().getFullYear()} Micro-business Ltd</Text>
          <Text onPress={this.props.handleClickPrivacyPolicyLink} style={Styles.hyperLink}>
            Privacy Policy
          </Text>
          <Text onPress={this.props.handleClickOpenSourceLicensesLink} style={Styles.hyperLink}>
            Open Source Licenses
          </Text>
          <Text onPress={this.props.handleClickTermsAndConditionLink} style={Styles.hyperLink}>
            Terms of Service
          </Text>
        </View>
      </View>
    );
  }
}

Settings.propTypes = {
  signOut: PropTypes.func.isRequired,
  gotoDisclaimer: PropTypes.func.isRequired,
  gotoPricingDisclaimer: PropTypes.func.isRequired,
  handleClickOpenSourceLicensesLink: PropTypes.func.isRequired,
  handleClickPrivacyPolicyLink: PropTypes.func.isRequired,
  handleClickTermsAndConditionLink: PropTypes.func.isRequired,
};

export default Settings;
