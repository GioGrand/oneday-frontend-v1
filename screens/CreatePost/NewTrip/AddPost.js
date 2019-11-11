import React, { useState, useEffect } from 'react';
import { Dimensions, Text, TouchableWithoutFeedback, StyleSheet, View, Button, Alert, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign } from './../../../components/ui/index';
import { ScaledSheet } from 'react-native-size-matters';
// CONTEXTS
import { updatePost } from './../../../store/actions/days';
// GRAPHQL
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';
import { useMutation } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
// FILTERS
import FilterSaturate from '../../../utils/imageManipulation/filterSaturate';
import FilterBW from '../../../utils/imageManipulation/filterBW';
import NoFilter from '../../../utils/imageManipulation/noFilter';

const screenWidth = Math.round(Dimensions.get('window').width) - 60;

export default function AddPost(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const post = useSelector(state => state.days.post);

  snap = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      const manipResult = await ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: 700, heigth: 700 } }], { compress: 1, format: ImageManipulator.SaveFormat.PNG });
      dispatch(updatePost('localOriginalImageUri', manipResult.uri));
      dispatch(updatePost('localFilteredImageUri', manipResult.uri));
      const newImage = new ReactNativeFile({
        uri: manipResult.uri,
        type: 'image/png',
        name: 'i-am-a-name',
      });
      //console.log('NEW_IMAGE', newImage);
      dispatch(updatePost('imageObjToUpload', newImage));
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
    });
    const manipResult = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { width: 700, heigth: 700 } }], { compress: 1, format: ImageManipulator.SaveFormat.PNG });
    dispatch(updatePost('localOriginalImageUri', manipResult.uri));
    dispatch(updatePost('localFilteredImageUri', manipResult.uri));
    const newImage = new ReactNativeFile({
      uri: manipResult.uri,
      type: 'image/png',
      name: 'i-am-a-name',
    });
    //console.log('NEW_IMAGE', newImage);
    dispatch(updatePost('imageObjToUpload', newImage));
  };

  const [addImage, { data, loading }] = useMutation(ADD_IMAGE, {
    variables: {
      file: post.imageObjToUpload,
    },
    update(_, result) {
      console.log('DAJE', result.data.singleUpload.path);
      console.log('dispatching');
      dispatch(updatePost('postImageHiRes', result.data.singleUpload.path));
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const asyncSave = () => {
    if (!post.localOriginalImageUri) {
      console.log('No image, Ill upload');
      addImage();
    }
    props.navigation.navigate('AddLocation');
  };

  const updateImageAfterFilter = url => {
    dispatch(updatePost('localFilteredImageUri', url));
    const newImage = new ReactNativeFile({
      uri: url,
      type: 'image/png',
      name: 'i-am-a-name',
    });
    // console.log('NEW_IMAGE', newImage);
    dispatch(updatePost('imageObjToUpload', newImage));
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await Location.getCurrentPositionAsync({
          timeout: 5000,
        });
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;
        dispatch(updatePost('lat', lat));
        dispatch(updatePost('lng', lng));

        return { lat, lng };
      } catch (err) {
        Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map.', [{ text: 'Okay' }]);
      }
    };
    getLocation();
    props.navigation.setParams({ saveImage: asyncSave });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <BaseTitle>Upload your photo</BaseTitle>
      <View style={{ flex: 1, height: screenWidth, maxHeight: screenWidth, borderRadius: 15, overflow: 'hidden' }}>
        {!post.localOriginalImageUri ? (
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1, borderRadius: 20 }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                borderRadius: 20,
              }}
            ></View>
          </Camera>
        ) : (
          <Image style={{ flex: 1, borderRadius: 20 }} source={{ uri: post.localFilteredImageUri ? post.localFilteredImageUri : post.localOriginalImageUri }} />
        )}
      </View>
      {!post.localOriginalImageUri ? (
        <MasterButton loading={false} onPress={snap}>
          Take picture
        </MasterButton>
      ) : (
        <MasterButton loading={false} onPress={() => dispatch(updatePost('localOriginalImageUri', ''))}>
          Re-take picture
        </MasterButton>
      )}
      <MasterButton loading={false} onPress={_pickImage}>
        Pick from Camera Roll
      </MasterButton>

      <ScrollView showsHorizontalScrollIndicator={false} style={styles.filterContainer} horizontal="true">
        <View style={styles.cameraMask}>{!post.localOriginalImageUri ? <Text></Text> : <NoFilter update={updateImageAfterFilter} url={post.localOriginalImageUri} />}</View>
        <View style={styles.cameraMask}>{!post.localOriginalImageUri ? <Text></Text> : <FilterBW update={updateImageAfterFilter} url={post.localOriginalImageUri} />}</View>
        <View style={styles.cameraMask}>{!post.localOriginalImageUri ? <Text></Text> : <FilterSaturate update={updateImageAfterFilter} url={post.localOriginalImageUri} />}</View>
      </ScrollView>
    </ScrollView>
  );
}

AddPost.navigationOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('FeedStack')}>
      <View style={{ marginLeft: 30, width: 50 }}>
        <AntDesign name="close" size={20} />
      </View>
    </TouchableWithoutFeedback>
  ),
  headerRight: (
    <TouchableWithoutFeedback onPress={navigation.getParam('saveImage')}>
      <View style={{ marginRight: 0, width: 50 }}>
        <Text>Save</Text>
      </View>
    </TouchableWithoutFeedback>
  ),
});

const styles = ScaledSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  filterContainer: {
    height: 170,
    maxHeight: 170,
  },
  cameraMask: {
    // backgroundColor: '#F3F3F3',
    height: 150,
    maxHeight: 150,
    width: 150,
    marginRight: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});

const ADD_IMAGE = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      path
    }
  }
`;
