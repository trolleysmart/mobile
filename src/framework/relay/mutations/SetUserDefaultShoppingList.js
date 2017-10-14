// @flow

import { commitMutation, graphql } from 'react-relay';
import { MessageType } from 'micro-business-common-react-native';
import * as messageBarActions from 'micro-business-common-react-native/src/messageBar/Actions';
import { reduxStore } from '../../../app/navigation';

const mutation = graphql`
  mutation SetUserDefaultShoppingListMutation($input: SetUserDefaultShoppingListInput!) {
    setUserDefaultShoppingList(input: $input) {
      errorMessage
    }
  }
`;

function commit(environment, shoppingListId) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        shoppingListId,
      },
    },
    updater: store => {
      const payload = store.getRootField('setUserDefaultShoppingList');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      }
    },
  });
}

export default {
  commit,
};
