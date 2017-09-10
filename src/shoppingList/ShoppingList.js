// @flow

import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { environment } from '../relay';
import { graphql, QueryRenderer } from 'react-relay';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoppingListItemsRelayContainer from './ShoppingListItemsRelayContainer';
import HeaderContainer from './HeaderContainer';
import { Color } from '../style/DefaultStyles';

class ShoppingList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Shopping List',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} size={26} style={{ color: tintColor }} />,
    headerLeft: <HeaderContainer />,
    headerStyle: {
      backgroundColor: Color.primaryColorNormal,
    },
    title: 'Trolley Smart',
    headerTitleStyle: {
      marginLeft: Platform.OS === 'ios' ? null : 70,
    },
    headerBackTitle: null,
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ShoppingListQuery($count: Int!, $cursor: String) {
            user {
              ...ShoppingListItemsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 30,
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
            return <ShoppingListItemsRelayContainer user={props.user} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

ShoppingList.propTypes = {};

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
