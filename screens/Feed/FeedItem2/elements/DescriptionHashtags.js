import React from 'react';
import { Image, View, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';

export default function DescriptionHashtags(props) {
  return (
    <View style={styles.description_container}>
      <Text style={styles.description_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
      <Text style={styles.hashtags_text}>#summertime #beachlife </Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  description_container: {
    flex: 1,
    marginTop: '20@ms1',
    marginRight: '20@ms1',
  },
  description_text: {
    fontFamily: 'sf-ui',
    color: '#8a8a8f',
    fontSize: '13@ms1',
  },
  hashtags_text: {
    marginTop: '2@ms1',
    fontFamily: 'sf-ui',
    fontSize: '13@ms1',
  },
});
