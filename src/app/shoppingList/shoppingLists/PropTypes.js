// @flow

import PropTypes from 'prop-types';

export const ShoppingListProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}).isRequired;

export const ShoppingListsProp = PropTypes.arrayOf(ShoppingListProp);
