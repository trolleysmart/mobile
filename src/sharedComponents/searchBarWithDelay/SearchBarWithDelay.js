// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import debounce from 'lodash.debounce';
import Styles from './Styles';

class SearchBarWithDelay extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchKeyword: props.searchKeyword,
    };

    this.onSearchKeywordChanged = debounce(this.props.onSearchKeywordChanged, 300);
  }

  searchKeywordChanged = searchKeyword => {
    this.setState(
      {
        searchKeyword,
      },
      () => this.onSearchKeywordChanged(searchKeyword),
    );
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchKeyword: nextProps.searchKeyword,
    });
  }

  componentWillMount() {
    this.setState({
      searchKeyword: '',
    });
    this.props.onSearchKeywordChanged('');
  }

  render = () => {
    return (
      <View style={Styles.container}>
        <SearchBar
          clearIcon
          lightTheme
          noIcon={true}
          containerStyle={Styles.search}
          inputStyle={Styles.searchInput}
          placeholder="Search..."
          textInputRef="textInputRef"
          placeholderTextColor="white"
          value={this.state.searchKeyword}
          onChangeText={this.searchKeywordChanged}
        />
      </View>
    );
  };
}

SearchBarWithDelay.propTypes = {
  searchKeyword: PropTypes.string,
  onSearchKeywordChanged: PropTypes.func.isRequired,
};

SearchBarWithDelay.defaultProps = {
  searchKeyword: '',
};

export default SearchBarWithDelay;
