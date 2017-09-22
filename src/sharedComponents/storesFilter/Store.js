// @flow

import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Grid } from 'react-native-easy-grid';
import { CheckBox, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
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
            onPress={() => this.props.onStoreSelectionChanged(this.props.id, this.props.name, this.props.isSelected)}
          />
          <Text style={Styles.description} numberOfLines={1}>
            {this.props.name}
          </Text>
        </Grid>
      </TouchableHighlight>
    );
  }
}

Store.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onStoreSelectionChanged: PropTypes.func.isRequired,
};

export default Store;
