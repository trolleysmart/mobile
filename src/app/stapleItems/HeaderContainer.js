// @flow

import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as StapleItemsActions from './Actions';
import { AddItemsToShoppingList } from '../../framework/relay/mutations';
import { SearchBarWithDelay } from '../../sharedComponents/searchBarWithDelay';
import Styles from './Styles';
import { TouchableItem } from '../../components/touchableIcon';
import { Color } from '../../framework/style/DefaultStyles';

class HeaderContainer extends Component {
  onSearchKeywordChanged = searchKeyword => {
    this.props.stapleItemsActions.searchKeywordChanged(Map({ searchKeyword }));
  };

  addItemsClicked = () => {
    if (this.props.selectedStapleShoppingListItems.size !== 0) {
      AddItemsToShoppingList.commit(this.props.environment, this.props.userId, this.props.shoppingList.id, {
        newStapleItemNames: this.props.selectedStapleShoppingListItems.filter(_ => _.get('isCustomItem')).map(_ => _.get('name')),
        stapleItems: this.props.selectedStapleShoppingListItems.filterNot(_ => _.get('isCustomItem')),
      });

      // Clear the selected staple list
      this.props.stapleItemsActions.stapleShoppingListItemSelectionChanged(Map({ selectedStapleShoppingListItems: List() }));
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
  stapleItemsActions: PropTypes.object.isRequired,
  shoppingList: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

HeaderContainer.defaultProps = {
  searchKeyword: '',
  showUserFeedback: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.stapleItems.get('searchKeyword'),
    userId: state.stapleItems.get('userId'),
    selectedStapleShoppingListItems: state.stapleItems.get('selectedStapleShoppingListItems'),
    shoppingList: state.stapleItems.get('shoppingList').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stapleItemsActions: bindActionCreators(StapleItemsActions, dispatch),
    gotoShoppingList: () => dispatch(NavigationActions.back()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
