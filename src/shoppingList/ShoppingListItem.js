// @flow

import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { CheckBox, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { ShoppingListItemProp } from './PropTypes';
import Styles from './Styles';
import { ProductListRowItem } from '../products';

class ShoppingListItem extends React.PureComponent {
  render() {
    if (this.props.shoppingListItem.stapleItemId) {
      // Staple item
      return (
        <ListItem
          containerStyle={Styles.stapleItemRow}
          avatar={
            <CheckBox
              style={Styles.stapleItemCheckbox}
              checked={false}
              center
              onPress={() => this.props.onShoppingListItemSelectionChanged(this.props.shoppingListItem)}
            />
          }
          key={this.props.shoppingListItem.name}
          title={this.props.shoppingListItem.name}
          onPressRightIcon={() => this.props.onViewProductsPressed(this.props.shoppingListItem.id)}
        />
      );
    } else {
      return (
        <TouchableHighlight underlayColor="whitesmoke" style={Styles.specialItemRow}>
          <Grid>
            <CheckBox
              style={Styles.checkbox}
              checked={false}
              center
              onPress={() => this.props.onShoppingListItemSelectionChanged(this.props.shoppingListItem)}
            />
            <Col size={80}>
              <ProductListRowItem product={this.props.shoppingListItem} isInShoppingList={true} />
            </Col>
          </Grid>
        </TouchableHighlight>
      );
    }
  }
}

ShoppingListItem.propTypes = {
  shoppingListItem: ShoppingListItemProp,
  onShoppingListItemSelectionChanged: PropTypes.func.isRequired,
  onViewProductsPressed: PropTypes.func.isRequired,
};

export default ShoppingListItem;
