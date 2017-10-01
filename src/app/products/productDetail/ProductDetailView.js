// @flow

import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Card, Button, Icon, Avatar } from 'react-native-elements';
// import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-native-elements';
import Styles from './Styles';
import { Color } from '../../../framework/style/DefaultStyles';
import { ProductProp } from './PropTypes';

class ProductDetailView extends Component {
  render = () => {
    return (
      <View style={Styles.container}>
        <ScrollView>
          <Image source={{ uri: this.props.product.imageUrl }} resizeMode="cover" style={Styles.productImage} />
          <View style={Styles.productTitleContainer}>
            <Text style={Styles.productTitle}>{this.props.product.name}</Text>
            <Row>
              <Text style={Styles.priceToDisplay}>${this.props.product.priceToDisplay}</Text>
              <Text style={Styles.savingPercentage}>
                {this.props.product.saving
                  ? 'Save $' + this.props.product.saving.toFixed(2) + '(' + this.props.product.savingPercentage.toFixed(0) + '%)'
                  : ''}
              </Text>
              <Text>{this.props.product.offerEndDate ? this.props.product.offerEndDate + 'day(s) left' : ''}</Text>
            </Row>
          </View>
          <Card title="Detail">
            <Text style={Styles.productDescription}>{this.props.product.description}</Text>
            {this.props.product.size ? (
              <Row>
                <Text>Size: </Text>
                <Text style={Styles.productSize}>{this.props.product.size}</Text>
              </Row>
            ) : (
              <View />
            )}
            {this.props.product.unitPrice ? (
              <Row>
                <Text>Price per unit: </Text>
                <Text style={Styles.unitPrice}>{'$' + this.props.product.unitPrice.price.toFixed(2) + '/' + this.props.product.unitPrice.size}</Text>
              </Row>
            ) : (
              <View />
            )}
            <Button
              icon={{ name: 'web', type: 'material-community' }}
              title="View product on web"
              backgroundColor={Color.secondaryColorAction}
              onPress={() => this.props.handleVisitStorePressed(this.props.product.imageUrl)}
            />
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
                <Icon name="google-maps" type="material-community" />
              </View>
            </View>
          </Card>
        </ScrollView>
        <View style={Styles.addProductContainer}>
          <View style={Styles.productPriceContainer}>
            <Text style={Styles.priceToDisplay}>${this.props.product.priceToDisplay}</Text>
            <Text style={Styles.savingPercentage}>
              {this.props.product.saving
                ? 'Save $' + this.props.product.saving.toFixed(2) + '(' + this.props.product.savingPercentage.toFixed(0) + '%)'
                : ''}
            </Text>
          </View>
          <View>
            <Button title="Add" raised borderRadius={10} backgroundColor={Color.secondaryColorAction} buttonStyle={{}} />
          </View>

          {/*<View>*/}
          {/*<Menu>*/}
          {/*<MenuTrigger>*/}
          {/*<Icon name="dots-vertical" type="material-community" color="white" />*/}
          {/*/!* <Text style={{ color: 'white' }}>Select List</Text> *!/*/}
          {/*</MenuTrigger>*/}
          {/*<MenuOptions>*/}
          {/*<MenuOption onSelect={() => this.props.onEditShoppingListPressed(this.props.shoppingList.id, this.props.shoppingList.name)}>*/}
          {/*<View style={Styles.menuOption}>*/}
          {/*<Text>Shopping List 1</Text>*/}
          {/*</View>*/}
          {/*</MenuOption>*/}
          {/*<MenuOption onSelect={() => this.props.onDeleteShoppingListPressed(this.props.shoppingList.id, this.props.shoppingList.name)}>*/}
          {/*<View style={Styles.menuOption}>*/}
          {/*<Text>Shopping List 2</Text>*/}
          {/*</View>*/}
          {/*</MenuOption>*/}
          {/*</MenuOptions>*/}
          {/*</Menu>*/}
          {/*</View>*/}
        </View>
      </View>
    );
  };
}

ProductDetailView.propTypes = {
  product: ProductProp,
  handleVisitStorePressed: PropTypes.func.isRequired,
};

export default ProductDetailView;
