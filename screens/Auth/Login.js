import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
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


export default function LoginScreen(props) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      dispatch(login(result.data.login));
      props.navigation.navigate('App');
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { userName, password },
  });

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
        <BaseInput placeholder="your super secret password" label="Password" onChangeText={e => setPassword(e)} value={password} />

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

LoginScreen.navigationOptions = ({ navigation }) => ({
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
      email
      userName
      createdAt
      token
    }
  }
`;
