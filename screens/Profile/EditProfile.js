import React, { useState, useEffect } from 'react';
import { SafeAreaView, Switch, StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BaseTitle, MasterButton, AntDesign, BaseInput } from '../../components/ui/index';
import { logout } from './../../store/actions/auth';
import FadeIn from 'react-native-fade-in-image';

import { ScaledSheet } from 'react-native-size-matters';

export default function EditProfile(props) {
  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  console.log(user.user);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

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
            <Image style={styles.image} source={{ uri: urlR }} />
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

          <MasterButton loading={false} onPress={() => console.log('ciaoo')}>
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
