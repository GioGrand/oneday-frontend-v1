import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { createStackNavigator } from 'react-navigation';

import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';
import OnBoarding from '../../screens/Auth/OnBoarding';
import AvatarAndHashtags from '../../screens/Auth/AvatarAndHashTags';
import SocialLogin from '../../screens/Auth/SocialLogin';
import SocialRegister from '../../screens/Auth/SocialRegister';

const AuthStack = createStackNavigator(
  {
    SocialLogin,
    SocialRegister,
    OnBoarding,
    Login,
    Register,
    AvatarAndHashtags,
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
