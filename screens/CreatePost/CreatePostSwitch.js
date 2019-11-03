import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
// UI COMPONENTS
// UI COMPONENTS
import { BaseTitle, MasterButton, MasterButtonNegative, AntDesign } from './../../components/ui/index';
import { ScaledSheet } from 'react-native-size-matters';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { openDay, clearDay } from './../../store/actions/days';
// COMPONENT SPECIFIC
import { verifyPermissions } from './../../utils/permissions/askPermissions';
// CONTEXTS

export default function CreatePostSwitch(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const day = useSelector(state => state.days.day);

  const [createDay, { data, loading }] = useMutation(CREATE_DAY, {
    update(_, result) {
      dispatch(openDay(result.data.createDay.id));
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const checkPermissionAndRedirect = async page => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    createDay();
    props.navigation.navigate(page);
  };

  useEffect(() => {
    if (day.id) props.navigation.navigate('AddPost');
  }, []);

  return (
    <View style={styles.loginGroup}>
      <View style={styles.topContainer}></View>
      <View style={styles.bottomContainer}>
        <View style={styles.close_container}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Feed')}>
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
        </View>
        <BaseTitle>Start a day trip</BaseTitle>
        <Text style={styles.description_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        <MasterButton loading={loading} onPress={() => checkPermissionAndRedirect('AddPost')}>
          Track my trip
        </MasterButton>
        <MasterButtonNegative loading={false} onPress={() => checkPermissionAndRedirect('AddPost')}>
          Add past trip
        </MasterButtonNegative>
      </View>
    </View>
  );
}

CreatePostSwitch.navigationOptions = {
  title: null,
  headerLeft: null,
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
};

const styles = ScaledSheet.create({
  description_text: {
    fontFamily: 'sf-ui',
    color: '#8a8a8f',
    marginBottom: '15@ms1',
  },
  loginGroup: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  topContainer: {
    flex: 3,
    alignItems: 'center',
  },
  bottomContainer: {
    padding: '30@ms1',
    borderTopLeftRadius: '20@ms1',
    borderTopRightRadius: '20@ms1',
    paddingBottom: '60@ms1',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  close_container: {
    alignItems: 'flex-end',
  },
});

const CREATE_DAY = gql`
  mutation {
    createDay {
      id
    }
  }
`;
