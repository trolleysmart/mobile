// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';
import ProductsActionTypes from '../products/ActionTypes';
import { Map } from 'immutable';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOPPING_LIST_SHOPPING_LIST_CHANGED:
      return state.set('shoppingList', action.payload.get('shoppingList'));

    case ProductsActionTypes.PRODUCTS_PRODUCT_SELECTED:
      return state.set('removeCurrentViewingStapleItem', true);

    case ActionTypes.SHOPPING_LIST_CURRENT_VIEWING_STAPLE_ITEM_CHANGED:
      return state.set(
        'currentlyViewingStapleItem',
        Map({
          shoppingListId: action.payload.get('shoppingListId'),
          stapleShoppingListId: action.payload.get('stapleShoppingListId'),
        }),
      );

    case ActionTypes.SHOPPING_LIST_REMOVE_CURRENT_VIEWING_STAPLE_ITEM_FLAG_CHANGED:
      return state.set('removeCurrentViewingStapleItem', action.payload.get('removeCurrentViewingStapleItem'));
    default:
      return state;
  }
};
