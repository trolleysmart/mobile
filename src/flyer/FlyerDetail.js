// @flow

import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';
import {
  ImageUltility,
} from '../components/image';
import Styles from './Styles';

class FlyerDetail extends Component {
  renderSlide = (slide) => {
    return <View style={Styles.slide1}>
      <ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={Dimensions.get('window').height} imageWidth={200} imageHeight={200}>
        <Image
          style={{ width: 200, height: 200 }}
          source={ImageUltility.getImageSource('briscoes_thumb')
          //      {
          //      uri: 'https://db1736767dbd5e7094bb-d61bbc5d0b342a54145a236e2d5d1ebf.ssl.cf4.rackcdn.com/Product-1600x1600/eb11945f-158a-42d3-9b31-4c58f0f709c0.jpg'
          //  }
          }
        />
      </ImageZoom>
    </View>;
  };

  renderSlides = (slides) => {
    return slides.map(_ => {
      return this.renderSlide(_);
    });
  }

  render = () => {
    return (
      <Swiper style={Styles.wrapper} showsButtons={true}>
        {
          this.renderSlides(this.props.slides)
        }
      </Swiper>
    );
  };
}

export default FlyerDetail;
