// @flow

import PropTypes from 'prop-types';

export const ShoppingListsProp = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string,
  }),
);
