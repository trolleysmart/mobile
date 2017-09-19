// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SPECIALS_FILTER_SORT_OPTION_CHANGED:
      return state.set('sortOption', action.payload.get('sortOption'));
    case ActionTypes.SPECIALS_FILTER_CATEGORIES_CHANGED:
      return state.set('categories', action.payload.get('categories'));
    case ActionTypes.SPECIALS_FILTER_STORES_CHANGED:
      return state.set('stores', action.payload.get('stores'));
    default:
      return state;
  }
};
