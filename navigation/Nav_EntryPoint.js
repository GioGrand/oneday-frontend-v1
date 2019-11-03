import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Nav_AuthStack from './AuthStack/Nav_AuthStack';
import Nav_RootStack from './RootStack/Nav_RootStack';
import Nav_AuthLoadingScreen from './Nav_AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Nav_AuthLoadingScreen,
      App: Nav_RootStack,
      Auth: Nav_AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
