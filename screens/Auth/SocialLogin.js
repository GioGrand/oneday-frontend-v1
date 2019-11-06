import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Button, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

export default function SocialLogin() {
  async function banana() {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId: '733726290856-r1kj8rmv0n8u63lrnbt8rb918t9u8hco.apps.googleusercontent.com',
      iosClientId: '733726290856-oa0pm89vk2tk77ahgdsk3f23v25joaj9.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    if (type === 'success') {
      console.log(user);
      console.log(type);
      console.log(accessToken);
    }
  }

  async function logIn() {
    try {
      const back = await Facebook.logInWithReadPermissionsAsync('912421332511403', {
        permissions: ['public_profile', 'email', 'user_hometown', 'user_location', 'user_photos'],
      });
      if (back.type === 'success') {
        console.log(back);
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${back.token}`);
        console.log(await response.json());
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View>
      <Button onPress={banana} title="Login with Google" />
      <Button onPress={logIn} title="Login with Facebook" />
    </View>
  );
}
