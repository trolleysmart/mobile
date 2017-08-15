// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.STAPLE_SHOPPING_LIST_SEARCH_KEYWORD_CHANGED:
    return state.set('searchKeyword', action.payload.get('searchKeyword'));
  case ActionTypes.STAPLE_SHOPPING_LIST_ITEM_ADDED:
    return state.set('stapleShoppingListItems', action.payload.get('stapleShoppingListItems'));
  case ActionTypes.STAPLE_SHOPPING_LIST_ITEM_SELECTION_CHANGED:
    return state.set('selectedStapleShoppingListItems', action.payload.get('selectedStapleShoppingListItems'));

  default:
    return state;
  }
};
