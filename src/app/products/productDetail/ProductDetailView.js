// @flow

import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Card, Icon, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { Color } from '../../../framework/style/DefaultStyles';
import { ProductProp } from './PropTypes';
import { TouchableIcon } from '../../../components/touchableIcon';

class ProductDetailView extends Component {
  render = () => {
    return (
      <View style={Styles.container}>
        <ScrollView>
          <Image source={{ uri: this.props.product.imageUrl }} resizeMode="cover" style={Styles.productImage} />
          <View style={Styles.productTitleContainer}>
            <Text style={Styles.productTitle}>{this.props.product.name}</Text>
            <View style={Styles.rowContainer}>
              <Text style={Styles.priceToDisplay}>${this.props.product.priceToDisplay.toFixed(2)}</Text>
              <Text style={Styles.savingPercentageSmall}>
                {this.props.product.saving
                  ? 'Save $' + this.props.product.saving.toFixed(2) + '(' + this.props.product.savingPercentage.toFixed(0) + '%)'
                  : ''}
              </Text>
              <Text>{this.props.product.offerEndDate ? this.props.product.offerEndDate + 'day(s) left' : ''}</Text>
            </View>
          </View>
          <Card title="Detail">
            <Text style={Styles.productDescription}>{this.props.product.description}</Text>
            {this.props.product.size ? (
              <View style={Styles.rowContainer}>
                <Icon style={Styles.icon} color="#bfc4c9" name="weight" type="material-community" />
                <Text>Size: </Text>
                <Text style={Styles.productSize}>{this.props.product.size}</Text>
              </View>
            ) : (
              <View />
            )}
            {this.props.product.unitPrice ? (
              <View style={Styles.rowContainer}>
                <Icon style={Styles.icon} color="#bfc4c9" name="md-pricetag" type="ionicon" />
                <Text> Price per unit: </Text>
                <Text style={Styles.unitPrice}>{'$' + this.props.product.unitPrice.price.toFixed(2) + '/' + this.props.product.unitPrice.size}</Text>
              </View>
            ) : (
              <View />
            )}
            <View style={Styles.rowContainer}>
              <Icon style={Styles.icon} color="#bfc4c9" name="web" type="material-community" />
              <Text style={Styles.link} onPress={() => this.props.handleVisitStorePressed(this.props.product.productPageUrl)}>
                View on web
              </Text>
            </View>
          </Card>
          <Card title="Store Info">
            <View style={Styles.storeInfoContainer}>
              <View>
                {this.props.product.store && this.props.product.store.imageUrl ? (
                  <Avatar medium rounded source={{ uri: this.props.product.store.imageUrl }} activeOpacity={0.7} />
                ) : (
                  <Avatar medium rounded icon={{ name: 'user' }} activeOpacity={0.7} />
                )}
              </View>
              <View style={Styles.storeDetail}>
                <Text>{this.props.product.store ? this.props.product.store.name : ''}</Text>
                {/*<Icon name="google-maps" type="material-community" />*/}
              </View>
            </View>
          </Card>
        </ScrollView>
        <View style={Styles.addProductContainer}>
          <View style={Styles.productPriceContainer}>
            <Text style={Styles.priceToDisplay}>${this.props.product.priceToDisplay.toFixed(2)}</Text>
            <Text style={Styles.savingPercentage}>
              {this.props.product.saving
                ? 'Save $' + this.props.product.saving.toFixed(2) + '(' + this.props.product.savingPercentage.toFixed(0) + '%)'
                : ''}
            </Text>
          </View>
          <View>
            <TouchableIcon
              iconName="plus-circle"
              iconType="material-community"
              iconColor={Color.secondaryColorAction}
              iconSize={40}
              onPress={() => this.props.onAddProductPressed(this.props.product.id)}
            />
            {/*<Button*/}
            {/*icon={{name: 'plus'}}*/}
            {/*title='Add'*/}
            {/*large={false}*/}
            {/*raised*/}
            {/*borderRadius={10}*/}
            {/*backgroundColor={Color.secondaryColorAction}*/}
            {/*// buttonStyle={Styles.addButton}*/}
            {/*/>*/}
          </View>
        </View>
      </View>
    );
  };
}

ProductDetailView.propTypes = {
  product: ProductProp,
  handleVisitStorePressed: PropTypes.func.isRequired,
  onAddProductPressed: PropTypes.func.isRequired,
};

export default ProductDetailView;
