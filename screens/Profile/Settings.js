import React, { useState } from 'react';
import { SafeAreaView, Switch, StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BaseTitle, MasterButton, AntDesign } from '../../components/ui/index';
import { logout } from './../../store/actions/auth';

import { ScaledSheet, moderateScale } from 'react-native-size-matters';

export default function Settings(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  console.log(user.user);

  const [toggleEmail, setToggleEmail] = useState(true);
  const [togglePush, setTogglePush] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    props.navigation.navigate('AuthLoading');
  };

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
            <Switch trackColor={{ true: '#ff3333', false: 'grey' }} onValueChange={() => setToggleEmail(!toggleEmail)} value={toggleEmail} />
          </View>
        </View>
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Push notifications</Text>
            <Text style={styles.lowerText}>Lorem ipsum dolor sit </Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch trackColor={{ true: '#ff3333', false: 'grey' }} onValueChange={() => setTogglePush(!togglePush)} value={togglePush} />
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
