import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, TouchableOpacity, Dimensions, Text, TouchableWithoutFeedback, StyleSheet, View, Button, Alert, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, BaseInput, AntDesign } from './../../../components/ui/index';
// CONTEXTS
import { updatePost, pushPostToDay, clearPost } from './../../../store/actions/days';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import MapView from 'react-native-maps';
import { generatedMapStyle } from '../../../utils/maps/mapStyle';

export default function AddLocation(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { postImageHiRes, title, lat, lng } = useSelector(state => state.days.post);
  const day = useSelector(state => state.days.day.id);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result.data.createPost);
      dispatch(pushPostToDay(result.data.createPost));
      props.navigation.navigate('Feed');
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { postImageHiRes, title, lat, lng, day },
  });

  const handlePost = () => {
    console.log('trying to save');
    console.log(title, lat, lng, day, postImageHiRes);
    createPost();
  };

  useEffect(() => {
    props.navigation.setParams({ savePost: handlePost });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        {Object.keys(errors).length > 0 &&
          Object.values(errors).map(el => {
            console.log('logging from here', el);
            return <Text key={el}>{el}</Text>;
          })}
        <BaseTitle>Add location</BaseTitle>
        <BaseInput placeholder="Sagrada Familia" label="Location" onChangeText={e => dispatch(updatePost('title', e))} value={title} />
      </View>
      <View style={styles.lowerContainer}>
        {lat && (
          <MapView
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={generatedMapStyle}
            style={styles.mapStyle}
          >
            <MapView.Marker coordinate={{ latitude: lat, longitude: lng }} title="My Marker" description="Some description" />
          </MapView>
        )}
      </View>
    </View>
  );
}

AddLocation.navigationOptions = ({ navigation }) => ({
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
    <TouchableWithoutFeedback onPress={navigation.getParam('savePost')}>
      <View style={{ marginRight: 0, width: 50 }}>
        <Text>Save</Text>
      </View>
    </TouchableWithoutFeedback>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
  },
  upperContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    minHeight: 250,
    maxHeight: 250,
    backgroundColor: '#fff',
    borderRadius: 30,
    zIndex: 1,
  },
  lowerContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#f3f3f3',
    zIndex: 0,
  },
  mapStyle: {
    width: '100%',
    height: '115%',
  },
});

const CREATE_POST = gql`
  mutation createPost($title: String!, $postImageHiRes: String!, $lat: Float, $lng: Float, $day: ID!) {
    createPost(title: $title, postImageHiRes: $postImageHiRes, lat: $lat, lng: $lng, day: $day) {
      id
      postImageHiRes
    }
  }
`;
