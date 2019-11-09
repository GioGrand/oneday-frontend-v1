import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign, RoundedButtonNegative } from './../../components/ui/index';
import { ScaledSheet } from 'react-native-size-matters';

// COMPONENT SPECIFIC
import FadeIn from 'react-native-fade-in-image';
import ProfileCoverImage from './elements/ProfileCoverImage';
import ProfileUserHeader from './elements/ProfileUserHeader';
import ProfileUserDescription from './elements/ProfileUserDescription';
import UserMapPreview from './elements/UserMapPreview';
import UserDaysList from './elements/UserDaysList';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
console.log(screenWidth);

export default function Profile(props) {
  const user = useSelector(state => state.auth.user);

  return (
    <ScrollView>
      <ProfileCoverImage/>
      <ProfileUserHeader profile={user} />
      <ProfileUserDescription profile={user} />
      <UserMapPreview navigation={props.navigation} profile={user} />
      <UserDaysList />
    </ScrollView>
  );
}

Profile.navigationOptions = ({ navigation }) => ({
  title: '',
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: null,
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <View style={{ marginRight: 0, width: 50 }}>
        <AntDesign style={{ color: '#787878' }} name="bars" size={30} />
      </View>
    </TouchableOpacity>
  ),
});
