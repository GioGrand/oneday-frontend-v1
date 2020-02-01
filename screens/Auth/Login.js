import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';

// UI COMPONENTS
import { BaseInput, BaseTitle, MasterButton, AntDesign } from './../../components/ui/index';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import { login } from './../../store/actions/auth';

export default function Login(props) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      dispatch(login(result.data.login));
      console.log('RESULT FROM QUERY', result.data.login)
      props.navigation.navigate('App');
    },
    onError(err) {
      console.log('ERRORS', err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { userName, password },
  });

  useEffect(() => {
    ReactGA.initialize('214460166', {
      gaOptions: {
        userId: 123
      }
    });
    ReactGA.event({
      category: 'Ciao',
      action: 'Banana',
      label: 'Mucca'
    });
  }, [])

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
      <BaseTitle style={styles.baseTitle}>Login</BaseTitle>
      <View style={styles.login_container}>
        <BaseInput placeholder="your username" label="Username" onChangeText={e => setUserName(e)} value={userName} />
        <BaseInput secureTextEntry={true} placeholder="your super secret password" label="Password" onChangeText={e => setPassword(e)} value={password} />

        {Object.keys(errors).length > 0 &&
          Object.values(errors).map(el => {
            console.log('logging from here', el);
            return <Text key={el}>{el}</Text>;
          })}

        <MasterButton loading={loading} onPress={loginUser}>
          Login
        </MasterButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

Login.navigationOptions = ({ navigation }) => ({
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

const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
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
      accessToken
      refreshToken
    }
  }
`;
