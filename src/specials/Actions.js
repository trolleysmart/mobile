// @flow

import ActionTypes from './ActionTypes';

export function searchKeywordChanged(payload) {
  return {
    type: ActionTypes.SHOPPING_LIST_SEARCH_KEYWORD_CHANGED,
    payload,
  };
}

export function filterOptionChanged(payload) {
  return {
    type: ActionTypes.SHOPPING_LIST_FILTER_OPTION_CHANGED,
    payload,
  };
}
