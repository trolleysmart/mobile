// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STAPLE_SHOPPING_LIST_SEARCH_KEYWORD_CHANGED:
      return state.set('searchKeyword', action.payload.get('searchKeyword'));

    case ActionTypes.STAPLE_SHOPPING_LIST_ITEM_ADDED:
      return state.set('stapleShoppingListItems', action.payload.get('stapleShoppingListItems'));

    case ActionTypes.STAPLE_SHOPPING_LIST_ITEM_SELECTION_CHANGED:
      return state
        .set('selectedStapleItems', action.payload.get('selectedStapleItems'))
        .update('temporaryCustomItems', items =>
          items.concat(
            action.payload
              .get('selectedStapleItems')
              .filter(_ => _.get('isCustomItem'))
              .filterNot(_ => items.find(item => item.get('id') === _.get('id'))),
          ),
        );

    case ActionTypes.STAPLE_SHOPPING_LIST_USER_ID_CHANGED:
      return state.set('userId', action.payload.get('userId'));

    case ActionTypes.STAPLE_SHOPPING_LIST_SHOPPING_LIST_CHANGED:
      return state.setIn(['shoppingList', 'id'], action.payload.get('id'));

    default:
      return state;
  }
};
