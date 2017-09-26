// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable, { List, Map } from 'immutable';
import { Platform } from 'react-native';
import * as productsFilterActions from './Actions';
import ProductsFilter from './ProductsFilter';

class ProductsFilterContainer extends Component {
  static navigationOptions = {
    title: 'Filter',
    headerTitleStyle: {
      marginLeft: Platform.OS === 'ios' ? null : 100,
    },
  };

  gotoCategoryFilter = () => {
    this.props.gotoScreen('CategoriesFilter');
  };

  gotoStoreFilter = () => {
    this.props.gotoScreen('StoresFilter');
  };

  onSortOptionChanged = sortOption => {
    this.props.productsFilterActions.sortOptionChanged(
      Map({
        sortOption,
      }),
    );
  };

  clearFilters = () => {
    this.props.productsFilterActions.sortOptionChanged(
      Map({
        sortOption: '',
      }),
    );
    this.props.productsFilterActions.categoriesFilterOptionChanged(
      Map({
        categories: List(),
      }),
    );
    this.props.productsFilterActions.storesFilterOptionChanged(
      Map({
        stores: List(),
      }),
    );
  };

  render = () => {
    return (
      <ProductsFilter
        sortOption={this.props.sortOption}
        categories={this.props.categories}
        stores={this.props.stores}
        gotoCategoryFilter={this.gotoCategoryFilter}
        gotoStoreFilter={this.gotoStoreFilter}
        clearFilters={this.clearFilters}
        onSortOptionChanged={this.onSortOptionChanged}
      />
    );
  };
}

ProductsFilterContainer.propTypes = {
  productsFilterActions: PropTypes.object.isRequired,
  gotoScreen: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string,
    }),
  ).isRequired,
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      storeId: PropTypes.string,
    }),
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    sortOption: state.productsFilter.get('sortOption'),
    categories: state.productsFilter.get('categories').toJS(),
    stores: state.productsFilter.get('stores').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gotoScreen: routeName =>
      dispatch(
        NavigationActions.navigate({
          routeName,
        }),
      ),
    productsFilterActions: bindActionCreators(productsFilterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterContainer);
