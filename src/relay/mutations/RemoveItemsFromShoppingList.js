// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import * as messageBarActions from '../../messageBar/Actions';
import { MessageType } from '../../messageBar';
import { reduxStore } from '../../navigation';

const mutation = graphql`
  mutation RemoveItemsFromShoppingListMutation($input: RemoveItemsFromShoppingListInput!) {
    removeItemsFromShoppingList(input: $input) {
      errorMessage
    }
  }
`;

function sharedUpdater(store, userId, shoppingListItemId) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingListItems_shoppingListItems');

  if (!connection) {
    return;
  }

  ConnectionHandler.deleteNode(connection, shoppingListItemId);
}

function commit(environment, userId, shoppingListItemIds) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
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
          sharedUpdater(store, userId, shoppingListItemId);
        });
      }
    },
    optimisticUpdater: store => {
      shoppingListItemIds.forEach(shoppingListItemId => {
        sharedUpdater(store, userId, shoppingListItemId);
      });
    },
  });
}

export default {
  commit,
};
