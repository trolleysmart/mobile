// @flow

import React from 'react';
import {
  View,
} from 'react-native';
import {
  Col,
  Grid,
} from 'react-native-easy-grid';
import {
  Text,
  Icon,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles from './Styles';
import {
  TouchableItem,
} from '../components/touchableIcon';
import {
  Color,
} from '../style/DefaultStyles';

class StapleShoppingListItem extends React.PureComponent {
  onItemPressed = () => {
    const toast = this.props.onStapleShoppingListItemAdded(this.props.id, this.props.name, this.props.isCustomItem);

    toast.show(this.props.name + ' has been added');
  };

  render() {
    return (
      <Grid style={Styles.row}>
        <Col size={10}>
          <View>
            <TouchableItem
              accessibilityComponentType="button"
              accessibilityTraits="button"
              testID="header-filter"
              delayPressIn={0}
              pressColor={Color.touchableIconPressColor}
              onPress={this.onItemPressed}
            >
              <Icon size={28} name="md-add-circle" type="ionicon" color={Color.primaryColorNormal} />
            </TouchableItem>
          </View>
        </Col>
        <Col size={90}>
          <Text style={Styles.itemName} onPress={this.onItemPressed}>
            {this.props.name}
          </Text>
        </Col>
        {this.props.isCustomItem
          ? <Col size={8}>
              <Icon name="fiber-new" type="material" />
            </Col>
          : <View />}
      </Grid>
    );
  }
}

StapleShoppingListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isCustomItem: PropTypes.bool,
  onStapleShoppingListItemAdded: PropTypes.func.isRequired,
};

StapleShoppingListItem.defaultProps = {
  isCustomItem: false,
};

export default StapleShoppingListItem;
