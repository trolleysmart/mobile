// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import uuid from 'uuid/v4';
import * as messageBarActions from '../../messageBar/Actions';
import { MessageType } from '../../messageBar';
import { reduxStore } from '../../navigation';

const mutation = graphql`
  mutation AddSpecialItemToUserShoppingListMutation($input: AddSpecialItemToUserShoppingListInput!) {
    addSpecialItemToUserShoppingList(input: $input) {
      errorMessage
      item {
        __typename
        cursor
        node {
          id
          specialId
          name
          imageUrl
          barcode
          specialType
          priceToDisplay
          wasPrice
          multiBuy {
            awardValue
            awardQuantity
          }
          storeName
          storeImageUrl
          comments
          offerEndDate
          unitPrice {
            price
            size
          }
          offerEndDate
          size
          saving
          savingPercentage
        }
      }
    }
  }
`;

function sharedUpdater(store, userId, newSpecial, newSpecialId) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingList_shoppingList');

  if (newSpecialId) {
    ConnectionHandler.deleteNode(connection, newSpecialId);
  }

  ConnectionHandler.insertEdgeAfter(connection, newSpecial);
}

function commit(environment, userId, specialItem) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { specialItemId: specialItem.id },
    },
    updater: store => {
      const payload = store.getRootField('addSpecialItemToUserShoppingList');
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
      node.setValue(specialItem.id, 'specialId');
      node.setValue(specialItem.name, 'name');
      node.setValue(specialItem.priceToDisplay, 'priceToDisplay');
      node.setValue(specialItem.saving, 'saving');
      node.setValue(specialItem.savingPercentage, 'savingPercentage');
      node.setValue(specialItem.imageUrl, 'imageUrl');
      node.setValue(specialItem.storeImageUrl, 'storeImageUrl');
      node.setValue(specialItem.storeName, 'storeName');
      node.setValue(specialItem.comments, 'comments');
      node.setValue(specialItem.offerEndDate, 'offerEndDate');
      node.setValue(specialItem.size, 'size');

      const newSpecial = store.create(uuid(), 'SpecialEdge');

      newSpecial.setLinkedRecord(node, 'node');
      sharedUpdater(store, userId, newSpecial);
    },
  });
}

export default {
  commit,
};
