// @flow

import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import SpecialItem from './SpecialItem';

class SpecialItemRow extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        style={Styles.specialItemRow}
      >
        <Grid>
          <CheckBox
            style={Styles.checkbox}
            checked={this.props.isInShoppingList}
            right
            onPress={() =>
              this.props.onSpecialItemSelectionChanged(
                this.props.id,
                this.props.isInShoppingList,
              )}
          />
          <Col size={80}>
            <SpecialItem
              id={this.props.id}
              name={this.props.name}
              imageUrl={this.props.imageUrl}
              priceToDisplay={this.props.priceToDisplay}
              storeImageUrl={this.props.storeImageUrl}
              storeName={this.props.storeName}
              comments={this.props.comments}
              unitPrice={this.props.unitPrice}
              offerEndDate={this.props.offerEndDate}
              size={this.props.size}
              multiBuy={this.props.multiBuy}
              savingPercentage={this.props.savingPercentage}
              saving={this.props.saving}
            />
          </Col>
        </Grid>
      </TouchableHighlight>
    );
  }
}

SpecialItemRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  priceToDisplay: PropTypes.number,
  savingPercentage: PropTypes.number,
  saving: PropTypes.number,
  storeImageUrl: PropTypes.string,
  storeName: PropTypes.string,
  comments: PropTypes.string,
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
  isInShoppingList: PropTypes.bool.isRequired,
  onSpecialItemSelectionChanged: PropTypes.func.isRequired,
};

export default SpecialItemRow;
