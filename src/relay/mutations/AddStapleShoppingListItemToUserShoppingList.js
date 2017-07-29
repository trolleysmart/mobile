// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import uuid from 'uuid/v4';
import * as messageBarActions from '../../messageBar/Actions';
import { MessageType } from '../../messageBar';
import { reduxStore } from '../../navigation';

const mutation = graphql`
  mutation AddStapleShoppingListItemToUserShoppingListMutation($input: AddStapleShoppingListItemToUserShoppingListInput!) {
    addStapleShoppingListItemToUserShoppingList(input: $input) {
      errorMessage
      item {
        __typename
        cursor
        node {
          id
          stapleShoppingListId
          name
        }
      }
    }
  }
`;

function sharedUpdater(store, userId, newStapleShoppingList, newStapleShoppingListId) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingList_shoppingList');

  if (newStapleShoppingListId) {
    ConnectionHandler.deleteNode(connection, newStapleShoppingListId);
  }

  ConnectionHandler.insertEdgeAfter(connection, newStapleShoppingList);
}

function commit(environment, userId, stapleShoppingListItem) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { stapleShoppingListItemId: stapleShoppingListItem.id },
    },
    updater: store => {
      const payload = store.getRootField('addStapleShoppingListItemToUserShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      } else {
        const newItem = payload.getLinkedRecord('item');
        const id = newItem.getLinkedRecord('node').getValue('id');

        sharedUpdater(store, userId, newItem, id);
      }
    },
    optimisticUpdater: store => {
      const id = uuid();
      const node = store.create(id, 'item');

      node.setValue(id, 'id');
      node.setValue(stapleShoppingListItem.id, 'stapleShoppingListId');
      node.setValue(stapleShoppingListItem.name, 'name');

      const newStapleShoppingList = store.create(uuid(), 'StapleShoppingListEdge');

      newStapleShoppingList.setLinkedRecord(node, 'node');
      sharedUpdater(store, userId, newStapleShoppingList);
    },
  });
}

export default { commit };
