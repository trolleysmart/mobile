// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Immutable, { Map } from 'immutable';
import ProductsFilterMenu from './ProductsFilterMenu';

class ProductsFilterMenuContainer extends Component {
  showProductsFilter = () => {
    this.props.showProductsFilter(
      Map({
        sortOption: this.props.sortOption,
      }),
      Map({
        categories: Immutable.fromJS(this.props.categories),
        stores: Immutable.fromJS(this.props.stores),
      }),
    );
  };

  render = () => {
    return <ProductsFilterMenu showProductsFilter={this.showProductsFilter} />;
  };
}

ProductsFilterMenuContainer.propTypes = {
  showProductsFilter: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    showProductsFilter: (sortOption, categoriesFilterOption) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'SpecialsFilter',
          params: {
            sortOption,
            categoriesFilterOption,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterMenuContainer);
