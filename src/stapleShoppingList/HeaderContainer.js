// @flow

import { Map } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as StapleShoppingListActions from './Actions';
import { SearchBarWithDelay } from '../searchBarWithDelay';
import Styles from './Styles';

class HeaderContainer extends Component {
  onSearchKeywordChanged = searchKeyword => {
    this.props.stapleShoppingListActions.searchKeywordChanged(
      Map({
        searchKeyword,
      }),
    );
  };

  render = () => {
    return (
      <View style={Styles.searchHeader}>
        <SearchBarWithDelay
          searchKeyword={this.props.searchKeyword}
          onSearchKeywordChanged={this.onSearchKeywordChanged}
        />
      </View>
    );
  };
}

HeaderContainer.propTypes = {
  searchKeyword: PropTypes.string,
  stapleShoppingListActions: PropTypes.object.isRequired,
};

HeaderContainer.defaultProps = {
  searchKeyword: '',
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.stapleShoppingList.get('searchKeyword'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stapleShoppingListActions: bindActionCreators(
      StapleShoppingListActions,
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
