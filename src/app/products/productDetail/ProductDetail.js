// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { environment } from '../../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import ProductDetailRelayContainer from './ProductDetailRelayContainer';

class ProductDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? (navigation.state.params.productName ? navigation.state.params.productName : '') : '',
  });

  componentDidMount = () => {
    this.props.navigation.setParams({
      title: this.props.productName,
    });
  };

  render = () => {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ProductDetailQuery($productId: ID!) {
            user {
              ...ProductDetailRelayContainer_user
            }
          }
        `}
        variables={{
          productId: this.props.productId,
        }}
        render={({ error, props }) => {
          if (error) {
            return <Text>{error.message}</Text>;
          }

          if (props) {
            return <ProductDetailRelayContainer user={props.user} productId={this.props.productId} />;
          } else {
            return <Text>Loading</Text>;
          }
        }}
      />
    );
  };
}

ProductDetail.propTypes = {
  productId: PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
  return {
    productId: props.navigation.state.params.productId,
  };
}

export default connect(mapStateToProps)(ProductDetail);
