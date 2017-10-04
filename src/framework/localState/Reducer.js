// @flow

import { Map } from 'immutable';
import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOCAL_STATE_DEFAULT_SHOPPING_LIST_CHANGED:
      return state.merge(Map({ defaultShoppingList: Map({ id: action.payload.get('id'), name: action.payload.get('name') }) }));

    default:
      return state;
  }
};
