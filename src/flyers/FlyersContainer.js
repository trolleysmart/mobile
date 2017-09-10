// @flow

import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Flyers from './Flyers';
import { GetFlyers } from './FlyersData';
import { Color } from '../style/DefaultStyles';
import HeaderContainer from '../shoppingList/HeaderContainer';

class FlyersContainer extends Component {
  static navigationOptions = {
    tabBarLabel: 'Flyers',
    tabBarIcon: ({ tintColor, focused }) => <Icon name={focused ? 'ios-images' : 'ios-images-outline'} type="ionicon" size={26} color={tintColor} />,
    headerLeft: <HeaderContainer />,
    title: 'Flyers',
    headerStyle: {
      backgroundColor: Color.primaryColorNormal,
    },
    // headerTitleStyle: {
    //   marginLeft: Platform.OS === 'ios' ? null : 70,
    // },
    headerBackTitle: null,
  };
  onFlyerListItemPress = (id, name) => {
    this.props.gotoFlyer(id, name);
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
      storeName: PropTypes.string.isRequired,
      storeDisplayName: PropTypes.string.isRequired,
      thumbnailImageUrl: PropTypes.string,
      expiryDate: PropTypes.string,
    }),
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    flyers: GetFlyers(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gotoFlyer: (id, name) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Flyer',
          params: {
            id,
            title: name,
          },
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlyersContainer);
