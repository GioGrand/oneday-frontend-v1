import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function UserDaysList({ profile }) {
  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';

  return (
    <View style={styles.description_container}>
      <Text>#summertime #beachlife </Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  description_container: {
    height: 200,
    paddingHorizontal: '25@ms1',
    flex: 1,
    marginTop: '5@ms1',
    backgroundColor: '#ffffff',
    zIndex: 1,
    paddingBottom: '20@ms1',
    borderTopLeftRadius: '20@ms1',
    borderTopRightRadius: '20@ms1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -30,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12.35,
  },
});
