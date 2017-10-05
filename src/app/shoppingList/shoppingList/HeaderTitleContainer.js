// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Styles from './Styles';

class HeaderTitleContainer extends Component {
  render = () => {
    return (
      <View style={Styles.headerTitleContainer}>
        <Text style={Styles.headerTitleText}>{this.props.shoppingListName}</Text>
        <Text style={Styles.headerTitleNumberText}>{this.props.numberOfItems !== '' ? this.props.numberOfItems.toString() + ' items' : ''}</Text>
      </View>
    );
  };
}

HeaderTitleContainer.propTypes = {
  shoppingListName: PropTypes.string.isRequired,
  numberOfItems: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    shoppingListName: state.localState.getIn(['defaultShoppingList', 'name']),
    numberOfItems: state.shoppingList.get('numberOfItems'),
  };
}

export default connect(mapStateToProps)(HeaderTitleContainer);
