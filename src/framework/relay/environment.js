// @flow

import { UserService } from 'micro-business-parse-server-common-react-native';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import config from '../config';

const fetchQuery = async (operation, variables) => {
  const sessionToken = await UserService.getCurrentUserSession();
  const response = await fetch(config.graphqlEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: sessionToken,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

    const result = await response.json();

    console.log(operation.text);
    console.log(variables);
    console.log(result);

  return result;
};

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());
const environment = new Environment({
  network,
  store,
});

export default environment;
