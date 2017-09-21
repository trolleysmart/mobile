// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoppingListItemsRelayContainer from './ShoppingListItemsRelayContainer';

class ShoppingList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Shopping List',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} size={26} style={{ color: tintColor }} />
    ),
    title: 'My Shopping List 1',
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ShoppingListQuery($count: Int!, $cursor: String, $shoppingListId: ID!) {
            user {
              ...ShoppingListItemsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 30,
          shoppingListId: this.props.shoppingListId,
        }}
        render={({ error, props }) => {
          if (error) {
            return <Text>{error.message}</Text>;
          }

          if (props) {
            return <ShoppingListItemsRelayContainer user={props.user} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

ShoppingList.propTypes = {
  shoppingListId: PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
  return {
    shoppingListId: props.navigation.state.params.shoppingListId,
  };
}

export default connect(mapStateToProps)(ShoppingList);
