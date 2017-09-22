// @flow

import { commitMutation, graphql } from 'react-relay';
import * as messageBarActions from '../../../sharedComponents/messageBar/Actions';
import { MessageType } from '../../../sharedComponents/messageBar';
import { reduxStore } from '../../../app/navigation';

const mutation = graphql`
  mutation SubmitUserFeedbackMutation($input: SubmitUserFeedbackInput!) {
    submitUserFeedback(input: $input) {
      errorMessage
    }
  }
`;

function commit(environment, feedback) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        feedback: feedback.toJS(),
      },
    },
    updater: store => {
      const payload = store.getRootField('submitUserFeedback');
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
