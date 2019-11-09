/////////////////////////////////////////
// NOT USED
/////////////////////////////////////////

import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function ProfileCoverImage() {
  let urlR = 'https://res.cloudinary.com/dhqtafsst/image/upload/v1573225833/Barcelona-10-2-777x584_2x_ojdssg.jpg';

  return (
    <View style={styles.topImage}>
      <Image style={{ width: screenWidth, height: screenWidth * 0.66, resizeMode: 'cover' }} source={{ uri: urlR }}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  topImage: {
    backgroundColor: '#565656',
    width: screenWidth,
    height: screenWidth * 0.66,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
