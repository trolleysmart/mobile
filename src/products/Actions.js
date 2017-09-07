// @flow

import ActionTypes from './ActionTypes';

export function searchKeywordChanged(payload) {
  return {
    type: ActionTypes.PRODUCTS_SEARCH_KEYWORD_CHANGED,
    payload,
  };
}

export function filterOptionChanged(payload) {
  return {
    type: ActionTypes.PRODUCTS_FILTER_OPTION_CHANGED,
    payload,
  };
}

export function productSelected(payload) {
  return {
    type: ActionTypes.PRODUCTS_PRODUCT_SELECTED,
    payload,
  };
}

export function productDeselected(payload) {
  return {
    type: ActionTypes.PRODUCTS_PRODUCT_DESELECTED,
    payload,
  };
}
