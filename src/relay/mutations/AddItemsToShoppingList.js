// @flow

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import uuid from 'uuid/v4';
import * as messageBarActions from '../../messageBar/Actions';
import { MessageType } from '../../messageBar';
import { reduxStore } from '../../navigation';

const mutation = graphql`
  mutation AddItemsToShoppingListMutation($input: AddItemsToShoppingListInput!) {
    addItemsToShoppingList(input: $input) {
      errorMessage
    }
  }
`;

function sharedProductPriceUpdater(store, userId, productPriceEdge, id) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingList_shoppingList');

  if (id) {
    ConnectionHandler.deleteNode(connection, id);
  }

  ConnectionHandler.insertEdgeAfter(connection, productPriceEdge);
}

function sharedStapleShoppingListUpdater(store, userId, stapleShoppingListEdge, id) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingList_shoppingList');

  if (id) {
    ConnectionHandler.deleteNode(connection, id);
  }

  ConnectionHandler.insertEdgeAfter(connection, stapleShoppingListEdge);
}

function commit(environment, userId, { productPrices, stapleShoppingListItems, newStapleShoppingListNames }) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        productPriceIds: productPrices ? productPrices.map(productPrice => productPrice.get('id')).toJS() : [],
        stapleShoppingListIds: stapleShoppingListItems
          ? stapleShoppingListItems.map(stapleShoppingListItem => stapleShoppingListItem.get('id')).toJS()
          : [],
        newStapleShoppingListNames: newStapleShoppingListNames ? newStapleShoppingListNames.toJS() : [],
      },
    },
    updater: store => {
      const payload = store.getRootField('addItemsToShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      } else {
        const productPriceEdges = payload.getLinkedRecords('productPrices');

        productPriceEdges.map(productPriceEdge => {
          const id = productPriceEdge.getLinkedRecord('node').getValue('id');

          sharedProductPriceUpdater(store, userId, productPriceEdge, id);
        });

        const stapleShoppingListEdges = payload.getLinkedRecords('stapleShoppingListItems');

        stapleShoppingListEdges.map(stapleShoppingListEdge => {
          const id = stapleShoppingListEdge.getLinkedRecord('node').getValue('id');

          sharedStapleShoppingListUpdater(store, userId, stapleShoppingListEdge, id);
        });
      }
    },
    optimisticUpdater: store => {
      if (productPrices) {
        productPrices.map(productPrice => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(productPrice.get('id'), 'specialId');
          node.setValue(productPrice.get('name'), 'name');
          node.setValue(productPrice.get('priceToDisplay'), 'priceToDisplay');
          node.setValue(productPrice.get('saving'), 'saving');
          node.setValue(productPrice.get('savingPercentage'), 'savingPercentage');
          node.setValue(productPrice.get('imageUrl'), 'imageUrl');
          node.setValue(productPrice.get('storeImageUrl'), 'storeImageUrl');
          node.setValue(productPrice.get('storeName'), 'storeName');
          node.setValue(productPrice.get('comments'), 'comments');
          node.setValue(productPrice.get('offerEndDate'), 'offerEndDate');
          node.setValue(productPrice.get('size'), 'size');

          const productPriceEdge = store.create(uuid(), 'ProductPriceEdge');

          productPriceEdge.setLinkedRecord(node, 'node');
          sharedProductPriceUpdater(store, userId, productPriceEdge);
        });
      }

      if (stapleShoppingListItems) {
        stapleShoppingListItems.map(stapleShoppingListItem => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(stapleShoppingListItem.get('id'), 'stapleShoppingListId');
          node.setValue(stapleShoppingListItem.get('name'), 'name');

          const stapleShoppingListEdge = store.create(uuid(), 'StapleShoppingListEdge');

          stapleShoppingListEdge.setLinkedRecord(node, 'node');
          sharedStapleShoppingListUpdater(store, userId, stapleShoppingListEdge);
        });
      }

      if (newStapleShoppingListNames) {
        newStapleShoppingListNames.map(newStapleShoppingListName => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(uuid(), 'stapleShoppingListId');
          node.setValue(newStapleShoppingListName, 'name');

          const stapleShoppingListEdge = store.create(uuid(), 'StapleShoppingListEdge');

          stapleShoppingListEdge.setLinkedRecord(node, 'node');
          sharedStapleShoppingListUpdater(store, userId, stapleShoppingListEdge);
        });
      }
    },
  });
}

export default { commit };
