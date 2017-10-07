// @flow

import { StyleSheet } from 'react-native';
import { Color } from '../../../framework/style/DefaultStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    paddingLeft: 5,
  },
});

export const optionsStyles = {
  optionsContainer: {
    padding: 5,
    width: 150,
  },
  optionsWrapper: {},
  optionWrapper: {
    margin: 5,
  },
  optionTouchable: {
    underlayColor: Color.touchableIconPressColor,
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};
