// @flow

import Immutable, {
  Map,
  List,
} from 'immutable';
import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  bindActionCreators,
} from 'redux';
import {
  connect,
} from 'react-redux';
import uuid from 'uuid/v4';
import StapleShoppingListItems from './StapleShoppingListItems';
import {
  AddNewStapleShoppingListItemsToShoppingList,
  AddStapleShoppingListItemToUserShoppingList,
} from '../relay/mutations';
import * as StapleShoppingListActions from './Actions';
import {
  type StapleShoppingListItemsRelayContainer_user,
} from './__generated__/StapleShoppingListItemsRelayContainer_user.graphql';

type Props = {
  user: StapleShoppingListItemsRelayContainer_user,
};

type State = {
  isFetchingTop: boolean,
};

class StapleShoppingListItemsContrainer extends Component < any, Props, State > {
  state = {
    isFetchingTop: false,
  };

  clearSearchKeyword = () => {
    this.props.stapleShoppingListActions.searchKeywordChanged(
      Map({
        searchKeyword: '',
      }),
    );
  };

  // onStapleShoppingListItemAdded = (stapleShoppingListId, name, isCustomItem) => {
  //   if (isCustomItem) {
  //     this.clearSearchKeyword();
  //

  //AddNewStapleShoppingListItemsToShoppingList.commit(this.props.relay.environment, this.props.user.id, List.of(name));

  //   } else {
  //     const shoppingListItem = this.props.user.stapleShoppingList.edges.map(_ => _.node).find(_ => _.id === stapleShoppingListId);
  //
  //     AddStapleShoppingListItemToUserShoppingList.commit(this.props.relay.environment, this.props.user.id, shoppingListItem);
  //   }
  // };
  onStapleShoppingListItemsAdded = (stapleShoppingListId, name, isCustomItem) => {

    //this.props.stapleShoppingListActions.stapleShoppingListItemsAdded(stapleShoppingListId, name, isCustomItem);
  };

  onStapleShoppingListItemSelectionChanged = (stapleShoppingListId, name, isCustomItem, isSelected) => {
    const selectedItems = Immutable.fromJS(this.props.selectedStapleShoppingListItems);

    // original state is selected, so remove from selected list
    if (isSelected) {
      this.props.stapleShoppingListActions.stapleShoppingListItemSelectionChanged(
        Map({
          selectedStapleShoppingListItems: selectedItems.filterNot(_ => _.get('id') === stapleShoppingListId),
        }),
      );
    } else {
      this.props.stapleShoppingListActions.stapleShoppingListItemSelectionChanged(
        Map({
          selectedStapleShoppingListItems: selectedItems.push(
            Map({
              id: stapleShoppingListId,
              name: name,
              isCustomItem: isCustomItem,
            }),
          ),
        }),
      );
    }
  };

  onRefresh = () => {
    const {
      stapleShoppingList,
    } = this.props.user;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(stapleShoppingList.edges.length, error => {
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
      <StapleShoppingListItems
        stapleShoppingList={getStapleShoppingListItemsWithCustomItem(
          this.props.user.stapleShoppingList.edges.map(_ => _.node),
          this.props.customStapleShoppingListItem,
        )}
        onStapleShoppingListItemsAdded={this.onStapleShoppingListItemsAdded}
        onStapleShoppingListItemSelectionChanged={this.onStapleShoppingListItemSelectionChanged}
        selectedStapleShoppingListItems={this.props.selectedStapleShoppingListItems}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

function getStapleShoppingListItemsWithCustomItem(stapleList, customStapleShoppingListItem) {
  if (customStapleShoppingListItem) {
    const customItemName = customStapleShoppingListItem.trim();
    const exactMatchStapleItem = stapleList.find(_ => _.name.toLowerCase() === customItemName.toLowerCase());

    if (!exactMatchStapleItem) {
      const customStapleItems = [];

      customStapleItems.push({
        id: uuid(),
        name: customItemName,
        isCustomItem: true,
      });

      return customStapleItems.concat(stapleList);
    }

    return stapleList;
  }

  return stapleList;
}

StapleShoppingListItemsContrainer.propTypes = {
  customStapleShoppingListItem: PropTypes.string,
  stapleShoppingListActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    customStapleShoppingListItem: state.stapleShoppingList.get('searchKeyword'),
    selectedStapleShoppingListItems: state.stapleShoppingList.get('selectedStapleShoppingListItems')
      .toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stapleShoppingListActions: bindActionCreators(StapleShoppingListActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StapleShoppingListItemsContrainer);
