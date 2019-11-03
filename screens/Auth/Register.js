import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
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

export default function RegisterScreen(props) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      dispatch(login(result.data.register));
      props.navigation.navigate('App');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { userName, email, password, confirmPassword },
  });

  function registerUser() {
    console.log(userName, email, password, confirmPassword);
    addUser();
  }

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
      <BaseTitle style={styles.baseTitle}>Register</BaseTitle>
      <View style={styles.register_container}>
        <BaseInput placeholder="Es: gioG" label="Username" onChangeText={e => setUserName(e)} value={userName} />
        <BaseInput placeholder="gio@gmail.com" label="Email" onChangeText={e => setEmail(e)} value={email} />
        <BaseInput placeholder="your super secret password" label="Password" onChangeText={e => setPassword(e)} value={password} />
        <BaseInput placeholder="confirm password" label="Confirm Password" onChangeText={e => setConfirmPassword(e)} value={confirmPassword} />
        {Object.keys(errors).length > 0 &&
          Object.values(errors).map(el => {
            console.log('logging from here', el);
            return <Text key={el}>{el}</Text>;
          })}

        <MasterButton loading={loading} onPress={registerUser}>
          Register
        </MasterButton>
      </View>
    </KeyboardAwareScrollView>
  );
}


RegisterScreen.navigationOptions = ({ navigation }) => ({
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
  register_container: {
    paddingHorizontal: '25@ms1',
    marginTop: '15@ms1',
    flex: 1,
    justifyContent: 'flex-start',
  },
  baseTitle: {
    marginLeft: '25@ms1',
  },
});

const REGISTER_USER = gql`
  mutation register($userName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(userName: $userName, email: $email, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;
