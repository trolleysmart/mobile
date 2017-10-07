// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { environment } from '../../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import { MainMenuContainer } from '../../../sharedComponents/mainMenu';
import ShoppingListItemsRelayContainer from './ShoppingListItemsRelayContainer';
import HeaderContainer from './HeaderContainer';
import HeaderTitleContainer from './HeaderTitleContainer';
import { LoadingInProgress } from '../../../sharedComponents/loadingInProgress';

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
          count: 1000,
          shoppingListId: this.props.shoppingListId,
        }}
        render={({ error, props }) => {
          if (error || props) {
            return <ShoppingListItemsRelayContainer errorMessage={error} user={props.user} shoppingListId={this.props.shoppingListId} />;
          }

          return <LoadingInProgress />;
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
