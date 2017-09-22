// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import uuid from 'uuid/v4';
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
        }
      }
    }
  }
`;

function sharedUpdater(store, userId, shoppingListItemsEdge) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingLists_shoppingLists');

  if (!connection) {
    return;
  }

  ConnectionHandler.insertEdgeAfter(connection, shoppingListItemsEdge);
}

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
      } else {
        const shoppingListEdge = payload.getLinkedRecords('shoppingList');

        sharedUpdater(store, userId, shoppingListEdge);
      }
    },
    optimisticUpdater: store => {
      const id = uuid();
      const node = store.create(id, 'item');

      node.setValue(id, 'id');
      node.setValue(name, 'name');

      const shoppingListEdge = store.create(uuid(), 'ShoppingListEdge');

      shoppingListEdge.setLinkedRecord(node, 'node');
      sharedUpdater(store, userId, shoppingListEdge);
    },
  });
}

export default {
  commit,
};
