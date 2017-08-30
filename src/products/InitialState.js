// @flow

import { List, Map } from 'immutable';

export default Map({
  searchKeyword: '',
  filterOptions: Map({
    sortOption: 'SavingDescending',
    categories: List(),
    stores: List(),
  }),
});
