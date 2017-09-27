// @flow

import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Grid } from 'react-native-easy-grid';
import { CheckBox, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { StoreItemProp } from './PropTypes';
import Styles from './Styles';

class Store extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight underlayColor="whitesmoke" style={Styles.row}>
        <Grid>
          <CheckBox
            style={Styles.checkbox}
            checked={this.props.isSelected}
            right
            onPress={() =>
              this.props.onStoreSelectionChanged(this.props.store.id, this.props.store.key, this.props.store.name, this.props.isSelected)}
          />
          <Text style={Styles.description} numberOfLines={1}>
            {this.props.store.name}
          </Text>
        </Grid>
      </TouchableHighlight>
    );
  }
}

Store.propTypes = {
  store: StoreItemProp,
  isSelected: PropTypes.bool.isRequired,
  onStoreSelectionChanged: PropTypes.func.isRequired,
};

export default Store;
