// @flow

import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { environment } from '../../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoppingListItemsRelayContainer from './ShoppingListItemsRelayContainer';

class ShoppingList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Shopping List',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} size={26} style={{ color: tintColor }} />,
    // headerLeft: <HeaderContainer />,
    // headerStyle: {
    //   backgroundColor: Color.primaryColorNormal,
    // },
    title: 'My Shopping List 1',
    // headerTitleStyle: {
    //   marginLeft: Platform.OS === 'ios' ? null : 70,
    // },
    // headerBackTitle: null,
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ShoppingListQuery($count: Int!, $cursor: String, $shoppingListId: ID! ) {
            user {
              ...ShoppingListItemsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 30,
          shoppingListId: 'Test Id',
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
