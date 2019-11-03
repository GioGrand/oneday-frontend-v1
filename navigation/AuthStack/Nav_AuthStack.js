import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../../screens/Auth/Login';
import RegisterScreen from '../../screens/Auth/Register';
import OnBoardingScreen from '../../screens/Auth/OnBoarding';

const AuthStack = createStackNavigator(
  {
    OnBoarding: OnBoardingScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontFamily: 'sf-ui',
      },
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerLeft: () => (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={{ marginLeft: 10, width: 50 }}>
            <AntDesign name="arrowleft" size={20} />
          </View>
        </TouchableWithoutFeedback>
      ),
    }),
  },
);

export default AuthStack;
