// @flow

import { configParseServerSdk } from 'micro-business-parse-server-common-react-native';
import React, { Component } from 'react';
import { Alert, Provider } from 'react-redux';
import { MenuContext } from 'react-native-popup-menu';
import RNRestart from 'react-native-restart';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import Navigation, { reduxStore } from './app/navigation';
import Config from './framework/config';

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

    configParseServerSdk(Config.parseServerServerUrl, Config.parseServerApplicationId, Config.parseServerJavascriptKey);

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
