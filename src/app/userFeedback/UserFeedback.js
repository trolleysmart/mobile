// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Styles from './Styles';
import { ImageUltility } from '../../components/image';
import { Color } from '../../framework/style/DefaultStyles';

const UserFeedback = ({ onSendPress, onMessageChanged }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.topContainer}>
        <Image source={ImageUltility.getImageSource('pencil')} style={Styles.image} />
        <View style={Styles.feedbackIntroTextContainer}>
          <Text style={Styles.feedbackIntroText}>
            <Text>Love to hear from </Text>
            <Text>you.</Text>
            <Text>Please let use know how we can improve the app.</Text>
          </Text>
        </View>
      </View>
      <View style={Styles.bottomContainer}>
        <FormLabel>Other Feedback</FormLabel>

        <FormInput multiline={true} placeholder="Message" numberOfLines={8} onChangeText={message => onMessageChanged(message)} />
        <Button
          title="Send"
          icon={{ name: 'send', type: 'material-community' }}
          raised
          onPress={() => onSendPress()}
          backgroundColor={Color.secondaryColorAction}
        />
      </View>
    </View>
  );
};

UserFeedback.propTypes = {
  onSendPress: PropTypes.func.isRequired,
  onMessageChanged: PropTypes.func.isRequired,
};

export default UserFeedback;
