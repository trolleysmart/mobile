// @flow

import { StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
const PRIMARY_COLOR_NORMAL = '#3DC62A';
const PRIMARY_COLOR_DARK = '#649A59';
const PRIMARY_COLOR_LIGHT = '#A6D891';
const PRIMARY_FONT_COLOR = '#333333';
const SECONDARY_COLOR_ACTION = '#F4CC62';
const ICON_PRESS_COLOR = 'rgba(100,154,89, .32)';
const screen = Dimensions.get('window');

export const Color = {
  primaryColorNormal: PRIMARY_COLOR_NORMAL,
  primaryColorDark: PRIMARY_COLOR_DARK,
  primaryColorLight: PRIMARY_COLOR_LIGHT,
  primaryFontColor: PRIMARY_FONT_COLOR,
  secondaryColorAction: SECONDARY_COLOR_ACTION,
  touchableIconPressColor: ICON_PRESS_COLOR,
};

export const Sizes = {
  searchBarHeaderWidth: screen.width - 10,
  searchBarHeaderHeight: HEIGHT,
};

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEIGHT,
  },
  primaryFont: {
    fontSize: 14,
    color: PRIMARY_FONT_COLOR,
  },
});
