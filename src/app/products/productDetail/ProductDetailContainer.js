// @flow

import Immutable from 'immutable';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProductDetailContainer extends Component {
  render = () => {
    return <View />;
  };
}

ProductDetailContainer.propTypes = {};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
