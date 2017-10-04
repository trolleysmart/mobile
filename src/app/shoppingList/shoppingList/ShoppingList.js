// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import { MainMenuContainer } from '../../../sharedComponents/mainMenu';
import ShoppingListItemsRelayContainer from './ShoppingListItemsRelayContainer';
import HeaderContainer from './HeaderContainer';
import HeaderTitleContainer from './HeaderTitleContainer';

class ShoppingList extends Component {
  static navigationOptions = () => ({
    headerTitle: <HeaderTitleContainer />,
    headerLeft: <MainMenuContainer />,
    headerRight: <HeaderContainer />,
  });

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ShoppingListQuery($count: Int!, $cursor: String, $shoppingListId: ID!) {
            user {
              ...ShoppingListItemsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 30,
          shoppingListId: this.props.shoppingListId,
        }}
        render={({ error, props }) => {
          if (error) {
            return <Text>{error.message}</Text>;
          }

          if (props) {
            return <ShoppingListItemsRelayContainer user={props.user} shoppingListId={this.props.shoppingListId} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

ShoppingList.propTypes = {
  shoppingListId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    shoppingListId: state.localState.getIn(['defaultShoppingList', 'id']),
  };
}

export default connect(mapStateToProps)(ShoppingList);
