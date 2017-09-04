// @flow

import React from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import MainStyles from '../style/DefaultStyles';

function daysBetween(date1, date2) {
  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;

  // Convert back to days and return
  return Math.round(difference_ms / one_day);
}

function getExpiryDaysLeft(offerEndDate) {
  if (!offerEndDate) {
    return '';
  }

  const date = new Date(offerEndDate);

  return daysBetween(new Date(), date);
}

function getItemSubTitle(offerEndDate, multiBuy, unitPrice) {
  let subTitleItems = [];

  if (offerEndDate) {
    subTitleItems.push(getExpiryDaysLeft(offerEndDate) + 'd left');
  }

  if (multiBuy) {
    subTitleItems.push('Min:' + multiBuy.awardQuantity.toString());
  }

  if (unitPrice) {
    subTitleItems.push('$' + unitPrice.price.toFixed(2) + '/' + unitPrice.size);
  }

  return subTitleItems.join('|');
}

class ProductListRowItem extends React.PureComponent {
  render() {
    return (
      <Grid>
        <Col size={20}>
          {this.props.imageUrl
            ? <FastImage style={Styles.productImage} resizeMode={FastImage.resizeMode.stretch} source={{ uri: this.props.imageUrl }} />
            : <View />}
        </Col>
        <Col size={80}>
          <Row>
            <Col size={70}>
              <Text style={MainStyles.primaryFont} numberOfLines={2}>
                {this.props.name}
              </Text>
            </Col>
            <Col size={30}>
              <Text style={Styles.productSize}>
                {this.props.size}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col size={70}>
              <Text style={Styles.subTitle} numberOfLines={1}>
                {getItemSubTitle(this.props.offerEndDate, this.props.multiBuy, this.props.unitPrice)}
              </Text>
            </Col>
            <Col size={30}>
              <Text style={Styles.priceToDisplay}>
                {this.props.priceToDisplay ? '$' + this.props.priceToDisplay.toFixed(2) : ''}
              </Text>
            </Col>
          </Row>

          <Row>
            <Col size={60}>
              <Row>
                <Col size={15}>
                  {this.props.storeImageUrl
                    ? <FastImage style={Styles.storeImage} resizeMode={FastImage.resizeMode.stretch} source={{ uri: this.props.storeImageUrl }} />
                    : <View />}
                </Col>
                <Col size={85}>
                  <Text style={Styles.storeName} numberOfLines={1}>
                    {this.props.storeName}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col size={40}>
              {this.props.savingPercentage
                ? <View style={Styles.pricing}>
                    <Text style={Styles.savingPercentage} numberOfLines={1}>
                      Save ${this.props.saving ? this.props.saving.toFixed(2) : ''}({this.props.savingPercentage.toFixed(0)}%){' '}
                    </Text>
                  </View>
                : <Text />}
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}

ProductListRowItem.propTypes = {
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
};

export default ProductListRowItem;
