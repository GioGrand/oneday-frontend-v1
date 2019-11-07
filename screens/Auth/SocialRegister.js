import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector, useDispatch } from 'react-redux';

// UI COMPONENTS
import { BaseInput, BaseTitle, MasterButton, AntDesign } from './../../components/ui/index';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import { login } from './../../store/actions/auth';

import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

export default function SocialRegister(props) {
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [googleId, setGoogleId] = useState();
  const [googleAccessToken, setGoogleAccessToken] = useState();
  const [facebookId, setFacebookId] = useState();
  const [facebookAccessToken, setFacebookAccessToken] = useState();
  const [registerType, setRegisterType] = useState();
  const [profileImageLowRes, setProfileImageLowRes] = useState();

  const [addSocialUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result.data.socialRegister);
      dispatch(login(result.data.socialRegister));
      props.navigation.navigate('AvatarAndHashtags');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { userName, email, googleId, googleAccessToken, facebookId, facebookAccessToken, registerType, profileImageLowRes },
  });

  async function loginGoogle() {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId: '465053337668-965n8e5rf4tujl0ocl678ksthh9o8rfj.apps.googleusercontent.com',
      iosClientId: '465053337668-1foqfndpmssto832gm3491jddlsrjo0o.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    if (type === 'success') {
      console.log(user.email);
      setEmail(user.email);
      console.log(user.name);
      const loweredName = user.name.replace(/\s+/g, '.').toLowerCase();
      setUserName(loweredName);
      console.log(user.id);
      setGoogleId(user.id);
      console.log(user.photoUrl);
      setProfileImageLowRes(user.photoUrl);
      console.log(type);
      setRegisterType('google');
      console.log(accessToken);
      setGoogleAccessToken(accessToken);
      setTimeout(function() {
        addSocialUser();
      }, 100);
    }
  }

  async function loginFacebook() {
    try {
      const back = await Facebook.logInWithReadPermissionsAsync('516708879182184', {
        permissions: ['public_profile', 'email'],
      });
      if (back.type === 'success') {
        console.log(back);
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=name,email,picture.width(600).height(600)&access_token=${back.token}`);
        let userResponse = await response.json();
        console.log(userResponse.email);
        setEmail(userResponse.email);
        console.log(userResponse.name);
        const loweredName = userResponse.name.replace(/\s+/g, '.').toLowerCase();
        setUserName(loweredName);
        console.log(userResponse.id);
        setFacebookId(userResponse.id);
        console.log(userResponse.picture.data.url);
        setProfileImageLowRes(userResponse.picture.data.url);
        console.log(back.token);
        setFacebookAccessToken(back.token);
        setTimeout(function() {
          addSocialUser();
        }, 100);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
      }}
      style={{ flex: 1 }}
    >
      <BaseTitle style={styles.baseTitle}>Register</BaseTitle>
      <View style={styles.login_container}>
        {Object.keys(errors).length > 0 &&
          Object.values(errors).map(el => {
            console.log('logging from here', el);
            return <Text key={el}>{el}</Text>;
          })}

        <MasterButton loading={false} onPress={loginFacebook}>
          Facebook
        </MasterButton>
        <MasterButton loading={false} onPress={loginGoogle}>
          Google
        </MasterButton>
        <MasterButton loading={false} onPress={() => props.navigation.navigate('Register')}>
          Email/Password
        </MasterButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

SocialRegister.navigationOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerLeft: (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={{ marginLeft: moderateScale(20, 1), width: 50 }}>
        <AntDesign name="arrowleft" size={20} />
      </View>
    </TouchableWithoutFeedback>
  ),
  headerRight: null,
});

const styles = ScaledSheet.create({
  login_container: {
    paddingHorizontal: '25@ms1',
    marginTop: '15@ms1',
    flex: 1,
    justifyContent: 'flex-start',
  },
  baseTitle: {
    marginLeft: '25@ms1',
  },
});

const REGISTER_USER = gql`
  mutation socialRegister($userName: String!, $email: String!, $googleId: String, $googleAccessToken: String, $facebookId: String, $facebookAccessToken: String, $registerType: String, $profileImageLowRes: String) {
    socialRegister(userName: $userName, email: $email, googleId: $googleId, googleAccessToken: $googleAccessToken, facebookId: $facebookId, facebookAccessToken: $facebookAccessToken, registerType: $registerType, profileImageLowRes: $profileImageLowRes) {
      id
      userName
      email
      profileImageLowRes
      profileImageHiRes
      emailNotifications
      notifications
      daysCount
      favouritesCount
      followersCount
      followingCount
      token
    }
  }
`;
