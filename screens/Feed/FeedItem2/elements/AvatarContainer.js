import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';

export default function AvatarContainer({ item, navigation }) {
  console.log(item.author.id);
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        // navigation.navigate('UserProfile', {
        //   userId: item.author.id,
        // })
        console.log(clicked)
      }
    >
      <FadeIn>
        <Image style={styles.image} source={{ uri: item.author.profileImageLowRes }} />
      </FadeIn>
    </TouchableWithoutFeedback>
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
