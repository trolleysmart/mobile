// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import UserFeedback from './UserFeedback';

class UserFeedbackContainer extends Component {
  render = () => {
    return <UserFeedback/>;
  };
}

UserFeedbackContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    userId: state.userAccess.getIn(['userInfo', 'id']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => dispatch(NavigationActions.back()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFeedbackContainer);
