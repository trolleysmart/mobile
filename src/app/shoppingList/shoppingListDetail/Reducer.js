// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOPPING_LIST_DETAIL_SHOPPING_LIST_NAME_CHANGED:
      return state.set('shoppingListName', action.payload.get('shoppingListName'));

    default:
      return state;
  }
};
