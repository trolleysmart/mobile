// @flow

import { createPaginationContainer, graphql } from 'react-relay';
import StapleShoppingListItemsContainer from './StapleShoppingListItemsContainer';

export default createPaginationContainer(
  StapleShoppingListItemsContainer,
  {
    user: graphql`
      fragment StapleShoppingListItemsRelayContainer_user on User {
        id
        stapleShoppingList(first: $count, after: $cursor, name: $searchKeyword) @connection(key: "User_stapleShoppingList") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.user && props.user.stapleShoppingList;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        searchKeyword: fragmentVariables.searchKeyword,
      };
    },
    variables: { cursor: null },
    query: graphql`
      query StapleShoppingListItemsRelayContainer_PaginationQuery($count: Int!, $cursor: String, $searchKeyword: String) {
        user {
          ...StapleShoppingListItemsRelayContainer_user
        }
      }
    `,
  },
);
