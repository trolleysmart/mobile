// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as shoppingListsActions from './Actions';
import ShoppingListsList from './ShoppingListsList';
import { MainMenuContainer } from '../mainMenu';

class ShoppingListsContainer extends Component {
  static navigationOptions = {
    title: 'Shopping Lists',
    headerLeft: <MainMenuContainer />,
  };

  onShoppingListPressed = id => {
    this.props.showShoppingList(id);
  };

  render = () => {
    return <ShoppingListsList shoppingLists={this.props.shoppingLists} onShoppingListPressed={this.onShoppingListPressed} />;
  };
}

ShoppingListsContainer.propTypes = {
  shoppingLists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      owner: PropTypes.string,
    }),
  ).isRequired,
};

function mapStateToProps() {
  return {
    shoppingLists: [
      {
        id: 1,
        name: 'My List 1',
        owner: 'Fred',
      },
      {
        id: 2,
        name: 'Weekend Veg',
        owner: 'Fred',
      },
    ],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListsActions: bindActionCreators(shoppingListsActions, dispatch),
    showShoppingList: id =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingList',
          params: {
            id,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListsContainer);
