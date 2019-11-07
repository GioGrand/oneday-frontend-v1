import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import jwtDecode from 'jwt-decode';
import { useAsyncEffect } from 'use-async-effect';

export default function Nav_AuthLoadingScreen(props) {
  useAsyncEffect(async () => {
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    if (jwtToken !== 'undefined' && jwtToken !== null) {
      let decoded = jwtDecode(jwtToken);
      //      console.log(decoded);
    }
    props.navigation.navigate(jwtToken ? 'App' : 'OnBoarding');
  });

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
