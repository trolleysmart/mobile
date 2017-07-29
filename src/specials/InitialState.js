// @flow

import { List, Map } from 'immutable';

export default Map({
  searchKeyword: '',
  filterOptions: Map({
    sortOption: 'NameAscending',
    categories: List(),
    stores: List(),
  }),
});
