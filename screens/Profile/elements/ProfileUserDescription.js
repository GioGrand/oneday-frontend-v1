import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function ProfileUserDescription({ profile }) {
  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';

  return (
    <View style={styles.description_container}>
      {profile.description && profile.description.length > 1 ? <Text style={styles.description_text}>{profile.description}</Text> : <Text style={styles.description_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>}
      <Text style={styles.hashtags_text}>#summertime #beachlife </Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  description_container: {
    paddingHorizontal: '25@ms1',
    flex: 1,
    marginTop: '5@ms1',
    backgroundColor: '#ffffff',
    zIndex: 1,
    paddingBottom: '20@ms1',
    borderBottomLeftRadius: '20@ms1',
    borderBottomRightRadius: '20@ms1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12.35,
  },
  description_text: {
    fontFamily: 'sf-ui',
    color: '#8a8a8f',
    fontSize: '13@ms1',
    width: screenWidth - 100,
  },
  hashtags_text: {
    marginTop: '2@ms1',
    fontFamily: 'sf-ui',
    fontSize: '13@ms1',
  },
});
