import React, { useEffect, useContext } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useAsyncEffect } from 'use-async-effect';

import { login } from './../store/actions/auth';

export default function Nav_AuthLoadingScreen(props) {
  const dispatch = useDispatch();

  useAsyncEffect(async () => {
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    if (jwtToken !== 'undefined' && jwtToken !== null) {
      let decoded = jwtDecode(jwtToken);
      let user = {
        email: decoded.email,
        userName: decoded.userName,
        id: decoded.id,
        token: jwtToken,
      };
      dispatch(login(user));
    }
    props.navigation.navigate(jwtToken ? 'App' : 'Auth');
  });

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
