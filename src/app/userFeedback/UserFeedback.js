// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button, CheckBox } from 'react-native-elements';
import Styles from './Styles';
import { ImageUltility } from '../../components/image';
import { Color } from '../../framework/style/DefaultStyles';

class UserFeedback extends Component {
  render = () => {
    const option1Selected = this.props.selectedOptions.has('option1');
    const option2Selected = this.props.selectedOptions.has('option2');
    const option3Selected = this.props.selectedOptions.has('option3');
    const option4Selected = this.props.selectedOptions.has('option4');
    const option5Selected = this.props.selectedOptions.has('option5');

    return (
      <ScrollView style={Styles.container}>
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
          <View>
            <Text style={Styles.feedbackOptionText}>Which features would you love to see in TrolleySmart?</Text>
            <View>
              <CheckBox
                title="Pack and collect"
                onPress={() => this.props.onOptionsChanged('option1', 'pack and collect', option1Selected)}
                checked={option1Selected}
              />
              <CheckBox
                title="Online checkout"
                onPress={() => this.props.onOptionsChanged('option2', 'online checkout', option2Selected)}
                checked={option2Selected}
              />
              <CheckBox
                title="Delivery"
                onPress={() => this.props.onOptionsChanged('option3', 'delivery', option3Selected)}
                checked={option3Selected}
              />
              <CheckBox
                title="Price watch/alert"
                onPress={() => this.props.onOptionsChanged('option4', 'price watch', option4Selected)}
                checked={option4Selected}
              />
              <CheckBox
                title="Share shopping list with friends and family"
                onPress={() => this.props.onOptionsChanged('option5', 'list sharing', option5Selected)}
                checked={option5Selected}
              />
            </View>
          </View>
          <FormLabel>Other Feedback</FormLabel>
          <FormInput multiline={true} placeholder="Message" numberOfLines={8} onChangeText={message => this.props.onMessageChanged(message)} />
          <Button
            title="Send"
            icon={{ name: 'send', type: 'material-community' }}
            raised
            onPress={() => this.props.onSendPress()}
            backgroundColor={Color.secondaryColorAction}
          />
        </View>
      </ScrollView>
    );
  };
}

UserFeedback.propTypes = {
  onSendPress: PropTypes.func.isRequired,
  onMessageChanged: PropTypes.func.isRequired,
};

export default UserFeedback;
