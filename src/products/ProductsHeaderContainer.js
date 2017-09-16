// @flow

import { Map } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { MainMenuContainer } from '../mainMenu';
import { SearchBarWithDelay } from '../searchBarWithDelay';
import { TouchableIcon } from '../components/touchableIcon';
import * as productsActions from './Actions';
import Styles from './Styles';

class ProductsHeaderContainer extends Component {
  onSearchKeywordChanged = searchKeyword => {
    this.props.productsActions.searchKeywordChanged(
      Map({
        searchKeyword,
      }),
    );
  };

  onSearchIconPress = () => {
    this.props.productsActions.productsSearchingModeChanged(
      Map({
        isSearchingMode: true,
      }),
    );
  };

  onExitsSearchModeIconPress = () => {
    this.props.productsActions.searchKeywordChanged(
      Map({
        searchKeyword: '',
      }),
    );
    this.props.productsActions.productsSearchingModeChanged(
      Map({
        isSearchingMode: false,
      }),
    );
  };

  render = () => {
    return (
      <View>
        {this.props.isSearchingMode
          ? <View style={Styles.header}>
              <TouchableIcon onPress={this.onExitsSearchModeIconPress} iconName="ios-arrow-back" iconType="ionicon" />
              <SearchBarWithDelay searchKeyword={this.props.searchKeyword} onSearchKeywordChanged={this.onSearchKeywordChanged} />
            </View>
          : <View style={Styles.header}>
              <MainMenuContainer />
              <View style={Styles.headerOptions}>
                <TouchableIcon onPress={this.onSearchIconPress} iconName="ios-search" iconType="ionicon" />
              </View>
            </View>}
      </View>
    );
  };
}

ProductsHeaderContainer.propTypes = {
  searchKeyword: PropTypes.string,
  isSearchingMode: PropTypes.bool,
  productsActions: PropTypes.object.isRequired,
};

ProductsHeaderContainer.defaultProps = {
  searchKeyword: '',
};

function mapStateToProps(state) {
  return {
    isSearchingMode: state.products.get('isSearchingMode'),
    searchKeyword: state.products.get('searchKeyword'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productsActions: bindActionCreators(productsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHeaderContainer);
