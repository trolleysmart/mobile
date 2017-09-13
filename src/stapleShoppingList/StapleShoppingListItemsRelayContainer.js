// @flow

import { createPaginationContainer, graphql } from 'react-relay';
import StapleShoppingListItemsContainer from './StapleShoppingListItemsContainer';

export default createPaginationContainer(
  StapleShoppingListItemsContainer,
  {
    user: graphql`
      fragment StapleShoppingListItemsRelayContainer_user on User {
        id
        stapleItems(first: $count, after: $cursor, name: $searchKeyword) @connection(key: "User_stapleItems") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
              popular
              tags {
                id
                key
                name
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.user && props.user.stapleItems;
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
    variables: {
      cursor: null,
    },
    query: graphql`
      query StapleShoppingListItemsRelayContainer_PaginationQuery($count: Int!, $cursor: String, $searchKeyword: String) {
        user {
          ...StapleShoppingListItemsRelayContainer_user
        }
      }
    `,
  },
);
