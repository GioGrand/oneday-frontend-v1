import React, { useState, useEffect } from 'react';
import { SafeAreaView, Switch, StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign, BaseInput } from '../../components/ui/index';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import { login } from './../../store/actions/auth';

export default function EditProfile(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const [updateProfile, { loading }] = useMutation(UPDATE_USER, {
    update(_, result) {
      console.log(result.data.updateProfile);
      dispatch(login(result.data.updateProfile));
      props.navigation.navigate('Feed');
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { userName, email },
  });

  const submitHandler = () => {
    console.log(email, userName);
    updateProfile();
  };

  useEffect(() => {
    setEmail(user.user.email);
    setUserName(user.user.userName);
  }, []);

  return (
    <ScrollView>
      <View style={styles.settings_container}>
        <BaseTitle style={styles.baseTitle}>Edit profile</BaseTitle>

        <View style={styles.profileImageContainer}>
          <FadeIn>
            <Image style={styles.image} source={{ uri: user.user.profileImageHiRes }} />
          </FadeIn>
          <Text style={styles.changePicture_text}>change profile picture</Text>
        </View>

        <View style={styles.editProfile_container}>
          <BaseInput label="Username" onChangeText={e => setUserName(e)} value={userName} />
          <BaseInput label="Email" onChangeText={e => setEmail(e)} value={email} />

          {Object.keys(errors).length > 0 &&
            Object.values(errors).map(el => {
              console.log('logging from here', el);
              return <Text key={el}>{el}</Text>;
            })}

          <MasterButton loading={loading} onPress={submitHandler}>
            Update profile
          </MasterButton>
        </View>
      </View>
    </ScrollView>
  );
}

EditProfile.navigationOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={{ marginLeft: 30, width: 50 }}>
        <AntDesign name="arrowleft" size={20} />
      </View>
    </TouchableWithoutFeedback>
  ),
  headerRight: null,
});

const styles = ScaledSheet.create({
  settings_container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  baseTitle: {
    marginLeft: '25@ms1',
  },
  changePicture_text: {
    fontFamily: 'sf-ui',
    color: '#1A1C2B',
    paddingTop: '10@ms1',
    fontSize: '12@ms1',
  },
  profileImageContainer: {
    minHeight: '180@ms1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '106@ms1',
    height: '106@ms1',
    borderRadius: '53@ms1',
  },
  editProfile_container: {
    paddingHorizontal: '25@ms1',
    marginTop: '15@ms1',
    flex: 1,
    justifyContent: 'flex-start',
  },
});

const UPDATE_USER = gql`
  mutation updateProfile($userName: String!, $email: String!) {
    updateProfile(userName: $userName, email: $email) {
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
    }
  }
`;
