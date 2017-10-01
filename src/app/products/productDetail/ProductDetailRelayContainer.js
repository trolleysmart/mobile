// @flow

import { createFragmentContainer, graphql } from 'react-relay';
import ProductDetailContainer from './ProductDetailContainer';

export default createFragmentContainer(
  ProductDetailContainer,
  {
    user: graphql`
      fragment ProductDetailRelayContainer_user on User {
        id
        product(productId: $productId) {
          id
          name
          description
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
    `,
  },
  {
    getConnectionFromProps(props) {
      return props.user && props.user.product;
    },
    getFragmentVariables(prevVars) {
      return {
        ...prevVars,
      };
    },
    getVariables(props, fragmentVariables) {
      return {
        productId: fragmentVariables.productId,
      };
    },
    variables: {},
    query: graphql`
      query ProductDetailRelayContainer_user_FragmentQuery($productId: ID!) {
        user {
          ...ProductDetailRelayContainer_user
        }
      }
    `,
  },
);
