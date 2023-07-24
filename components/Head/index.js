import React, {useState} from 'react';
import {Image, View} from 'react-native';

export default function Head(props) {
  const {position, size} = props;
  const axis = props.axis ? props.axis : '0deg';
  return (
    <View
      style={{
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
      }}>
      <Image
        source={require('../../assets/img/snake_head.png')}
        style={{
          width: size * 1.5,
          height: size * 1.5,
          transform: [{rotate: axis}],
        }}
      />
    </View>
  );
}
