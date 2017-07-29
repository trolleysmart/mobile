// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../relay';
import { graphql, QueryRenderer } from 'react-relay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SpecialItemsRelayContainer from './SpecialItemsRelayContainer';
import HeaderContainer from './HeaderContainer';

class Specials extends Component {
  static navigationOptions = {
    tabBarLabel: 'Specials',
    tabBarIcon: ({ tintColor, focused }) =>
      <MaterialIcons name={focused ? 'monetization-on' : 'attach-money'} size={26} style={{ color: tintColor }} />,
    headerTitle: <HeaderContainer />,
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query SpecialsQuery($count: Int!, $cursor: String, $searchKeyword: String, $sortOption: String, $categories: [ID], $stores: [ID]) {
            user {
              ...SpecialItemsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 30,
          searchKeyword: this.props.searchKeyword,
          sortOption: this.props.sortOption,
          categories: this.props.categories,
          stores: this.props.stores,
        }}
        render={({ error, props }) => {
          if (error) {
            return (
              <Text>
                {error.message}
              </Text>
            );
          }

          if (props) {
            return <SpecialItemsRelayContainer user={props.user} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

Specials.propTypes = {
  searchKeyword: PropTypes.string,
  sortOption: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  stores: PropTypes.arrayOf(PropTypes.string),
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.specials.get('searchKeyword'),
    sortOption: state.specials.get('filterOptions').get('sortOption'),
    categories: state.specials.get('filterOptions').get('categories').isEmpty()
      ? null
      : state.specials.get('filterOptions').get('categories').map(_ => _.get('id')),
    stores: state.specials.get('filterOptions').get('stores').isEmpty()
      ? null
      : state.specials.get('filterOptions').get('stores').map(_ => _.get('id')),
  };
}

export default connect(mapStateToProps)(Specials);
