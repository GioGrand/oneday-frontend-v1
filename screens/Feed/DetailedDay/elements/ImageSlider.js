import React, { useState, useEffect } from 'react';
import { Image, View, Dimensions, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';
import Slideshow from 'react-native-image-slider-show';

const screenWidth = Math.round(Dimensions.get('window').width);

const dataSource = [
  {
    url: 'https://res.cloudinary.com/dhqtafsst/image/upload/v1573555115/juliette_b8pkgh.jpg',
  },
  {
    url: 'https://res.cloudinary.com/dhqtafsst/image/upload/v1573555115/juniors_egj5o1.jpg',
  },
  {
    url: 'https://res.cloudinary.com/dhqtafsst/image/upload/v1573555115/moma_pqfqo2.jpg',
  },
];

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

export default function ImageSlider({ myPosts, currentPost, handleChangePost }) {
 // console.log(myPosts);
 // console.log(currentPost);

  const [position, setposition] = useState();

  const handleChange = position => {
    setposition(position);
    console.log('daye', position);

    

    handleChangePost(myPosts[position]);
  };

  useEffect(() => {
    let index = findWithAttr(myPosts, 'id', currentPost.id); // returns 0
    console.log(index + 1);

    if (index == !position) {
      setposition(index);
    }
  }, []);

  return (
    <View style={styles.user_container}>
      {/* <Slideshow height={screenWidth} dataSource={dataSource} position={position} onPositionChanged={position => handleChange(position)} /> */}
      <Slideshow height={screenWidth} dataSource={dataSource} position={position} onPositionChanged={position => handleChange(position)}/>
    </View>
  );
}

const styles = ScaledSheet.create({
  user_container: {
    minHeight: screenWidth,
    maxHeight: screenWidth,
    backgroundColor: '#453455',
    borderTopLeftRadius: '20@ms1',
    borderTopRightRadius: '20@ms1',
    marginBottom: -25,
  },
});
