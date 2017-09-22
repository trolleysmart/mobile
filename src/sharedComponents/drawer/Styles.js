// @flow

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  menu: {
    flex: 10,
  },
  profile: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#3DC62A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  profileAvatar: {
    marginRight: 20,
  },
  profileDetail: {
    flexDirection: 'column',
    flex: 1,
  },
});
