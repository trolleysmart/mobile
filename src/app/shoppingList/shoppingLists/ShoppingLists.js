// @flow

import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { graphql, QueryRenderer } from 'react-relay';
import { environment } from '../../../framework/relay';
import { MainMenuContainer } from '../../../sharedComponents/mainMenu';
import ShoppingListsRelayContainer from './ShoppingListsRelayContainer';
import { Color } from '../../../framework/style/DefaultStyles';

class ShoppingList extends Component {
  static navigationOptions = {
    title: 'Shopping Lists',
    headerLeft: <MainMenuContainer />,
    headerStyle: {
      backgroundColor: Color.primaryColorNormal,
    },
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ShoppingListsQuery($count: Int!, $cursor: String) {
            user {
              ...ShoppingListsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 30,
        }}
        render={({ error, props }) => {
          if (error) {
            return <Text>{error.message}</Text>;
          }

          if (props) {
            return <ShoppingListsRelayContainer user={props.user} />;
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
