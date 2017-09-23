// @flow

import ActionTypes from './ActionTypes';

export function currentViewingStapleItemChanged(payload) {
  return {
    type: ActionTypes.SHOPPING_LIST_CURRENT_VIEWING_STAPLE_ITEM_CHANGED,
    payload,
  };
}

export function removeCurrentViewingStapleItemFlagChanged(payload) {
  return {
    type: ActionTypes.SHOPPING_LIST_REMOVE_CURRENT_VIEWING_STAPLE_ITEM_FLAG_CHANGED,
    payload,
  };
}