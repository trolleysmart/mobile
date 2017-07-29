// @flow

import { createFragmentContainer, graphql } from 'react-relay';
import ShoppingListItemsContainer from './ShoppingListItemsContainer';

export default createFragmentContainer(ShoppingListItemsContainer, {
  user: graphql`
    fragment ShoppingListItemsRelayContainer_user on User {
      id
      shoppingList(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "ShoppingList_shoppingList") {
        edges {
          node {
            id
            stapleShoppingListId
            specialId
            name
            imageUrl
            priceToDisplay
            storeImageUrl
            storeName
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
});
