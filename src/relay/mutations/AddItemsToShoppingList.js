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

function sharedUpdater(store, userId, shoppingListItemsEdge, id) {
  const userProxy = store.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'ShoppingListItems_shoppingListItems');

  if (id) {
    ConnectionHandler.deleteNode(connection, id);
  }

  ConnectionHandler.insertEdgeAfter(connection, shoppingListItemsEdge);
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
        const shoppingListItemsEdges = payload.getLinkedRecords('shoppingListItems');

        shoppingListItemsEdges.map(shoppingListItemsEdge => {
          const id = shoppingListItemsEdge.getLinkedRecord('node').getValue('id');

          sharedUpdater(store, userId, shoppingListItemsEdge, id);
        });
      }
    },
    optimisticUpdater: store => {
      if (productPrices) {
        productPrices.map(productPrice => {
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
          sharedUpdater(store, userId, shoppingListItemEdge);
        });
      }

      if (stapleShoppingListItems) {
        stapleShoppingListItems.map(stapleShoppingListItem => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(stapleShoppingListItem.get('id'), 'stapleItemId');
          node.setValue(stapleShoppingListItem.get('name'), 'name');

          const shoppingListItemEdge = store.create(uuid(), 'ShoppingListItemEdge');

          shoppingListItemEdge.setLinkedRecord(node, 'node');
          sharedUpdater(store, userId, shoppingListItemEdge);
        });
      }

      if (newStapleShoppingListNames) {
        newStapleShoppingListNames.map(newStapleShoppingListName => {
          const id = uuid();
          const node = store.create(id, 'item');

          node.setValue(id, 'id');
          node.setValue(uuid(), 'stapleItemId');
          node.setValue(newStapleShoppingListName, 'name');

          const shoppingListItemEdge = store.create(uuid(), 'ShoppingListItemEdge');

          shoppingListItemEdge.setLinkedRecord(node, 'node');
          sharedUpdater(store, userId, shoppingListItemEdge);
        });
      }
    },
  });
}

export default { commit };
