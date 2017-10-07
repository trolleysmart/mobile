// @flow

import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import StapleItem from './StapleItem';
import { StapleItemsProp } from './PropTypes';

class StapleItemsSection extends React.PureComponent {
  renderItem = item => {
    return (
      <StapleItem
        stapleItem={item.item}
        onStapleItemSelectionChanged={this.props.onStapleItemSelectionChanged}
        isSelected={this.props.selectedStapleItems.find(_ => _.id === item.item.id) != null}
      />
    );
  };

  render = () => {
    return (
      <FlatList
        data={this.props.sectionItems}
        keyExtractor={item => {
          return item.id;
        }}
        numColumns={5}
        renderItem={this.renderItem}
      />
    );
  };
}

StapleItemsSection.propTypes = {
  sectionItems: StapleItemsProp,
  selectedStapleItems: StapleItemsProp,
  onStapleItemSelectionChanged: PropTypes.func.isRequired,
};

export default StapleItemsSection;
