import React from 'react';
import { Image } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';

export default function AvatarContainer(props) {
  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';

  return (
    <FadeIn>
      <Image style={styles.image} source={{ uri: urlR }} />
    </FadeIn>
  );
}

const styles = ScaledSheet.create({
  image: {
    width: '40@ms1',
    height: '40@ms1',
    borderRadius: '20@ms1',
    marginLeft: '7@ms1',
  },
});
