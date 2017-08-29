// @flow

import React, {
  Component,
} from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  NavigationActions,
} from 'react-navigation';
import {
  bindActionCreators,
} from 'redux';
import FlyerDetail from './FlyerDetail';

class FlyerContainer extends Component {
  render = () => {
    return <FlyerDetail slides={this.props.slides} name={this.props.name} expiryDate={this.props.expiryDate}/>;
  }
}

FlyerContainer.propTypes = {
  storeName: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
      }),
    )
    .isRequired,
};

function getFlyers() {
  let data = [{
      storeName: 'Briscoe',
      expiryDate: '25/9/2017',
      slides: [],
    },
    {
      storeName: 'Harvey Norman',
      expiryDate: '25/9/2017',
      slides: [],
    },
  ];

  return data;
}

function mapStateToProps(state) {
  return {
    storeName: 'Briscoe',
    expiryDate: '25/9/2017',
    slides: [{
      uri: '1',
    }, {
      uri: '2',
    }],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // productsActions: bindActionCreators(specialsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlyerContainer);
