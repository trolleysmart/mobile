// @flow

import ActionTypes from './ActionTypes';

export function refreshNetInfoState(payload) {
  return {
    type: ActionTypes.APP_REFRESH_NETINFO_STATE,
    payload,
  };
}

export function netInfoStateChanged(payload) {
  return {
    type: ActionTypes.APP_NETINFO_STATE_CHANGED,
    payload,
  };
}
