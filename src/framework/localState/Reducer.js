// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOCAL_STATE_DEFAULT_SHOPPING_LIST_CHANGED:
      return state.set('defaultShoppingListId', action.payload.get('defaultShoppingListId'));

    default:
      return state;
  }
};
