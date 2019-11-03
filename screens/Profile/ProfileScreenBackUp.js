import React, { useState } from 'react';
import { SafeAreaView, Switch, StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign } from '../../components/ui/index';

import { logout } from './../../store/actions/auth';

export default function ProfileScreenBackup(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  console.log(user.user);

  const [value, setValue] = useState();
  const [toggle, setToggle] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    props.navigation.navigate('AuthLoading');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BaseTitle style={{ paddingLeft: 35 }}>Profile</BaseTitle>
        {user && <Text>{user.user.email}</Text>}
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Email notifications</Text>
            <Text style={styles.lowerText}>Set you streaming preference </Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch trackColor={{ true: '#FF6251', false: 'grey' }} onValueChange={() => setToggle(!toggle)} value={toggle} />
          </View>
        </View>
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.upperText}>Faq</Text>
            <Text style={styles.lowerText}>Set you streaming preference </Text>
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

ProfileScreen.navigationOptions = {
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  profileCard: {
    paddingLeft: 35,
    paddingRight: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1C2B',
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
    paddingBottom: 5,
    paddingTop: 30,
    fontSize: 22,
  },
  lowerText: {
    fontFamily: 'sf-ui',
    color: '#1A1C2B',
    paddingBottom: 30,
    paddingTop: 5,
    fontSize: 16,
  },
});
