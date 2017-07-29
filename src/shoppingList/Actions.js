// @flow

import ActionTypes from './ActionTypes';

export function shoppingListChanged(payload) {
  return {
    type: ActionTypes.SHOPPING_LIST_SHOPPING_LIST_CHANGED,
    payload,
  };
}
