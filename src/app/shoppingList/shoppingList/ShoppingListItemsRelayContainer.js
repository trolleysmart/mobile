// @flow

import { createPaginationContainer, graphql } from 'react-relay';
import ShoppingListItemsContainer from './ShoppingListItemsContainer';

export default createPaginationContainer(
  ShoppingListItemsContainer,
  {
    user: graphql`
      fragment ShoppingListItemsRelayContainer_user on User {
        id
        shoppingList(shoppingListId: $shoppingListId){
          name
        }
        shoppingListItems(first: $count, after: $cursor, shoppingListId: $shoppingListId) @connection(key: "User_shoppingListItems") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              productPriceId
              stapleItemId
              name
              imageUrl
              priceToDisplay
              store {
                name
                imageUrl
              }
              comments
              unitPrice {
                price
                size
              }
              multiBuy {
                awardQuantity
                awardValue
              }
              offerEndDate
              size
              savingPercentage
              saving
              tags {
                name
                key
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
      return props.user && props.user.shoppingList;
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
        shoppingListId: fragmentVariables.shoppingListId,
      };
    },
    variables: {
      cursor: null,
    },
    query: graphql`
      query ShoppingListItemsRelayContainer_user_PaginationQuery($count: Int!, $cursor: String, $shoppingListId: ID!) {
        user {
          ...ShoppingListItemsRelayContainer_user
        }
      }
    `,
  },
);
