// @flow

import { Map } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as specialsActions from './Actions';
import { MainMenuContainer } from '../mainMenu';
import { SearchBarWithDelay } from '../searchBarWithDelay';
import { SpecialsMenuContainer } from '../specialsMenu';
import Styles from './Styles';

class HeaderContainer extends Component {
  onSearchKeywordChanged = searchKeyword => {
    this.props.specialsActions.searchKeywordChanged(
      Map({
        searchKeyword,
      }),
    );
  };

  render = () => {
    return (
      <View style={Styles.header}>
        <MainMenuContainer />
        <SearchBarWithDelay
          searchKeyword={this.props.searchKeyword}
          onSearchKeywordChanged={this.onSearchKeywordChanged}
        />
        <SpecialsMenuContainer />
      </View>
    );
  };
}

HeaderContainer.propTypes = {
  searchKeyword: PropTypes.string,
  specialsActions: PropTypes.object.isRequired,
};

HeaderContainer.defaultProps = {
  searchKeyword: '',
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.specials.get('searchKeyword'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    specialsActions: bindActionCreators(specialsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
