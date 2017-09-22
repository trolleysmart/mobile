// @flow

import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import { Platform } from 'react-native';
import StoresFilterRelayContainer from './StoresFilterRelayContainer';

class StoresFilter extends Component {
  static navigationOptions = {
    title: 'Stores',
    headerTitleStyle: {
      marginLeft: Platform.OS === 'ios' ? null : 100,
    },
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query StoresFilterQuery($count: Int!, $cursor: String) {
            viewer {
              ...StoresFilterRelayContainer_viewer
            }
          }
        `}
        variables={{
          cursor: null,
          count: 100,
        }}
        render={({ error, props }) => {
          if (error) {
            return <Text>{error.message}</Text>;
          }

          if (props) {
            return <StoresFilterRelayContainer viewer={props.viewer} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

StoresFilter.propTypes = {};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(StoresFilter);
