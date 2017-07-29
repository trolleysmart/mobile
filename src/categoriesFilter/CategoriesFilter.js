// @flow

import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../relay';
import { graphql, QueryRenderer } from 'react-relay';
import { Platform } from 'react-native';
import CategoriesFilterRelayContainer from './CategoriesFilterRelayContainer';

class CategoriesFilter extends Component {
  static navigationOptions = {
    title: 'Categories',
    headerTitleStyle: {
      marginLeft: Platform.OS === 'ios' ? null : 80,
    },
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query CategoriesFilterQuery($count: Int!, $cursor: String) {
            viewer {
              ...CategoriesFilterRelayContainer_viewer
            }
          }
        `}
        variables={{
          cursor: null,
          count: 100,
        }}
        render={({ error, props }) => {
          if (error) {
            return (
              <Text>
                {error.message}
              </Text>
            );
          }

          if (props) {
            return <CategoriesFilterRelayContainer viewer={props.viewer} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

CategoriesFilter.propTypes = {};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CategoriesFilter);
