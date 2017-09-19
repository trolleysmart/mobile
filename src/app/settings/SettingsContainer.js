// @flow
import * as userAccessActions from 'micro-business-parse-server-common-react-native/src/userAccess/redux/Actions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from './Settings';
import { MainMenuContainer } from '../../sharedComponents/mainMenu';

class SettingsContainer extends Component {
  static navigationOptions = {
    headerLeft: <MainMenuContainer />,
  };

  handleClickHyperLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  handleClickPrivacyPolicyLink = () => {
    this.handleClickHyperLink('http://www.trolleysmart.co.nz/index.php/privacy');
  };

  handleClickOpenSourceLicensesLink = () => {
    this.handleClickHyperLink('http://www.trolleysmart.co.nz/index.php/copyright');
  };

  handleClickTermsAndConditionLink = () => {
    this.handleClickHyperLink('http://www.trolleysmart.co.nz/index.php/term-and-conditions');
  };

  gotoDisclaimer = () => {
    this.props.gotoScreen('Disclaimer');
  };

  signOut = () => {
    this.props.userAccessActions.signOut();
  };

  render = () => {
    return (
      <Settings
        signOut={this.signOut}
        gotoDisclaimer={this.gotoDisclaimer}
        handleClickTermsAndConditionLink={this.handleClickTermsAndConditionLink}
        handleClickOpenSourceLicensesLink={this.handleClickOpenSourceLicensesLink}
        handleClickPrivacyPolicyLink={this.handleClickPrivacyPolicyLink}
      />
    );
  };
}

SettingsContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired,
  gotoScreen: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    gotoScreen: routeName =>
      dispatch(
        NavigationActions.navigate({
          routeName,
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
