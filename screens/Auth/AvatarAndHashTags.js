import React, { useState, useEffect } from 'react';
import { SafeAreaView, Switch, StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, MasterButtonNegative, AntDesign, BaseInput } from '../../components/ui/index';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import { login } from './../../store/actions/auth';
import { DotIndicator } from 'react-native-indicators';

export default function AvatarAndHashtags(props) {
  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const [errors, setErrors] = useState({});
  const [hashtags, setHashtags] = useState([]);

  const hashtagsBase = ['#shopping', '#art', '#architecture', '#food', '#culture', '#outdoor activities', '#nightlife', '#social events'];

  const onSelect = tag => {
    if (hashtags.includes(tag)) {
      setHashtags(oldHashtags => oldHashtags.filter(item => item !== tag));
    } else {
      setHashtags(oldHashtags => [...oldHashtags, tag]);
    }
  };

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
    variables: { hashtags },
  });

  const submitHandler = () => {
    console.log(hashtags);
    updateProfile();
  };

  return (
    <ScrollView>
      <View style={styles.settings_container}>
        <View style={styles.profileImageContainer}>
          <FadeIn>
            <Image style={styles.image} source={{ uri: user.user.profileImageHiRes }} />
          </FadeIn>
          <Text style={styles.changePicture_text}>change profile picture</Text>
        </View>
        <BaseTitle style={styles.baseTitle}>Set your interests</BaseTitle>

        <View style={styles.hashtagsContainer}>
          {hashtagsBase.map(hashtag => (
            <TouchableOpacity key={hashtag} onPress={() => onSelect(hashtag)} style={hashtags.includes(hashtag) ? styles.buttonNed : styles.button}>
              <Text {...props} style={[hashtags.includes(hashtag) ? styles.textNed : styles.text, props.style]}>
                {hashtag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.editProfile_container}>
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

AvatarAndHashtags.navigationOptions = ({ navigation }) => ({
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
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
      <View style={{ marginRight: moderateScale(35), width: 50 }}>
        <Text style={styles.onBoardin_login}>Skip</Text>
      </View>
    </TouchableOpacity>
  ),
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
  hashtagsContainer: {
    paddingHorizontal: '25@ms1',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: '8@ms1',
    display: 'flex',
    height: '36@ms1',
    paddingHorizontal: '25@ms1',
    borderRadius: '18@ms1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '14@ms1',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1A1C2B',
  },
  text: {
    fontFamily: 'sf-ui',
    fontSize: '14@ms1',
    color: '#1A1C2B',
  },
  buttonNed: {
    marginRight: '8@ms1',
    display: 'flex',
    height: '36@ms1',
    paddingHorizontal: '25@ms1',
    borderRadius: '18@ms1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '14@ms1',
    backgroundColor: '#1A1C2B',
    borderWidth: 1,
    borderColor: '#1A1C2B',
  },
  textNed: {
    fontFamily: 'sf-ui',
    fontSize: '14@ms1',
    color: '#fff',
  },
  onBoardin_login: {
    fontSize: '14@ms1',
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
  },
});

const UPDATE_USER = gql`
  mutation updateProfile($hashtags: [String]) {
    updateProfile(hashtags: $hashtags) {
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
