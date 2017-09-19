// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable, { Map } from 'immutable';
import * as specialsFilterActions from '../productsFilter/Actions';
import Stores from './Stores';
import { type StoresFilterRelayContainer_viewer } from './__generated__/StoresFilterRelayContainer_viewer.graphql';

type Props = {
  viewer: StoresFilterRelayContainer_viewer,
};

type State = {
  isFetchingTop: boolean,
};

class StoresFilterContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  onStoreSelectionChanged = (storeId, name, isSelected) => {
    const selectedItems = Immutable.fromJS(this.props.selectedStores);

    // original state is selected, so remove from selected list
    if (isSelected) {
      this.props.specialsFilterActions.storesFilterOptionChanged(
        Map({
          stores: selectedItems.filterNot(_ => _.get('id') === storeId),
        }),
      );
    } else {
      this.props.specialsFilterActions.storesFilterOptionChanged(
        Map({
          stores: selectedItems.push(
            Map({
              id: storeId,
              name: name,
            }),
          ),
        }),
      );
    }
  };

  onRefresh = () => {
    const { stores } = this.props.viewer.stores;

    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(stores.edges.length, error => {
      //TODO: 20170701 - Should handle the error here
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
      //TODO: 20170701 - Fred - Should handle the error here
    });
  };

  render = () => {
    return (
      <Stores
        stores={this.props.viewer.stores.edges.map(_ => _.node)}
        selectedStores={this.props.selectedStores}
        onStoreSelectionChanged={this.onStoreSelectionChanged}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

StoresFilterContainer.propTypes = {
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      storeId: PropTypes.string,
    }),
  ).isRequired,
  selectedStores: PropTypes.arrayOf(
    PropTypes.shape({
      storeId: PropTypes.string,
    }),
  ).isRequired,
  specialsFilterActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    selectedStores: state.specialsFilter.get('stores').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    specialsFilterActions: bindActionCreators(specialsFilterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoresFilterContainer);
