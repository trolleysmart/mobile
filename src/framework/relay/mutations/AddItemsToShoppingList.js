// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import uuid from 'uuid/v4';
import * as messageBarActions from '../../../sharedComponents/messageBar/Actions';
import { MessageType } from '../../../sharedComponents/messageBar';
import { reduxStore } from '../../../app/navigation';

const mutation = graphql`
  mutation AddItemsToShoppingListMutation($input: AddItemsToShoppingListInput!) {
    addItemsToShoppingList(input: $input) {
      errorMessage
      shoppingListItems {
        __typename
        cursor
        node {
          id
          productPriceId
          stapleItemId
          name
          imageUrl
          priceToDisplay
          comments
          offerEndDate
          size
          saving
          savingPercentage
          store {
            name
            imageUrl
          }
          unitPrice {
            price
            size
          }
          multiBuy {
            awardQuantity
            awardValue
          }
        }
      }
    }
  }
`;

function sharedUpdater(store, userId, shoppingListId, shoppingListItemsEdge, id) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingListItems_shoppingListItems', { shoppingListId });

  if (!connection) {
    return;
  }

  if (id) {
    ConnectionHandler.deleteNode(connection, id);
  }

  ConnectionHandler.insertEdgeAfter(connection, shoppingListItemsEdge);
}

function commit(environment, userId, shoppingListId, { productPrices, stapleItems, newStapleItemNames }) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        shoppingListId,
        productPriceIds: productPrices ? productPrices.map(productPrice => productPrice.get('id')) : [],
        stapleItemIds: stapleItems ? stapleItems.map(stapleItem => stapleItem.get('id')) : [],
        newStapleItemNames: newStapleItemNames ? newStapleItemNames : [],
      },
    },
    updater: store => {
      const payload = store.getRootField('addItemsToShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      } else {
        const shoppingListItemsEdges = payload.getLinkedRecords('shoppingListItems');

        shoppingListItemsEdges.forEach(shoppingListItemsEdge => {
          const id = shoppingListItemsEdge.getLinkedRecord('node').getValue('id');

          sharedUpdater(store, userId, shoppingListId, shoppingListItemsEdge, id);
        });
      }
    },
    optimisticUpdater: store => {
      if (productPrices) {
        productPrices.forEach(productPrice => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(productPrice.get('id'), 'productPriceId');
          node.setValue(productPrice.get('name'), 'name');
          node.setValue(productPrice.get('priceToDisplay'), 'priceToDisplay');
          node.setValue(productPrice.get('imageUrl'), 'imageUrl');
          node.setValue(productPrice.get('comments'), 'comments');
          node.setValue(productPrice.get('offerEndDate'), 'offerEndDate');
          node.setValue(productPrice.get('size'), 'size');
          node.setValue(productPrice.get('savingPercentage'), 'savingPercentage');
          node.setValue(productPrice.get('saving'), 'saving');

          const shoppingListItemEdge = store.create(uuid(), 'ShoppingListItemEdge');

          shoppingListItemEdge.setLinkedRecord(node, 'node');
          sharedUpdater(store, userId, shoppingListId, shoppingListItemEdge);
        });
      }

      if (stapleItems) {
        stapleItems.forEach(stapleItem => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(stapleItem.get('id'), 'stapleItemId');
          node.setValue(stapleItem.get('name'), 'name');

          const shoppingListItemEdge = store.create(uuid(), 'ShoppingListItemEdge');

          shoppingListItemEdge.setLinkedRecord(node, 'node');
          sharedUpdater(store, userId, shoppingListId, shoppingListItemEdge);
        });
      }

      if (newStapleItemNames) {
        newStapleItemNames.forEach(newStapleItemName => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(uuid(), 'stapleItemId');
          node.setValue(newStapleItemName, 'name');

          const shoppingListItemEdge = store.create(uuid(), 'ShoppingListItemEdge');

          shoppingListItemEdge.setLinkedRecord(node, 'node');
          sharedUpdater(store, userId, shoppingListId, shoppingListItemEdge);
        });
      }
    },
  });
}

export default {
  commit,
};
