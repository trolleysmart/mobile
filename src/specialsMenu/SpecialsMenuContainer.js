// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable, { Map } from 'immutable';
import SpecialsMenu from './SpecialsMenu';
import * as specialsFilterActions from '../specialsFilter/Actions';

class SpecialsMenuContainer extends Component {
  showSpecialsFilter = () => {
    // dispatch action to set sort options of specials filter with specials' sort option state
    this.props.specialsFilterActions.sortOptionChanged(
      Map({
        sortOption: this.props.sortOption,
      }),
    );
    this.props.specialsFilterActions.categoriesFilterOptionChanged(
      Map({
        categories: Immutable.fromJS(this.props.categories),
        stores: Immutable.fromJS(this.props.stores),
      }),
    );

    this.props.showSpecialsFilter();
  };

  render = () => {
    return <SpecialsMenu showSpecialsFilter={this.showSpecialsFilter} />;
  };
}

SpecialsMenuContainer.propTypes = {
  showSpecialsFilter: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    sortOption: state.specials.get('filterOptions').get('sortOption'),
    categories: state.specials.get('filterOptions').get('categories'),
    stores: state.specials.get('filterOptions').get('stores'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSpecialsFilter: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'SpecialsFilter',
        }),
      ),
    specialsFilterActions: bindActionCreators(specialsFilterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialsMenuContainer);
