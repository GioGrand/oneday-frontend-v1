import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// UI COMPONENTS
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { BaseTitle, MasterButton, BaseInput, AntDesign, RoundedButtonNegative } from './../../../components/ui/index';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function ProfileUserHeader({ profile }) {
  console.log(profile);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.fake_container}></View>
      <View style={styles.avatar_container}>
        <View>
          <Image style={styles.avatar_image} source={{ uri: profile.profileImageLowRes }}></Image>
        </View>
        <RoundedButtonNegative loading={false} onPress={() => props.navigation.navigate('EditProfile')}>
          Edit profile
        </RoundedButtonNegative>
      </View>

      <View style={styles.user_header_container}>
        <Text style={styles.user_username}>{profile.userName}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.follower_container}>
            <Text style={styles.follower_number}>341</Text>
            <Text style={styles.follower_text}>Follower</Text>
          </View>
          <View style={styles.following_container}>
            <Text style={styles.follower_number}>154</Text>
            <Text style={styles.follower_text}>Following</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: -20,
  },
  fake_container: {
    minHeight: screenWidth * 0.66,
  },
  avatar_container: {
    borderTopLeftRadius: '20@ms1',
    borderTopRightRadius: '20@ms1',
    height: '70@ms1',
    width: screenWidth,
    paddingHorizontal: '25@ms1',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  avatar_image: {
    width: screenWidth * 0.3,
    borderRadius: (screenWidth * 0.3) / 2,
    height: screenWidth * 0.3,
    resizeMode: 'cover',
    position: 'absolute',
    marginTop: -screenWidth * 0.217,
  },
  user_header_container: {
    height: '70@ms1',
    width: screenWidth,
    paddingHorizontal: '25@ms1',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user_username: {
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
    fontSize: '19@ms1',
  },
  follower_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  following_container: {
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'center',
  },
  follower_number: {
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
    fontSize: '17@ms1',
    marginBottom: 2,
  },
  follower_text: {
    fontFamily: 'sf-ui',
    color: '#707070',
    fontSize: '14@ms1',
  },
});
