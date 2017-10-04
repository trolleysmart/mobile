// @flow

import React from 'react';
import { SectionList, Text, View, Image } from 'react-native';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import StapleItem from './StapleItem';
import { ImageUltility } from '../../components/image';
import Styles from './Styles';
import { StapleItemsProp } from './PropTypes';

class StapleItemsList extends React.PureComponent {
  onStapleItemSelectionChanged = (id, name, isCustomItem, isSelected) => {
    this.props.onStapleItemSelectionChanged(id, name, isCustomItem, isSelected);
  };

  renderItem = ({ item }) => {
    return (
      <StapleItem
        stapleItem={item}
        onStapleItemSelectionChanged={this.onStapleItemSelectionChanged}
        isSelected={this.props.selectedStapleItems.find(_ => _.id === item.id) != null}
      />
    );
  };

  renderSectionHeader = ({ section }) => {
    return (
      <View style={Styles.sectionHeader}>
        <Text style={Styles.sectionTitle}>{section.categoryTitle}</Text>
        <Image source={ImageUltility.getImageSource(section.categoryKey.replace(/-/g, ''))} style={Styles.sectionHeaderImage} />
      </View>
    );
  };

  getSectionData = () => {
    const data = Immutable.fromJS(this.props.stapleItems);

    let sectionData = data
      .groupBy(
        item =>
          item.has('tags') && item.get('tags')
            ? (item.get('tags').isEmpty()
                ? 'Other'
                : item
                    .get('tags')
                    .first()
                    .get('name'): 'Other')
            : 'Other',
      )
      .mapEntries(([key, value]) => [
        key,
        {
          data: value.toJS(),
          categoryTitle: key,
          categoryKey:
            value.first().has('tags') &&
            value.first().get('tags') &&
            !value
              .first()
              .get('tags')
              .isEmpty()
              ? value
                  .first()
                  .get('tags')
                  .first()
                  .get('key')
              : key,
        },
      ])
      .sortBy(_ => _.categoryKey)
      .valueSeq()
      .toJS();

    // Get the popular items
    const popularItems = data
      .filter(_ => _.get('popular'))
      .groupBy(() => 'Popular')
      .mapEntries(([key, value]) => [
        key,
        {
          data: value.toJS(),
          categoryTitle: key,
          categoryKey: key,
        },
      ])
      .valueSeq()
      .toJS();

    // Add the popular items to the top of secion data;
    if (popularItems[0]) {
      sectionData.unshift(popularItems[0]);
    }

    return sectionData;
  };

  render = () => {
    const sectionData = this.getSectionData();

    return (
      <View style={Styles.container}>
        <View style={Styles.containerHeader}>
          <Text style={Styles.itemsCount}>{this.props.selectedStapleItems.length} items selected</Text>
        </View>
        <SectionList
          contentContainerStyle={Styles.sectionListContainer}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={sectionData}
          keyExtractor={item => item.id}
          onEndReached={this.props.onEndReached}
          onRefresh={this.props.onRefresh}
          refreshing={this.props.isFetchingTop}
        />
      </View>
    );
  };
}

StapleItemsList.propTypes = {
  stapleItems: StapleItemsProp,
  selectedStapleItems: StapleItemsProp,
  onStapleItemSelectionChanged: PropTypes.func.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
};

export default StapleItemsList;
