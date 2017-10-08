// @flow

import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import { environment } from '../../../framework/relay';
import ShoppingListsRelayContainer from './ShoppingListsRelayContainer';
import { Color } from '../../../framework/style/DefaultStyles';
import { LoadingInProgress } from '../../../sharedComponents/loadingInProgress';

class ShoppingLists extends Component {
  static navigationOptions = {
    title: 'Shopping Lists',
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
            return <ShoppingListsRelayContainer errorMessage={error.message} />;
          }

          if (props) {
            return <ShoppingListsRelayContainer user={props.user} />;
          }

          return <LoadingInProgress />;
        }}
      />
    );
  }
}

ShoppingLists.propTypes = {};

export default ShoppingLists;
