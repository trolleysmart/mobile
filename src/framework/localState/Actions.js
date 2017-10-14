// @flow

import ActionTypes from './ActionTypes';

export function getDefaultShoppingList(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_GET_DEFAULT_SHOPPING_LIST,
    payload,
  };
}

export function setDefaultShoppingList(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_SET_DEFAULT_SHOPPING_LIST,
    payload,
  };
}

export function defaultShoppingListChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_DEFAULT_SHOPPING_LIST_CHANGED,
    payload,
  };
}
