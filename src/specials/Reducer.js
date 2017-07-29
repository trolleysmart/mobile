// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOPPING_LIST_SEARCH_KEYWORD_CHANGED:
      return state.set('searchKeyword', action.payload.get('searchKeyword'));

    case ActionTypes.SHOPPING_LIST_FILTER_OPTION_CHANGED:
      return state.set('filterOptions', action.payload.get('filterOptions'));

    default:
      return state;
  }
};
