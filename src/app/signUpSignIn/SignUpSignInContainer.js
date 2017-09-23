// @flow

import * as userAccessActions from 'micro-business-parse-server-common-react-native/src/userAccess/redux/Actions';
import { Status } from 'micro-business-parse-server-common-react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignUpSignIn from './SignUpSignIn';

class UserSignInSignUpContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  onSignInWithFacebookClicked = () => {
    this.props.userAccessActions.signInWithFacebook('public_profile,email');
  };

  onSignInClicked = (emailAddress, password) => {
    this.props.userAccessActions.signInWithUsernameAndPassword(emailAddress, password);
  };

  onSignUpClicked = (emailAddress, password) => {
    this.props.userAccessActions.signUpWithUsernameAndPassword(emailAddress, password, emailAddress);
  };

  render = () => {
    return (
      <SignUpSignIn
        onSignInWithFacebookClicked={this.onSignInWithFacebookClicked}
        onSignInClicked={this.onSignInClicked}
        onSignUpClicked={this.onSignUpClicked}
        signUpOrSignInIsInProgress={this.props.signInStatus === Status.IN_PROGRESS || this.props.signUpStatus === Status.IN_PROGRESS}
      />
    );
  };
}

UserSignInSignUpContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired,
  signInStatus: PropTypes.number.isRequired,
  signUpStatus: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    signInStatus: state.userAccess.get('signInStatus'),
    signUpStatus: state.userAccess.get('signUpStatus'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignInSignUpContainer);