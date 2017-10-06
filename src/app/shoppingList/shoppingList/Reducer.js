// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOPPING_LIST_ITEMS_COUNT_CHANGED:
          return state.set('numberOfItems', action.payload.get('numberOfItems'));

    default:
      return state;
  }
};
