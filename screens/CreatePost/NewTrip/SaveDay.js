import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign, MasterButtonIcon } from './../../../components/ui/index';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// CONTEXTS
import { clearDay } from '../../../store/actions/days';
// GRAPHQL
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';
import { useMutation } from '@apollo/react-hooks';
import SpotsList from './elements.js/SpotsList';

export default function SaveDay(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');

  const day = useSelector(state => state.days.day.id);
  const dayId = useSelector(state => state.days.day.id);

  const [saveDay, { loading }] = useMutation(SAVE_DAY, {
    update(_, result) {
      console.log(result.data.saveDay);
      dispatch(clearDay());
      props.navigation.navigate('Feed');
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors.message);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { day },
  });

  const [deleteDay] = useMutation(DELETE_DAY, {
    update(_, result) {
      console.log(result.data);
      dispatch(clearDay());
      props.navigation.navigate('Feed');
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { dayId },
  });

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
      }}
      style={{ flex: 1, marginBottom: 40 }}
    >
      <BaseTitle style={styles.baseTitle}>Save day</BaseTitle>

      <View style={styles.login_container}>
        <Text style={styles.label}>SPOTS:</Text>
        <SpotsList />
        <SpotsList />
        <SpotsList />
        <Text style={styles.label}>DETAILS:</Text>
        <BaseInput placeholder="Place" label="Place" onChangeText={e => setPlace(e)} value={place} />
        <BaseInput placeholder="Description" label="Description" onChangeText={e => setDescription(e)} value={description} />

        {Object.keys(errors).length > 0 &&
          Object.values(errors).map(el => {
            console.log('logging from here', el);
            return <Text key={el}>{el}</Text>;
          })}

        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <MasterButton loading={loading} onPress={saveDay}>
            Save day
          </MasterButton>
          <MasterButtonIcon loading={false} onPress={deleteDay}></MasterButtonIcon>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

SaveDay.navigationOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerLeft: (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={{ marginLeft: 30, width: 50 }}>
        <AntDesign name="close" size={20} />
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
  label: {
    fontFamily: 'sf-ui-bold',
    color: '#8a8a8f',
    fontSize: 12,
    marginBottom: '15@ms1',
  },
});

// const styles = StyleSheet.create({
//   loginGroup: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   topContainer: {
//     flex: 3,
//     alignItems: 'center',
//   },
//   bottomContainer: {
//     flex: 1,
//     padding: 30,
//     paddingBottom: 60,
//     justifyContent: 'flex-end',
//   },
// });

const SAVE_DAY = gql`
  mutation saveDay($day: ID!) {
    saveDay(day: $day) {
      id
    }
  }
`;

const DELETE_DAY = gql`
  mutation deleteDay($dayId: ID!) {
    deleteDay(dayId: $dayId)
  }
`;
