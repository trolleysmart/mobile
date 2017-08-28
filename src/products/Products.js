// @flow

import React, {
  Component,
} from 'react';
import {
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
} from 'react-native-elements';
import {
  connect,
} from 'react-redux';
import {
  environment,
} from '../relay';
import {
  graphql,
  QueryRenderer,
} from 'react-relay';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductsRelayContainer from './ProductsRelayContainer';
// import HeaderContainer from './HeaderContainer';

class Products extends Component {
  static navigationOptions = ({
    navigation,
  }) => ({
    title: navigation.state.params ? 'Products for ' + navigation.state.params.title : '',
    headerTitleStyle: {
      marginLeft: Platform.OS === 'ios' ? null : 100,
    },
  })

  componentDidMount = () => {
    this.props.navigation.setParams({
      title: this.props.searchKeyword,
    })
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ProductsQuery($count: Int!, $cursor: String, $searchKeyword: String, $sortOption: String, $categories: [ID], $stores: [ID]) {
            user {
              ...ProductsRelayContainer_user
            }
          }
        `}
        variables={{
          cursor: null,
          count: 30,
          searchKeyword: this.props.searchKeyword,
          sortOption: this.props.sortOption,
          categories: this.props.categories,
          stores: this.props.stores,
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
            return <ProductsRelayContainer user={props.user} />;
    }
    else {
      return <Text>Loading...</Text>;
    }
  }
}
/>
);
}
}

Products.propTypes = {
  searchKeyword: PropTypes.string,
  sortOption: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  stores: PropTypes.arrayOf(PropTypes.string),
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.products.get('searchKeyword'),
    sortOption: state.products.get('filterOptions')
      .get('sortOption'),
    categories: state.products.get('filterOptions')
      .get('categories')
      .isEmpty() ?
      null : state.products.get('filterOptions')
      .get('categories')
      .map(_ => _.get('id')),
    stores: state.products.get('filterOptions')
      .get('stores')
      .isEmpty() ?
      null : state.products.get('filterOptions')
      .get('stores')
      .map(_ => _.get('id')),
  };
}

export default connect(mapStateToProps)(Products);
