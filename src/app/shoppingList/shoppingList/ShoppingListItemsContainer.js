// @flow

import { List, Map } from 'immutable';
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
import { ErrorMessageWithRetry } from '../../../sharedComponents/errorMessageWithRetry';
import { type ShoppingListItemsRelayContainer_user } from './__generated__/ShoppingListItemsRelayContainer_user.graphql';

type Props = {
  user: ShoppingListItemsRelayContainer_user,
};

type State = {};

class ShoppingListItemsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  componentWillMount = () => {
    if (this.props.errorMessage) {
      return;
    }

    if (!this.props.defaultShoppingListId) {
      this.props.localStateActions.setDefaultShoppingList(
        Map({ id: this.props.user.shoppingLists.edges[0].node.id, name: this.props.user.shoppingLists.edges[0].node.name }),
      );
    }

    this.props.shoppingListActions.shoppingListItemsCountChanged(Map({ numberOfItems: this.props.user.shoppingListItems.edges.length }));
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.errorMessage) {
      return;
    }

    nextProps.shoppingListActions.shoppingListItemsCountChanged(Map({ numberOfItems: nextProps.user.shoppingListItems.edges.length }));
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

    this.props.gotoProducts(foundItem.name, foundItem.tags ? foundItem.tags.map(_ => _.key) : '');
  };

  onViewProductDetailPressed = (productId, productName) => {
    this.props.gotoProductDetail(productId, productName);
  };

  onRefresh = () => {
    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(this.props.user.shoppingListItems.edges.length, () => {
      this.setState({
        isFetchingTop: false,
      });
    });
  };

  onEndReached = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(30, () => {});
  };

  onRetryPressed = () => {
    if (this.props.relay.isLoading()) {
      return;
    }

    const { shoppingListItems } = this.props.user;

    if (shoppingListItems) {
      this.props.relay.refetchConnection(shoppingListItems.edges.length, () => {});
    } else {
      this.props.relay.refetchConnection(30, () => {});
    }
  };

  render = () => {
    if (this.props.errorMessage) {
      return <ErrorMessageWithRetry errorMessage={this.props.errorMessage} onRetryPressed={this.onRetryPressed} />;
    }

    return (
      <ShoppingListItems
        shoppingListItems={this.props.user.shoppingListItems.edges.map(_ => _.node)}
        onShoppingListItemSelectionChanged={this.onShoppingListItemSelectionChanged}
        onViewProductsPressed={this.onViewProductsPressed}
        onShoppingListAddItemClicked={this.onShoppingListAddItemClicked}
        onViewProductDetailPressed={this.onViewProductDetailPressed}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}
ShoppingListItemsContainer.propTypes = {
  gotoAddStapleItemsItems: PropTypes.func.isRequired,
  shoppingListActions: PropTypes.object.isRequired,
  stapleItemsActions: PropTypes.object.isRequired,
  productsActions: PropTypes.object.isRequired,
  localStateActions: PropTypes.object.isRequired,
  defaultShoppingListId: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
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
    gotoProductDetail: (productId, productName) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ProductDetail',
          params: {
            title: productName,
            productId,
            isInShoppingList: true,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItemsContainer);
