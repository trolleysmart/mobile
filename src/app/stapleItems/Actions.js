// @flow

import ActionTypes from './ActionTypes';

export function searchKeywordChanged(payload) {
  return {
    type: ActionTypes.STAPLE_SHOPPING_LIST_SEARCH_KEYWORD_CHANGED,
    payload,
  };
}

export function stapleShoppingListItemsAdded(payload) {
  return {
    type: ActionTypes.STAPLE_SHOPPING_LIST_ITEMS_ADDED,
    payload,
  };
}

export function stapleShoppingListItemSelectionChanged(payload) {
  return {
    type: ActionTypes.STAPLE_SHOPPING_LIST_ITEM_SELECTION_CHANGED,
    payload,
  };
}

export function userIdChanged(payload) {
  return {
    type: ActionTypes.STAPLE_SHOPPING_LIST_USER_ID_CHANGED,
    payload,
  };
}

export function shoppingListChanged(payload) {
  return {
    type: ActionTypes.STAPLE_SHOPPING_LIST_SHOPPING_LIST_CHANGED,
    payload,
  };
}
