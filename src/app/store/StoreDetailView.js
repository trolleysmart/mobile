// @flow

import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { StoreProp } from './PropTypes';

class StoreDetailView extends Component {
  render = () => {
    return (
      <View style={Styles.container}>
        <ScrollView>
          <View style={Styles.storeInfoHeaderContainer}>
            {/*<View style={Styles.storeDetail}>*/}
              <View>
                {this.props.store.imageUrl ?
                  <Avatar large rounded source={{ uri: this.props.store.imageUrl }} activeOpacity={0.7} />
                  : <Avatar large rounded title={this.props.store.name} activeOpacity={0.7} />}
              </View>
              <Text style={Styles.storeName}>{this.props.store.name}</Text>
            {/*</View>*/}
          </View>
          <Card title="Store Contact">
            <View style={Styles.storeInfoContainer}>
              <View style={Styles.storeInfoRow}>
                <Icon size={32} name='location-city' type='material'/>
                <Text style={Styles.storeInfoRowText}>{this.props.store.address ? this.props.store.address : '4 Not Real Street, Christchurch'}</Text>
              </View>
              <View style={Styles.storeInfoRow}>
                <Icon size={32} name='phone' type='material-community'/>
                <Text style={Styles.storeInfoRowText}>03-345-8745</Text>
              </View>
            </View>
          </Card>
          <Card title="Opening Hours">
            <View style={Styles.storeInfoContainer}>
              <View style={Styles.storeInfoRow}>
                <Icon size={32} name='ios-clock-outline' type='ionicon'/>
                <Text style={Styles.storeInfoRowText}>Mon - Sat, 9am - 5pm</Text>
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
