// @flow

import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as StapleShoppingListActions from './Actions';
import { AddItemsToShoppingList } from '../relay/mutations';
import { SearchBarWithDelay } from '../searchBarWithDelay';
import Styles from './Styles';
import { TouchableItem } from '../components/touchableIcon';
import { Color } from '../style/DefaultStyles';

class HeaderContainer extends Component {
  onSearchKeywordChanged = searchKeyword => {
    this.props.stapleShoppingListActions.searchKeywordChanged(
      Map({
        searchKeyword,
      }),
    );
  };

  addItemsClicked = () => {
    if (this.props.selectedStapleShoppingListItems.size !== 0) {
      AddItemsToShoppingList.commit(this.props.environment, this.props.userId, {
        newStapleShoppingListNames: this.props.selectedStapleShoppingListItems.filter(_ => _.get('isCustomItem')).map(_ => _.get('name')),
        stapleShoppingListItems: this.props.selectedStapleShoppingListItems.filterNot(_ => _.get('isCustomItem')),
      });

      // Clear the selected staple list
      this.props.stapleShoppingListActions.stapleShoppingListItemSelectionChanged(
        Map({
          selectedStapleShoppingListItems: List(),
        }),
      );
      this.props.gotoShoppingList();
    }
  };

  render = () => {
    return (
      <View style={Styles.searchHeader}>
        <SearchBarWithDelay searchKeyword={this.props.searchKeyword} onSearchKeywordChanged={this.onSearchKeywordChanged} />
        <View style={Styles.addItemsHeaderContainer}>
          <TouchableItem
            accessibilityComponentType="button"
            accessibilityTraits="button"
            delayPressIn={0}
            onPress={this.addItemsClicked}
            pressColor={Color.touchableIconPressColor}
            borderless
            style={Styles.addItemsTouchableContainer}
          >
            <Icon size={30} color={Color.primaryFontColor} name="md-add" type="ionicon" containerStyle={Styles.addItemsIconContainer} />
          </TouchableItem>
        </View>
      </View>
    );
  };
}

HeaderContainer.propTypes = {
  searchKeyword: PropTypes.string,
  stapleShoppingListActions: PropTypes.object.isRequired,
};

HeaderContainer.defaultProps = {
  searchKeyword: '',
  showUserFeedback: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.stapleShoppingList.get('searchKeyword'),
    userId: state.stapleShoppingList.get('userId'),
    selectedStapleShoppingListItems: state.stapleShoppingList.get('selectedStapleShoppingListItems'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stapleShoppingListActions: bindActionCreators(StapleShoppingListActions, dispatch),
    gotoShoppingList: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'ShoppingList',
        }),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
