import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
// GRAPHQL
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { BaseTitle, MasterButton, AntDesign, RoundedButtonNegative } from './../../components/ui/index';
import { ScaledSheet } from 'react-native-size-matters';
import ProfileUserHeader from '../Profile/elements/ProfileUserHeader';
import ProfileUserDescription from '../Profile/elements/ProfileUserDescription';
import UserMapPreview from '../Profile/elements/UserMapPreview';
import UserDaysList from '../Profile/elements/UserDaysList';

// COMPONENT SPECIFIC

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
console.log(screenWidth);

export default function UserProfile(props) {
  const userId = props.navigation.getParam('userId', 'default value');

  const { loading, error, data: { getUserProfile = {} } = {}, refetch } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
  });

  console.log(getUserProfile);

  if (!getUserProfile) {
    tag = <Text>loading</Text>;
  } else {
    tag = (
      <ScrollView>
        <ProfileUserHeader profile={getUserProfile} />
        <ProfileUserDescription profile={getUserProfile} />
        <UserMapPreview navigation={props.navigation} profile={getUserProfile} />
        <UserDaysList />
      </ScrollView>
    );
  }

  return tag;
}

UserProfile.navigationOptions = ({ navigation }) => ({
  title: '',
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: null,
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <View style={{ marginRight: 0, width: 50 }}>
        <AntDesign style={{ color: '#fff' }} name="bars" size={30} />
      </View>
    </TouchableOpacity>
  ),
});

const GET_USER_PROFILE = gql`
  query getUserProfile($userId: ID!) {
    getUserProfile(userId: $userId) {
      id
      userName
      hashtags
      description
      profileImageLowRes
      profileImageHiRes
      followersCount
      followingCount
    }
  }
`;
