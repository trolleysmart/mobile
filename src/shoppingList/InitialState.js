// @flow

import { List, Map } from 'immutable';

export default Map({
  shoppingList: List(),
  removeCurrentViewingStapleItem: false,
  currentlyViewingStapleItem: Map(),
});
