// @flow

import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {
  Card,
  Button,
  Icon,
} from 'react-native-elements';
// import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import Styles from './Styles';
import {
  Color,
} from '../../../framework/style/DefaultStyles';

class ProductDetail extends Component {
  render = () => {
    return (
      <View style={Styles.container}>
        <ScrollView>
          <Image source={require('../../../../assets/Cadbury-Treat.jpg')} resizeMode="cover" style={Styles.productImage} />
          <View style={Styles.productTitleContainer}>
            <Text style={Styles.productTitle}>Cadbury Treat Size Individually Wrapped Crunchie Sharepack 180g bag 12pk</Text>
          </View>
          <Card title="Detail" >
            <Text style={{ marginBottom: 10 }}>
      The idea with React Native Elements is more about component structure than actual design.
    </Text>
            <Button title='View product site'></Button>
          </Card>
          <Card title="Store Info" >
            <Text>Countdown - Riccarton</Text>
            <Text>View on map</Text>
            <Text>Visit Store</Text>
          </Card>
        </ScrollView>
        <View style={Styles.addProductContainer}>
          <View style={Styles.productPriceContainer}>
            <Text style={Styles.productSpecialPrice}>$3.5</Text>
            <Text style={Styles.productPrice}>$5.5</Text>
          </View>
          <View>
            <Button title='Add to <my list..>' raised borderRadius={2} backgroundColor={Color.secondaryColorAction} buttonStyle={{ }}/>
          </View>

          <View>
            <Menu>
              <MenuTrigger>
                <Icon name="dots-vertical" type="material-community" color='white' />
                {/* <Text style={{ color: 'white' }}>Select List</Text> */}
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => this.props.onEditShoppingListPressed(this.props.shoppingList.id, this.props.shoppingList.name)}>
                  <View style={Styles.menuOption}>
                    <Text>Shopping List 1</Text>
                  </View>
                </MenuOption>
                <MenuOption onSelect={() => this.props.onDeleteShoppingListPressed(this.props.shoppingList.id, this.props.shoppingList.name)}>
                  <View style={Styles.menuOption}>
                    <Text>Shopping List 2</Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
    );
  };
}

export default ProductDetail;
