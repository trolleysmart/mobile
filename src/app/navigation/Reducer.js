// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.APP_NETINFO_STATE_CHANGED:
      return state.set('netInfo', action.payload);

    default:
      return state;
  }
};
