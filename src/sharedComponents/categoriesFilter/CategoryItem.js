// @flow

import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Grid } from 'react-native-easy-grid';
import { CheckBox, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { CategoryItemProp } from './PropTypes';

class CategoryItem extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight underlayColor="whitesmoke" style={Styles.row}>
        <Grid>
          <CheckBox
            style={Styles.checkbox}
            checked={this.props.isSelected}
            right
            onPress={() =>
              this.props.onCategoryItemSelectionChanged(
                this.props.category.id,
                this.props.category.key,
                this.props.category.name,
                this.props.isSelected,
              )}
          />
          <Text style={Styles.description} numberOfLines={1}>
            {this.props.category.name}
          </Text>
        </Grid>
      </TouchableHighlight>
    );
  }
}

CategoryItem.propTypes = {
  category: CategoryItemProp,
  isSelected: PropTypes.bool.isRequired,
  onCategoryItemSelectionChanged: PropTypes.func.isRequired,
};

export default CategoryItem;
