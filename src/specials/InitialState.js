// @flow

import { List, Map } from 'immutable';

export default Map({
  searchKeyword: '',
  filterOptions: Map({
    sortOption: 'SavingDescending',
    categories: List(),
    stores: List(),
  }),
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
