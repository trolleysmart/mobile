// @flow

import React from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './Styles';
import { ImageUltility } from '../../components/image';
import { SubmitUserFeedback } from '../../framework/relay/mutations';

const UserFeedback = () => {
  return <View style={Styles.container}>
          <View style={Styles.topContainer}>
            <Image source={ImageUltility.getImageSource('pencil')}  style={Styles.image} />
            <View style={Styles.feedbackIntroTextContainer}>
              <Text style={Styles.feedbackIntroText}>
                <Text >Love to hear from </Text>
                <Text>you.</Text>
                <Text>Please let use know how we can improve the app.</Text>
              </Text>
            </View>
          </View>
          <View style={Styles.bottomContainer}>
            <Text>This is feedback page</Text>
          </View>

        </View>;
};

UserFeedback.propTypes = {};

export default UserFeedback;
