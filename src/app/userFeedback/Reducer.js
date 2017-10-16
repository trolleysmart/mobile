// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_FEEDBACK_MESSAGE_CHANGED: {
      return state.set('message', action.payload.get('message'));
    }

    default:
      return state;
  }
};
