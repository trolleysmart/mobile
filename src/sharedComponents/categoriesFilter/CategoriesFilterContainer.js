// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable, { Map } from 'immutable';
import * as productsFilterActions from '../productsFilter/Actions';
import CategoryItems from './CategoryItems';
import { CategoryItemsProp } from './PropTypes';
import { ErrorMessageWithRetry } from '../errorMessageWithRetry';
import { type CategoriesFilterRelayContainer_viewer } from './__generated__/CategoriesFilterRelayContainer_viewer.graphql';

type Props = {
  viewer: CategoriesFilterRelayContainer_viewer,
};

type State = {
  isFetchingTop: boolean,
};

class CategoriesFilterContainer extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
  };

  onCategoryItemSelectionChanged = (id, key, name, isSelected) => {
    const selectedItems = Immutable.fromJS(this.props.selectedCategories);

    // original state is selected, so remove from selected list
    if (isSelected) {
      this.props.productsFilterActions.categoriesFilterOptionChanged(
        Map({
          categories: selectedItems.filterNot(_ => _.get('id') === id),
        }),
      );
    } else {
      this.props.productsFilterActions.categoriesFilterOptionChanged(
        Map({
          categories: selectedItems.push(
            Map({
              id,
              key,
              name,
            }),
          ),
        }),
      );
    }
  };

  onRefresh = () => {
    if (this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      isFetchingTop: true,
    });

    this.props.relay.refetchConnection(this.props.viewer.tags.edges.length, () => {
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

    if (this.props.viewer && this.props.viewer.tags) {
      this.props.relay.refetchConnection(this.props.viewer.tags.edges.length, () => {});
    } else {
      this.props.relay.refetchConnection(30, () => {});
    }
  };

  render = () => {
    if (this.props.errorMessage) {
      return <ErrorMessageWithRetry errorMessage={this.props.errorMessage} onRetryPressed={this.onRetryPressed} />;
    }

    return (
      <CategoryItems
        categories={this.props.viewer.tags.edges.map(_ => _.node)}
        selectedCategories={this.props.selectedCategories}
        onCategoryItemSelectionChanged={this.onCategoryItemSelectionChanged}
        isFetchingTop={this.state.isFetchingTop}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
      />
    );
  };
}

CategoriesFilterContainer.propTypes = {
  selectedCategories: CategoryItemsProp,
  productsFilterActions: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    selectedCategories: state.productsFilter.get('categories').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productsFilterActions: bindActionCreators(productsFilterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesFilterContainer);
