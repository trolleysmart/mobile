// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Text } from 'react-native-elements';
import Styles from './Styles';

const SplashPresentational = ({ messageToDisplay }) => (
  <Grid style={Styles.grid}>
    <Row>
      <Col>
        <ActivityIndicator
          size="large"
          color="#3b5998"
          style={Styles.activityIndicator}
        />
        <Text>{messageToDisplay}</Text>
      </Col>
    </Row>
  </Grid>
);

SplashPresentational.propTypes = {
  messageToDisplay: PropTypes.string,
};

SplashPresentational.defaultProps = {
  messageToDisplay: '',
};

export default SplashPresentational;
