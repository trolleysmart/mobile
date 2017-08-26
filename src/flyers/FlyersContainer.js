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
import Flyers from './Flyers';

class FlyersContainer extends Component {

  onFlyerListItemPress = (id) => {
    this.props.gotoFlyer();
  };

  render = () => {
    return <Flyers flyers={this.props.flyers} onFlyerListItemPress={this.onFlyerListItemPress} />;
  };
}

FlyersContainer.propTypes = {
  gotoFlyer: PropTypes.func.isRequired,
  flyers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        thumbnailImageUrl: PropTypes.string,
        imageUrl: PropTypes.string,
        expiryDate: PropTypes.string,
      })
    )
    .isRequired,
};

function mapStateToProps(state) {
  return {
    flyers: [{
        id: 1,
        name: 'Briscoe',
        thumbnailImageUrl: '',
        imageUrl: '',
        expiryDate: '15/9/2017',
      },
      {
        id: 2,
        name: 'Noeleeming',
        thumbnailImageUrl: '',
        imageUrl: '',
        expiryDate: '22/9/2017',
      },
    ],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gotoFlyer: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Flyer',
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FlyersContainer,
);
