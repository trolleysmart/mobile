// @flow

import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { environment } from '../relay';
import { graphql, QueryRenderer } from 'react-relay';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoppingListItemsRelayContainer from './ShoppingListItemsRelayContainer';
import HeaderContainer from './HeaderContainer';

class ShoppingList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Shopping List',
    tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? 'ios-cart' : 'ios-cart-outline'} size={26} style={{ color: tintColor }} />,
    headerLeft: <HeaderContainer />,
    title: 'TrolleySmart',
    headerTitleStyle: {
      marginLeft: Platform.OS === 'ios' ? null : 70,
    },
    headerBackTitle: null,
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ShoppingListQuery {
            user {
              ...ShoppingListItemsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 1,
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
            return <ShoppingListItemsRelayContainer user={props.user} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

ShoppingList.propTypes = {};

export default ShoppingList;
