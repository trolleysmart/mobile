// @flow

import { StyleSheet } from 'react-native';
import {Color, Sizes} from '../../framework/style/DefaultStyles';

export default StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  topContainer:{
    flexDirection: 'row',
    padding: 20,
  },
  image:{
    width: 150,
    height: 150,
    // marginLeft: 50,
  },
  feedbackIntroTextContainer:{
    width: 200,
  },
  feedbackIntroText:{
    fontSize: 16,
    fontWeight: '500',
    color: Color.primaryFontColor,

  },
  touchableContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  iconContainerStyle: {
    height: Sizes.searchBarHeaderHeight,
    width: Sizes.searchBarHeaderHeight,
  },
});
