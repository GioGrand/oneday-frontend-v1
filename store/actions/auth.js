export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

import { AsyncStorage } from 'react-native';

export const login = userData => {
  console.log('FROM ACTION', userData);
  if (userData.token) {
    AsyncStorage.setItem('jwtToken', userData.token);
  }
  return { type: LOGIN, userData };
};

export const logout = () => {
  AsyncStorage.removeItem('jwtToken');
  return { type: LOGOUT };
};
