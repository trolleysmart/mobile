// @flow

import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';
import { ImageUltility } from '../components/image';
import Styles from './Styles';

class FlyerDetail extends Component {
  renderSlide = slide => {
    return (
      <View style={Styles.slide1}>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width + 100}
          imageHeight={Dimensions.get('window').height}
        >
          <Image
            style={{ width: Dimensions.get('window').width + 150, height: Dimensions.get('window').height }}
            source={ImageUltility.getImageSource('briscoes_1')
            //      {
            //      uri: 'https://db1736767dbd5e7094bb-d61bbc5d0b342a54145a236e2d5d1ebf.ssl.cf4.rackcdn.com/Product-1600x1600/eb11945f-158a-42d3-9b31-4c58f0f709c0.jpg'
            //  }
            }
          />
        </ImageZoom>
      </View>
    );
  };

  renderSlides = slides => {
    return slides.map(_ => {
      return this.renderSlide(_);
    });
  };

  render = () => {
    return (
      <Swiper style={Styles.wrapper} showsButtons={true} scrollEnable={false}>
        {this.renderSlides(this.props.slides)}
      </Swiper>
    );
  };
}

export default FlyerDetail;
