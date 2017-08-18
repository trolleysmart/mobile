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
      products {
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
      stapleShoppingListItems {
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

function sharedProductUpdater(store, userId, productEdge, id) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingList_shoppingList');

  if (id) {
    ConnectionHandler.deleteNode(connection, id);
  }

  ConnectionHandler.insertEdgeAfter(connection, productEdge);
}

function sharedStapleShoppingListUpdater(store, userId, stapleShoppingListEdge, id) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingList_shoppingList');

  if (id) {
    ConnectionHandler.deleteNode(connection, id);
  }

  ConnectionHandler.insertEdgeAfter(connection, stapleShoppingListEdge);
}

function commit(environment, userId, { products, stapleShoppingListItems, newStapleShoppingListNames }) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        productIds: products ? products.map(product => product.get('id')).toJS() : [],
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
        const productEdges = payload.getLinkedRecords('products');

        productEdges.map(productEdge => {
          const id = productEdge.getLinkedRecord('node').getValue('id');

          sharedProductUpdater(store, userId, productEdge, id);
        });

        const stapleShoppingListEdges = payload.getLinkedRecords('stapleShoppingListItems');

        stapleShoppingListEdges.map(stapleShoppingListEdge => {
          const id = stapleShoppingListEdge.getLinkedRecord('node').getValue('id');

          sharedStapleShoppingListUpdater(store, userId, stapleShoppingListEdge, id);
        });
      }
    },
    optimisticUpdater: store => {
      if (products) {
        products.map(product => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(product.get('id'), 'specialId');
          node.setValue(product.get('name'), 'name');
          node.setValue(product.get('priceToDisplay'), 'priceToDisplay');
          node.setValue(product.get('saving'), 'saving');
          node.setValue(product.get('savingPercentage'), 'savingPercentage');
          node.setValue(product.get('imageUrl'), 'imageUrl');
          node.setValue(product.get('storeImageUrl'), 'storeImageUrl');
          node.setValue(product.get('storeName'), 'storeName');
          node.setValue(product.get('comments'), 'comments');
          node.setValue(product.get('offerEndDate'), 'offerEndDate');
          node.setValue(product.get('size'), 'size');

          const productEdge = store.create(uuid(), 'SpecialEdge');

          productEdge.setLinkedRecord(node, 'node');
          sharedProductUpdater(store, userId, productEdge);
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
