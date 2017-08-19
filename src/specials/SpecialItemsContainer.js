// @flow

import Immutable, { List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as specialsActions from './Actions';
import SpecialItems from './SpecialItems';
import { AddItemsToShoppingList, RemoveSpecialItemsFromUserShoppingList } from '../relay/mutations';
import { type SpecialItemsRelayContainer_user } from './__generated__/SpecialItemsRelayContainer_user.graphql';

type Props = {
  user: SpecialItemsRelayContainer_user,
};

type State = {
  isFetchingTop: boolean,
};

class SpecialItemsContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  onSpecialItemSelectionChanged = (specialItemId, isInShoppingList) => {
    if (isInShoppingList) {
      const shoppingListItem = this.props.shoppingList.find(_ => _.specialId === specialItemId);

      RemoveSpecialItemsFromUserShoppingList.commit(this.props.relay.environment, this.props.user.id, shoppingListItem.id, specialItemId);
    } else {
      const shoppingListItem = this.props.user.specials.edges.map(_ => _.node).find(_ => _.id === specialItemId);

      AddItemsToShoppingList.commit(this.props.relay.environment, this.props.user.id, { productPrices: List.of(Immutable.fromJS(shoppingListItem)) });
    }
  };

  onRefresh = () => {
    const { specials } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(specials.edges.length, error => {
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
      <SpecialItems
        specials={this.props.user.specials.edges.map(_ => _.node)}
        shoppingList={this.props.shoppingList}
        onSpecialItemSelectionChanged={this.onSpecialItemSelectionChanged}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

SpecialItemsContainer.propTypes = {
  shoppingList: PropTypes.arrayOf(
    PropTypes.shape({
      stapleShoppingListId: PropTypes.string,
      specialId: PropTypes.string,
    }),
  ).isRequired,
  specialsActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    shoppingList: state.shoppingList.get('shoppingList').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    specialsActions: bindActionCreators(specialsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialItemsContainer);
