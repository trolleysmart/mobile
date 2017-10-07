// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import StapleItemsRelayContainer from './StapleItemsRelayContainer';
import HeaderContainer from './HeaderContainer';
import { LoadingInProgress } from '../../sharedComponents/loadingInProgress';

class StapleItems extends Component {
  static navigationOptions = {
    headerTitle: <HeaderContainer environment={environment} />,
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query StapleItemsQuery($count: Int!, $cursor: String, $searchKeyword: String) {
            user {
              ...StapleItemsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 1000,
          searchKeyword: this.props.searchKeyword,
        }}
        render={({ error, props }) => {
          if (error) {
            return <Text>{error.message}</Text>;
          }

          if (props) {
            return <StapleItemsRelayContainer user={props.user} shoppingList={this.props.shoppingList} />;
          } else {
            return <LoadingInProgress />;
          }
        }}
      />
    );
  }
}

StapleItems.propTypes = {
  searchKeyword: PropTypes.string,
};

function mapStateToProps(state, props) {
  return {
    searchKeyword: state.stapleItems.get('searchKeyword'),
    shoppingList: { id: props.navigation.state.params.shoppingListId },
  };
}

export default connect(mapStateToProps)(StapleItems);
