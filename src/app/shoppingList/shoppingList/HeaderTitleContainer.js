// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Styles from './Styles';

class HeaderTitleContainer extends Component {
  render = () => {
    return <Text style={Styles.headerTitleText}>{this.props.shoppingListName}</Text>;
  };
}

HeaderTitleContainer.propTypes = {
  shoppingListName: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    shoppingListName: state.localState.getIn(['defaultShoppingList', 'name']),
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTitleContainer);
