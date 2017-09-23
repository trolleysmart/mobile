// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import * as messageBarActions from '../../../sharedComponents/messageBar/Actions';
import { MessageType } from '../../../sharedComponents/messageBar';
import { reduxStore } from '../../../app/navigation';

const mutation = graphql`
  mutation RemoveItemsFromShoppingListMutation($input: RemoveItemsFromShoppingListInput!) {
    removeItemsFromShoppingList(input: $input) {
      errorMessage
    }
  }
`;

function sharedUpdater(store, userId, shoppingListId, shoppingListItemId) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_shoppingListItems', { shoppingListId });

  if (!connection) {
    return;
  }

  ConnectionHandler.deleteNode(connection, shoppingListItemId);
}

function commit(environment, userId, shoppingListId, shoppingListItemIds) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        shoppingListId,
        shoppingListItemIds,
      },
    },
    updater: store => {
      const payload = store.getRootField('removeItemsFromShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      } else {
        shoppingListItemIds.forEach(shoppingListItemId => {
          sharedUpdater(store, userId, shoppingListId, shoppingListItemId);
        });
      }
    },
    optimisticUpdater: store => {
      shoppingListItemIds.forEach(shoppingListItemId => {
        sharedUpdater(store, userId, shoppingListId, shoppingListItemId);
      });
    },
  });
}

export default {
  commit,
};
