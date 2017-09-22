// @flow

import React, { Component } from 'react';
import Disclaimer from './Disclaimer';
import { MainMenuContainer } from '../../sharedComponents/mainMenu';

class DisclaimerContainer extends Component {
  static navigationOptions = {
    headerLeft: <MainMenuContainer />,
  };

  render = () => {
    return <Disclaimer />;
  };
}

export default DisclaimerContainer;
