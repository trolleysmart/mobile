// @flow

import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { CheckBox, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { ProductListRowItem } from '../products';

class ShoppingListItem extends React.PureComponent {
  render() {
    if (this.props.stapleItemId) {
      // Staple item
      return (
        <ListItem
          containerStyle={Styles.stapleItemRow}
          avatar={
            <CheckBox
              style={Styles.stapleItemCheckbox}
              checked={false}
              center
              onPress={() => this.props.onShoppingListItemSelectionChanged(this.props.id)}
            />
          }
          key={this.props.name}
          title={this.props.name}
          onPressRightIcon={() => this.props.onViewProductsPressed(this.props.id)}
        />
      );
    } else {
      return (
        <TouchableHighlight underlayColor="whitesmoke" style={Styles.specialItemRow}>
          <Grid>
            <CheckBox style={Styles.checkbox} checked={false} center onPress={() => this.props.onShoppingListItemSelectionChanged(this.props.id)} />
            <Col size={80}>
              <ProductListRowItem
                id={this.props.id}
                name={this.props.name}
                imageUrl={this.props.imageUrl}
                priceToDisplay={this.props.priceToDisplay}
                store={this.props.store}
                comments={this.props.comments}
                unitPrice={this.props.unitPrice}
                offerEndDate={this.props.offerEndDate}
                size={this.props.size}
                multiBuy={this.props.multiBuy}
                savingPercentage={this.props.savingPercentage}
                saving={this.props.saving}
                isInShoppingList={true}
              />
            </Col>
          </Grid>
        </TouchableHighlight>
      );
    }
  }
}

ShoppingListItem.propTypes = {
  id: PropTypes.string.isRequired,
  stapleItemId: PropTypes.string,
  productPriceId: PropTypes.string,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  priceToDisplay: PropTypes.number,
  store: PropTypes.shape({
    name: PropTypes.number,
    imageUrl: PropTypes.string,
  }),
  unitPrice: PropTypes.shape({
    price: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
  }),
  multiBuy: PropTypes.shape({
    awardQuantity: PropTypes.number.isRequired,
    awardValue: PropTypes.number.isRequired,
  }),
  offerEndDate: PropTypes.string,
  size: PropTypes.string,
  savingPercentage: PropTypes.number,
  saving: PropTypes.number,
  comments: PropTypes.string,
  onShoppingListItemSelectionChanged: PropTypes.func.isRequired,
  onViewProductsPressed: PropTypes.func.isRequired,
};

export default ShoppingListItem;
