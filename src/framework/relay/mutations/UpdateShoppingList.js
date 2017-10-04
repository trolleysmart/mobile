// @flow

import { commitMutation, graphql } from 'react-relay';
import * as messageBarActions from '../../../sharedComponents/messageBar/Actions';
import { MessageType } from '../../../sharedComponents/messageBar';
import { reduxStore } from '../../../app/navigation';

const mutation = graphql`
  mutation UpdateShoppingListMutation($input: UpdateShoppingListInput!) {
    updateShoppingList(input: $input) {
      errorMessage
      shoppingList {
        __typename
        cursor
        node {
          id
          name
          totalItemsCount
        }
      }
    }
  }
`;

function commit(environment, userId, shoppingListId, name) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        shoppingListId,
        name,
      },
    },
    updater: store => {
      const payload = store.getRootField('updateShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      }
    },
  });
}

export default {
  commit,
};
