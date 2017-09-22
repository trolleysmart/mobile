// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import StapleShoppingListItemsRelayContainer from './StapleShoppingListItemsRelayContainer';
import HeaderContainer from './HeaderContainer';

class StapleShoppingList extends Component {
  static navigationOptions = {
    headerTitle: <HeaderContainer environment={environment} />,
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query StapleShoppingListQuery($count: Int!, $cursor: String, $searchKeyword: String) {
            user {
              ...StapleShoppingListItemsRelayContainer_user
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
            return <StapleShoppingListItemsRelayContainer user={props.user} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  }
}

StapleShoppingList.propTypes = {
  searchKeyword: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.stapleShoppingList.get('searchKeyword'),
  };
}

export default connect(mapStateToProps)(StapleShoppingList);
