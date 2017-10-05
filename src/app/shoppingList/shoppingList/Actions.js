// @flow

import ActionTypes from './ActionTypes';

export function shoppingListItemsCountChanged(payload) {
  return {
    type: ActionTypes.SHOPPING_LIST_ITEMS_COUNT_CHANGED,
    payload,
  };
}
