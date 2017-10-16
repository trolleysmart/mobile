// @flow

import ActionTypes from './ActionTypes';

export function userFeedbackMessageChanged(payload) {
  return {
    type: ActionTypes.USER_FEEDBACK_MESSAGE_CHANGED,
    payload,
  };
}
