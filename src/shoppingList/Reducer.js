// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOPPING_LIST_SHOPPING_LIST_CHANGED:
      return state.set('shoppingList', action.payload.get('shoppingList'));

    default:
      return state;
  }
};
