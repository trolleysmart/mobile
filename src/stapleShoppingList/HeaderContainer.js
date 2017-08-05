// @flow

import { Map } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as StapleShoppingListActions from './Actions';
import { SearchBarWithDelay } from '../searchBarWithDelay';
import { UserFeedbackHeader } from '../userFeedback';
import Styles from './Styles';

class HeaderContainer extends Component {
  onSearchKeywordChanged = searchKeyword => {
    this.props.stapleShoppingListActions.searchKeywordChanged(
      Map({
        searchKeyword,
      }),
    );
  };

  userFeedbackClicked = () => {
    this.props.showUserFeedback();
  };

  render = () => {
    return (
      <View style={Styles.searchHeader}>
        <SearchBarWithDelay searchKeyword={this.props.searchKeyword} onSearchKeywordChanged={this.onSearchKeywordChanged} />
        <UserFeedbackHeader userFeedbackClicked={this.userFeedbackClicked} />
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
  showUserFeedback: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.stapleShoppingList.get('searchKeyword'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stapleShoppingListActions: bindActionCreators(StapleShoppingListActions, dispatch),
    showUserFeedback: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'StapleShoppingListUserFeedback',
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
