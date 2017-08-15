// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import uuid from 'uuid/v4';
import * as messageBarActions from '../../messageBar/Actions';
import { MessageType } from '../../messageBar';
import { reduxStore } from '../../navigation';

const mutation = graphql`
  mutation AddNewStapleShoppingListItemsToShoppingListMutation($input: AddNewStapleShoppingListItemsToShoppingListInput!) {
    addNewStapleShoppingListItemsToShoppingList(input: $input) {
      errorMessage
      items {
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

function commit(environment, userId, names) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { names: names.toJS() },
    },
    updater: store => {
      const payload = store.getRootField('addNewStapleShoppingListItemsToShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      } else {
        const newItems = payload.getLinkedRecords('items');

        newItems.map(newItem => {
          const id = newItem.getLinkedRecord('node').getValue('id');

          sharedUpdater(store, userId, newItem, id);
        });
      }
    },
    optimisticUpdater: store => {
      names.map(name => {
        const id = uuid();
        const node = store.create(id, 'item');

        node.setValue(id, 'id');
        node.setValue(uuid(), 'stapleShoppingListId');
        node.setValue(name, 'name');

        const newStapleShoppingList = store.create(uuid(), 'StapleShoppingListEdge');

        newStapleShoppingList.setLinkedRecord(node, 'node');
        sharedUpdater(store, userId, newStapleShoppingList);
      });
    },
  });
}

export default { commit };
