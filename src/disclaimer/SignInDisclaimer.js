// @flow

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Disclaimer from './Disclaimer';
import Styles from './Styles';

const SignInDisclaimer = ({ gotoSignIn }) =>
  <View style={Styles.container}>
    <Disclaimer />
    <Button
      backgroundColor="#649A59"
      raised
      title="OK"
      onPress={() => gotoSignIn()}
    />
  </View>;

export default SignInDisclaimer;
