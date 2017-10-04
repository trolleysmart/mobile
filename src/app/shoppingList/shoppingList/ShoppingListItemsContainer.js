// @flow

import Immutable, { List, Map } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShoppingListItems from './ShoppingListItems';
import { RemoveItemsFromShoppingList } from '../../../framework/relay/mutations';
import * as ShoppingListActions from './Actions';
import * as StapleItemsActions from '../../stapleItems/Actions';
import * as ProductsActions from '../../products/products/Actions';
import * as localStateActions from '../../../framework/localState/Actions';

type Props = {
  user: ShoppingListItemsRelayContainer_user,
};

type State = {};

class ShoppingListItemsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  componentWillMount = () => {
    if (!this.props.defaultShoppingListId) {
      this.props.localStateActions.setDefaultShoppingList(
        Map({ id: this.props.user.shoppingLists.edges[0].node.id, name: this.props.user.shoppingLists.edges[0].node.name }),
      );
    }
  };

  componentWillReceiveProps = nextProps => {
    const shoppingListItems = Immutable.fromJS(nextProps.user.shoppingListItems.edges.map(_ => _.node));

    // Remove existing staple item after added relevant products.
    if (
      nextProps.removeCurrentViewingStapleItem &&
      this.props.viewingStapleItem.has('shoppingListId') &&
      this.props.viewingStapleItem.get('shoppingListId') &&
      shoppingListItems.find(_ => _.get('id') === this.props.viewingStapleItem.get('shoppingListId'))
    ) {
      RemoveItemsFromShoppingList.commit(this.props.relay.environment, this.props.user.id, this.props.shoppingListId, [
        this.props.viewingStapleItem.get('shoppingListId'),
      ]);

      // Clear the current viewing staple item
      this.props.shoppingListActions.currentViewingStapleItemChanged(Map());
    }
  };

  onShoppingListItemSelectionChanged = shoppingListItem => {
    RemoveItemsFromShoppingList.commit(this.props.relay.environment, this.props.user.id, this.props.shoppingListId, [shoppingListItem.id]);
  };

  onShoppingListAddItemClicked = () => {
    // Clear the selected staple list
    this.props.stapleItemsActions.stapleItemSelectionChanged(Map({ selectedStapleItems: List() }));
    this.props.gotoAddStapleItemsItems(this.props.defaultShoppingListId);
  };

  onViewProductsPressed = id => {
    const foundItem = this.props.user.shoppingListItems.edges.map(_ => _.node).find(item => item.id.localeCompare(id) === 0);

    // Set the current viewing staple item
    this.props.shoppingListActions.currentViewingStapleItemChanged(Map({ shoppingListId: id, stapleShoppingListId: foundItem.stapleShoppingListId }));

    // Set removeCurrentViewingStapleItem to false
    this.props.shoppingListActions.removeCurrentViewingStapleItemFlagChanged(Map({ removeCurrentViewingStapleItem: false }));
    this.props.gotoProducts(foundItem.name, foundItem.tags ? foundItem.tags.map(_ => _.key) : '');
  };

  onRefresh = () => {
    const { shoppingListItems } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(shoppingListItems.edges.length, error => {
      //TODO: 20170610 - Morteza - Should handle the error here
      this.setState({
        isFetchingTop: false,
      });
    });
  };

  onEndReached = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(30, error => {
      //TODO: 20170610 - Morteza - Should handle the error here
    });
  };

  render = () => {
    return (
      <ShoppingListItems
        shoppingListItems={this.props.user.shoppingListItems.edges.map(_ => _.node)}
        onShoppingListItemSelectionChanged={this.onShoppingListItemSelectionChanged}
        onViewProductsPressed={this.onViewProductsPressed}
        onShoppingListAddItemClicked={this.onShoppingListAddItemClicked}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}
ShoppingListItemsContainer.propTypes = {
  gotoAddStapleItemsItems: PropTypes.func.isRequired,
  removeCurrentViewingStapleItem: PropTypes.bool,
  shoppingListActions: PropTypes.object.isRequired,
  stapleItemsActions: PropTypes.object.isRequired,
  productsActions: PropTypes.object.isRequired,
  localStateActions: PropTypes.object.isRequired,
  defaultShoppingListId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    removeCurrentViewingStapleItem: state.shoppingList.get('removeCurrentViewingStapleItem'),
    viewingStapleItem: state.shoppingList.get('currentlyViewingStapleItem'),
    defaultShoppingListId: state.localState.getIn(['defaultShoppingList', 'id']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shoppingListActions: bindActionCreators(ShoppingListActions, dispatch),
    stapleItemsActions: bindActionCreators(StapleItemsActions, dispatch),
    productsActions: bindActionCreators(ProductsActions, dispatch),
    localStateActions: bindActionCreators(localStateActions, dispatch),
    gotoAddStapleItemsItems: shoppingListId =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'StapleItems',
          params: {
            shoppingListId,
          },
        }),
      ),
    gotoProducts: (defaultSearchKeyword, defaultCategories) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Products',
          params: {
            defaultSearchKeyword,
            defaultCategories,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItemsContainer);
