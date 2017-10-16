// @flow

import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import UserFeedback from './UserFeedback';
import MainMenuContainer from '../../sharedComponents/mainMenu/MainMenuContainer';
import { Color } from '../../framework/style/DefaultStyles';
import { SubmitUserFeedback } from '../../framework/relay/mutations';
import environment from '../../framework/relay/environment';
import * as userFeedbackActions from './Actions';

class UserFeedbackContainer extends Component {
  static navigationOptions = {
    headerLeft: <MainMenuContainer />,
    headerStyle: {
      backgroundColor: Color.secondaryColorAction,
    },
  };

  onMessageChanged = message => {
    this.props.userFeedbackActions.userFeedbackMessageChanged(Map({ message }));
  };

  onSendPress = () => {
    SubmitUserFeedback.commit(
      environment,
      Map({
        message: this.props.message,
      }),
    );
  };

  render = () => {
    return <UserFeedback onSendPress={this.onSendPress} onMessageChanged={this.onMessageChanged} />;
  };
}

UserFeedbackContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    userId: state.userAccess.getIn(['userInfo', 'id']),
    message: state.userFeedback.get('message'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userFeedbackActions: bindActionCreators(userFeedbackActions, dispatch),
    goBack: () => dispatch(NavigationActions.back()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFeedbackContainer);
