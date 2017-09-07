// @flow

import { List, Map } from 'immutable';

export default Map({
  All: Map({
    searchKeyword: 'apple',
    filterOptions: Map({
      sortOption: 'NameAscending',
      categories: List(),
      stores: List(),
    }),
  }),
  BigSave: Map({
    searchKeyword: 'banana',
    filterOptions: Map({
      sortOption: 'NameAscending',
      categories: List(),
      stores: List(),
    }),
  }),
});
