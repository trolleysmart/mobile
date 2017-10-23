// @flow

import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { StoreProp } from './PropTypes';

class StoreDetailView extends Component {
  render = () => {
    return (
      <View style={Styles.container}>
        <ScrollView>
          <Image source={{ uri: this.props.store.imageUrl }} resizeMode="cover" style={Styles.storeImage} />
          <View style={Styles.productTitleContainer}>
            <Text style={Styles.productTitle}>{this.props.store.name}</Text>
          </View>
          {/*<Card title="Detail">*/}
          {/*<Text style={Styles.productDescription}>{this.props.product.description}</Text>*/}

          {/*{this.props.store.unitPrice ? (*/}
          {/*<View style={Styles.rowContainer}>*/}
          {/*<Icon style={Styles.icon} color="#bfc4c9" name="md-pricetag" type="ionicon" />*/}
          {/*<Text> Price per unit: </Text>*/}
          {/*<Text style={Styles.unitPrice}>{'$' + this.props.product.unitPrice.price.toFixed(2) + '/' + this.props.product.unitPrice.size}</Text>*/}
          {/*</View>*/}
          {/*) : (*/}
          {/*<View />*/}
          {/*)}*/}
          {/*<View style={Styles.rowContainer}>*/}
          {/*{this.props.product.productPageUrl ? (*/}
          {/*<View>*/}
          {/*<Icon style={Styles.icon} color="#bfc4c9" name="web" type="material-community" />*/}
          {/*<Text style={Styles.link} onPress={() => this.props.handleVisitStorePressed(this.props.product.productPageUrl)}>*/}
          {/*View on web*/}
          {/*</Text>*/}
          {/*</View>*/}
          {/*) : (*/}
          {/*<View />*/}
          {/*)}*/}
          {/*</View>*/}
          {/*</Card>*/}
          <Card title="Store Info">
            <View style={Styles.storeInfoContainer}>
              <View>
                {this.props.store.imageUrl ? <Avatar medium rounded source={{ uri: this.props.store.imageUrl }} activeOpacity={0.7} /> : <View />}
              </View>
              <View style={Styles.storeDetail}>
                <Text>{this.props.store.name}</Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  };
}

StoreDetailView.propTypes = {
  store: StoreProp,
  handleVisitStorePressed: PropTypes.func.isRequired,
};

export default StoreDetailView;
