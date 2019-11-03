import React, { useState } from 'react';
import { SafeAreaView, Dimensions, Text, TouchableWithoutFeedback, StyleSheet, View, Button, Alert, Image, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

import { BaseTitle } from '../../components/ui/BaseTitle';
import { MasterButton } from './../../components/ui/MasterButton';

const screenWidth = Math.round(Dimensions.get('window').width) - 60;

export default function AddPost(props) {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert('Insufficient permissions.', [{ text: 'Okay' }]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    setPickedImage(image.uri);
    console.log('from after shooting', pickedImage);

    const manipResult = await ImageManipulator.manipulateAsync(image.uri, [{ resize: { width: 700, heigth: 700 } }], { compress: 1, format: ImageManipulator.SaveFormat.PNG });
    console.log('manipResult', manipResult.uri);
  };

  return (
    <View style={styles.container}>
      <BaseTitle>Upload your photo</BaseTitle>
      <View style={styles.cameraMask}>{!pickedImage ? <Text>No image picked yet</Text> : <Image style={styles.image} source={{ uri: pickedImage }} />}</View>
      <MasterButton loading={false} onPress={takeImageHandler}>
        Take picture
      </MasterButton>
    </View>
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
    <TouchableWithoutFeedback onPress={() => navigation.navigate('FeedStack')}>
      <View style={{ marginRight: 0, width: 50 }}>
        <AntDesign name="arrowright" size={20} />
      </View>
    </TouchableWithoutFeedback>
  ),
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    justifyContent: 'flex-start',
  },
  cameraMask: {
    backgroundColor: 'red',
    height: screenWidth,
    maxHeight: screenWidth,
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    borderRadius: 20,
  },
});
