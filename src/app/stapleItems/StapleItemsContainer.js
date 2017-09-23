// @flow

import Immutable, { Map } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import StapleShoppingListItems from './StapleShoppingListItems';
import * as StapleItemsActions from './Actions';
import { type StapleItemsRelayContainer_user } from './__generated__/StapleItemsRelayContainer_user.graphql';

type Props = {
  user: StapleItemsRelayContainer_user,
};

type State = {
  isFetchingTop: boolean,
};

class StapleItemsContrainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  componentDidMount = () => {
    this.props.stapleItemsActions.userIdChanged(Map({ userId: this.props.user.id }));
    this.props.stapleItemsActions.shoppingListChanged(Immutable.fromJS(this.props.shoppingList));
  };

  clearSearchKeyword = () => {
    this.props.stapleItemsActions.searchKeywordChanged(Map({ searchKeyword: '' }));
  };

  onStapleItemSelectionChanged = (stapleItemId, name, isCustomItem, isSelected) => {
    const selectedItems = Immutable.fromJS(this.props.selectedStapleItems);

    // original state is selected, so remove from selected list
    if (isSelected) {
      this.props.stapleItemsActions.stapleItemSelectionChanged(
        Map({ selectedStapleItems: selectedItems.filterNot(_ => _.get('id') === stapleItemId) }),
      );
    } else {
      if (!stapleItemId) {
        this.clearSearchKeyword();
      }

      this.props.stapleItemsActions.stapleItemSelectionChanged(
        Map({
          selectedStapleItems: selectedItems.push(
            Map({
              id: stapleItemId || uuid(),
              name: name,
              isCustomItem: isCustomItem,
            }),
          ),
        }),
      );
    }
  };

  onRefresh = () => {
    const { stapleItems } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(stapleItems.edges.length, error => {
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

  getStapleShoppingListItemsWithCustomItem = () => {
    const stapleList = this.props.temporaryCustomItems.concat(this.props.user.stapleItems.edges.map(_ => _.node));
    const customStapleItem = this.props.customStapleItem;

    if (customStapleItem) {
      const customItemName = customStapleItem.trim();
      const exactMatchStapleItem = stapleList.find(_ => _.name.toLowerCase() === customItemName.toLowerCase());

      if (!exactMatchStapleItem) {
        return [{ name: customItemName, isCustomItem: true }].concat(stapleList);
      }

      return stapleList;
    }

    return stapleList;
  };

  render = () => {
    return (
      <StapleShoppingListItems
        stapleItems={this.getStapleShoppingListItemsWithCustomItem()}
        onStapleItemSelectionChanged={this.onStapleItemSelectionChanged}
        selectedStapleItems={this.props.selectedStapleItems}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

StapleItemsContrainer.propTypes = {
  customStapleItem: PropTypes.string,
  stapleItemsActions: PropTypes.object.isRequired,
  shoppingList: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

function mapStateToProps(state) {
  return {
    customStapleItem: state.stapleItems.get('searchKeyword'),
    selectedStapleItems: state.stapleItems.get('selectedStapleItems').toJS(),
    temporaryCustomItems: state.stapleItems.get('temporaryCustomItems').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stapleItemsActions: bindActionCreators(StapleItemsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StapleItemsContrainer);
