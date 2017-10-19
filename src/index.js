// @flow

import { configParseServerSdk } from 'micro-business-parse-server-common-react-native';
import React, { Component } from 'react';
import { Alert, Provider } from 'react-redux';
import Config from 'react-native-config';
import { MenuContext } from 'react-native-popup-menu';
import RNRestart from 'react-native-restart';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import Navigation, { reduxStore } from './app/navigation';

const errorHandler = (e, isFatal) => {
  Alert.alert(
    'Unexpected error occurred',
    `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} - ${e.message}

        We will need to restart the app.
        `,
    [
      {
        text: 'Restart',
        onPress: () => {
          RNRestart.Restart();
        },
      },
    ],
  );
};

setJSExceptionHandler(errorHandler);

export default class TrolleySmart extends Component {
  constructor(props, context) {
    super(props, context);

    configParseServerSdk(Config.PARSE_SERVER_URL, Config.PARSE_SERVER_APPLICATION_ID, Config.PARSE_SERVER_JAVASCRIPT_KEY);

    this.state = {
      store: reduxStore,
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <MenuContext>
          <Navigation />
        </MenuContext>
      </Provider>
    );
  }
}
