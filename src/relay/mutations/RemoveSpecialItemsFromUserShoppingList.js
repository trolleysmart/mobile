// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import * as messageBarActions from '../../messageBar/Actions';
import { MessageType } from '../../messageBar';
import { reduxStore } from '../../navigation';

const mutation = graphql`
  mutation RemoveSpecialItemsFromUserShoppingListMutation($input: RemoveSpecialItemsFromUserShoppingListInput!) {
    removeSpecialItemsFromUserShoppingList(input: $input) {
      errorMessage
    }
  }
`;

function sharedUpdater(store, userId, shoppingListId) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingList_shoppingList');

  ConnectionHandler.deleteNode(connection, shoppingListId);
}

function commit(environment, userId, shoppingListId, specialItemId) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { specialItemId },
    },
    updater: store => {
      const payload = store.getRootField('removeSpecialItemsFromUserShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      } else {
        sharedUpdater(store, userId, shoppingListId);
      }
    },
    optimisticUpdater: store => {
      sharedUpdater(store, userId, shoppingListId);
    },
  });
}

export default { commit };
