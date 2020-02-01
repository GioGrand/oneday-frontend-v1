export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

import { AsyncStorage } from 'react-native';

export const login = userData => {
  console.log('FROM ACTION', userData);
  if (userData.accessToken) {
    AsyncStorage.setItem('jwtToken', userData.accessToken);
  }
  if (userData.refreshToken) {
    AsyncStorage.setItem("jwtRefreshToken", userData.refreshToken);
  }
  return { type: LOGIN, userData };
};

export const logout = () => {
  AsyncStorage.removeItem('jwtToken');
  AsyncStorage.removeItem("jwtRefreshToken");
  return { type: LOGOUT };
};
