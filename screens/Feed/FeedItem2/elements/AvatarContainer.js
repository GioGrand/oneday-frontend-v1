import React from 'react';
import { Image } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';

export default function AvatarContainer({ item }) {
  return (
    <FadeIn>
      <Image style={styles.image} source={{ uri: item.author.profileImageLowRes }} />
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
