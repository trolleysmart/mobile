// @flow

import {
  Map,
} from 'immutable';
import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  NavigationActions,
} from 'react-navigation';
import {
  bindActionCreators,
} from 'redux';
import {
  View,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import {
  Icon,
} from 'react-native-elements';
import * as StapleShoppingListActions from './Actions';
import {
  SearchBarWithDelay,
} from '../searchBarWithDelay';
import Styles from './Styles';
import {
  TouchableItem,
} from '../components/touchableIcon';
import {
  Color,
} from '../style/DefaultStyles';

class HeaderContainer extends Component {
  onSearchKeywordChanged = searchKeyword => {
    this.props.stapleShoppingListActions.searchKeywordChanged(
      Map({
        searchKeyword,
      }),
    );
  };

  addItemsClicked = () => {
    this.props.showUserFeedback();
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stapleShoppingListActions: bindActionCreators(StapleShoppingListActions, dispatch),
    // showUserFeedback: () =>
    //   dispatch(
    //     NavigationActions.navigate({
    //       routeName: 'StapleShoppingListUserFeedback',
    //     }),
    //   ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
