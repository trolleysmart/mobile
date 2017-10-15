// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import UserFeedback from './UserFeedback';
import MainMenuContainer from '../../sharedComponents/mainMenu/MainMenuContainer';
import { Color } from '../../framework/style/DefaultStyles';

class UserFeedbackContainer extends Component {
  static navigationOptions = {
    headerLeft: <MainMenuContainer />,
    headerStyle: {
      backgroundColor: Color.secondaryColorAction,
    },
  };
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
