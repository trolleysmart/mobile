// @flow

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * shoppingListsActions from './Actions';
import ShoppingListsList from './ShoppingListsList';

class ShoppingListsContainer extends Component {
  render = () => {
    <ShoppingListsList shoppingLists={this.props.shoppingLists} />
  }
}

ShoppingListsContainer.propTypes = {
  shoppingLists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        owner: PropTypes.string,
      }),
    )
    .isRequired,
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListsActions: bindActionCreators(shoppingListsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ShoppingListsContainer,
);
