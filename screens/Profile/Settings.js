import React, { useState, useEffect } from 'react';
import { SafeAreaView, Switch, StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign, BaseInput } from '../../components/ui/index';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import { logout, login } from './../../store/actions/auth';
import { clearDay } from './../../store/actions/days';

export default function Settings(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const [updateProfile, { loading }] = useMutation(UPDATE_USER, {
    update(_, result) {
      dispatch(login(result.data.updateProfile));
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { notifications, emailNotifications },
  });

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    setTimeout(function() {
      updateProfile();
    }, 100);
  };

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
    setTimeout(function() {
      updateProfile();
    }, 100);
  };

  const handleLogout = () => {
    dispatch(clearDay());
    dispatch(logout());
    props.navigation.navigate('AuthLoading');
  };

  useEffect(() => {
    setEmailNotifications(user.user.emailNotifications);
    setNotifications(user.user.notifications);
  }, []);

  return (
    <ScrollView>
      <View style={styles.settings_container}>
        <BaseTitle style={styles.baseTitle}>Profile</BaseTitle>

        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('EditProfile')}>
          <View style={styles.profileCard}>
            <View>
              <Text style={styles.upperText}>Personal information</Text>
              <Text style={styles.lowerText}>Username, email and interests </Text>
            </View>
            <View style={styles.rightContainer}>
              <AntDesign name="arrowright" size={20} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Email notifications</Text>
            <Text style={styles.lowerText}>Lorem ipsum dolor sit </Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch trackColor={{ true: '#ff3333', false: 'grey' }} onValueChange={handleToggleEmailNotifications} value={emailNotifications} />
          </View>
        </View>
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Push notifications</Text>
            <Text style={styles.lowerText}>Lorem ipsum dolor sit </Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch trackColor={{ true: '#ff3333', false: 'grey' }} onValueChange={handleToggleNotifications} value={notifications} />
          </View>
        </View>
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Get help</Text>
            <Text style={styles.lowerText}>Lorem ipsum dolor sit </Text>
          </View>
          <View style={styles.rightContainer}>
            <AntDesign name="arrowright" size={20} />
          </View>
        </View>
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Give use feedback</Text>
            <Text style={styles.lowerText}>Lorem ipsum dolor sit </Text>
          </View>
          <View style={styles.rightContainer}>
            <AntDesign name="arrowright" size={20} />
          </View>
        </View>
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Terms of service</Text>
            <Text style={styles.lowerText}>Lorem ipsum dolor sit </Text>
          </View>
          <View style={styles.rightContainer}>
            <AntDesign name="arrowright" size={20} />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleLogout}>
          <View style={styles.profileCard}>
            <View>
              <Text style={styles.upperText}>Logout</Text>
              <Text style={styles.lowerText}>Go back to login</Text>
            </View>
            <View style={styles.rightContainer}>
              <AntDesign name="arrowright" size={20} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}

Settings.navigationOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
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
  settings_container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  baseTitle: {
    marginLeft: '25@ms1',
  },
  profileCard: {
    marginHorizontal: '25@ms1',
    borderBottomWidth: 1,
    borderBottomColor: '#8a8a8f',
    flex: 1,
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  upperText: {
    fontFamily: 'sf-ui',
    color: '#1A1C2B',
    paddingBottom: '3@ms1',
    paddingTop: '25@ms1',
    fontSize: '18@ms1',
  },
  lowerText: {
    fontFamily: 'sf-ui',
    color: '#8a8a8f',
    paddingBottom: '25@ms1',
    paddingTop: '1@ms1',
    fontSize: '14@ms1',
  },
});

const UPDATE_USER = gql`
  mutation updateProfile($notifications: Boolean!, $emailNotifications: Boolean!) {
    updateProfile(notifications: $notifications, emailNotifications: $emailNotifications) {
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
