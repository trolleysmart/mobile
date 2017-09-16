// @flow

import { createPaginationContainer, graphql } from 'react-relay';
import SpecialItemsContainer from './SpecialItemsContainer';

export default createPaginationContainer(
  SpecialItemsContainer,
  {
    user: graphql`
      fragment SpecialItemsRelayContainer_user on User {
        id
        products(first: $count, after: $cursor, name: $searchKeyword, sortOption: $sortOption, tagKeys: $categories, storeKeys: $stores)
          @connection(key: "User_products") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
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
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.user && props.user.specials;
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
        sortOption: fragmentVariables.sortOption,
        categories: fragmentVariables.categories,
        stores: fragmentVariables.stores,
      };
    },
    variables: {
      cursor: null,
    },
    query: graphql`
      query SpecialItemsRelayContainerPaginationQuery(
        $count: Int!
        $cursor: String
        $searchKeyword: String
        $sortOption: String
        $categories: [String]
        $stores: [String]
      ) {
        user {
          ...SpecialItemsRelayContainer_user
        }
      }
    `,
  },
);
