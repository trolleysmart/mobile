// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.STAPLE_SHOPPING_LIST_SEARCH_KEYWORD_CHANGED:
    return state.set('searchKeyword', action.payload.get('searchKeyword'));

  default:
    return state;
  }
};
