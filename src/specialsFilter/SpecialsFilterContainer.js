// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable, { Map } from 'immutable';
import { Platform } from 'react-native';
import * as specialsActions from '../specials/Actions';
import * as specialsFilterActions from './Actions';
import SpecialsFilter from './SpecialsFilter';

class SpecialsFilterContainer extends Component {
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
    this.props.specialsFilterActions.sortOptionChanged(
      Map({
        sortOption,
      }),
    );
  };

  applyFilters = () => {
    // dispatch action to set sort options of specials with specialsFilter' sort option state
    this.props.specialsActions.filterOptionChanged(
      Map({
        filterOptions: Map({
          sortOption: this.props.sortOption,
          categories: Immutable.fromJS(this.props.categories),
          stores: Immutable.fromJS(this.props.stores),
        }),
      }),
    );
    this.props.goBack();
  };

  render = () => {
    return (
      <SpecialsFilter
        sortOption={this.props.sortOption}
        categories={this.props.categories}
        stores={this.props.stores}
        gotoCategoryFilter={this.gotoCategoryFilter}
        gotoStoreFilter={this.gotoStoreFilter}
        applyFilters={this.applyFilters}
        onSortOptionChanged={this.onSortOptionChanged}
      />
    );
  };
}

SpecialsFilterContainer.propTypes = {
  specialsFilterActions: PropTypes.object.isRequired,
  gotoScreen: PropTypes.func.isRequired,
  specialsActions: PropTypes.object.isRequired,
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
    sortOption: state.specialsFilter.get('sortOption'),
    categories: state.specialsFilter.get('categories').toJS(),
    stores: state.specialsFilter.get('stores').toJS(),
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
    goBack: () => dispatch(NavigationActions.back()),
    specialsActions: bindActionCreators(specialsActions, dispatch),
    specialsFilterActions: bindActionCreators(specialsFilterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialsFilterContainer);
