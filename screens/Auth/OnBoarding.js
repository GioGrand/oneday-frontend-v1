import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { MasterButton } from './../../components/ui/index';
import Onboarding from 'react-native-onboarding-swiper';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const screenHeigth = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default function OnBoarding(props) {
  return (
    <Onboarding
      showDone={false}
      showNext={false}
      showSkip={false}
      bottomBarHighlight={false}
      containerStyles={styles.onBoarding_container}
      imageContainerStyles={styles.onBoarding_image_container}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image style={styles.onBoarding_image} source={require('./../../assets/onB.jpg')} />,
          title: (
            <View style={styles.title_container}>
              <Text style={styles.title_title}>Share your happy moment </Text>
            </View>
          ),
          subtitle: (
            <View style={styles.subtitle_view}>
              <Text style={styles.subtitle_text}>Lorem ipsum dolor sit consectetur adipiscing elit.</Text>
              <MasterButton loading={false} onPress={() => props.navigation.navigate('SocialRegister')}>
                Create account
              </MasterButton>
            </View>
          ),
        },
        {
          backgroundColor: '#fff',
          image: <Image style={styles.onBoarding_image} source={require('./../../assets/onB.jpg')} />,
          title: (
            <View style={styles.title_container}>
              <Text style={styles.title_title}>Share your happy moment </Text>
            </View>
          ),
          subtitle: (
            <View style={styles.subtitle_view}>
              <Text style={styles.subtitle_text}>Lorem ipsum dolor sit consectetur adipiscing elit.</Text>
              <MasterButton loading={false} onPress={() => props.navigation.navigate('SocialRegister')}>
                Create account
              </MasterButton>
            </View>
          ),
        },
        {
          backgroundColor: '#fff',
          image: <Image style={styles.onBoarding_image} source={require('./../../assets/onB.jpg')} />,
          title: (
            <View style={styles.title_container}>
              <Text style={styles.title_title}>Share your happy moment </Text>
            </View>
          ),
          subtitle: (
            <View style={styles.subtitle_view}>
              <Text style={styles.subtitle_text}>Lorem ipsum dolor sit consectetur adipiscing elit.</Text>
              <MasterButton loading={false} onPress={() => props.navigation.navigate('SocialRegister')}>
                Create account
              </MasterButton>
            </View>
          ),
        },
      ]}
    />
  );
}

OnBoarding.navigationOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    elevation: 0,
  },
  headerLeft: null,
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <View style={{ marginRight: moderateScale(35), width: 50 }}>
        <Text style={styles.onBoardin_login}>Log in</Text>
      </View>
    </TouchableOpacity>
  ),
});

const styles = ScaledSheet.create({
  onBoarding_container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(35),
  },
  title_container: {
    width: screenWidth - 40,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  title_title: {
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
    paddingVertical: '12@ms1',
    fontSize: '33@ms1',
    width: screenWidth - moderateScale(70),
  },
  subtitle_view: {
    width: screenWidth - 40,
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  subtitle_text: {
    fontFamily: 'sf-ui',
    color: '#1A1C2B',
    paddingHorizontal: 0,
    marginHorizontal: 0,
    fontSize: '14@ms1',
    width: screenWidth - moderateScale(60),
  },
  onBoarding_image_container: {
    borderRadius: moderateScale(15),
    overflow: 'hidden',
    marginTop: moderateScale(5),
    height: moderateScale(screenHeigth / 2 - 20),
  },
  onBoarding_image: {
    height: moderateScale(screenHeigth / 2),
    width: '100%',
    resizeMode: 'cover',
  },
  onBoardin_login: {
    fontSize: '14@ms1',
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
  },
});
