// @flow

import ActionTypes from './ActionTypes';

export function searchKeywordChanged(payload) {
  return {
    type: ActionTypes.STAPLE_SHOPPING_LIST_SEARCH_KEYWORD_CHANGED,
    payload,
  };
}
