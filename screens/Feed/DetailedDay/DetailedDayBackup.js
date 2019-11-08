import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { BaseTitle, MasterButton, BaseInput, AntDesign } from './../../../components/ui/index';
// CONTEXTS
import { updatePost, pushPostToDay, clearPost, setDetailedDay, setDetailedPost } from './../../../store/actions/days';
// GRAPHQL
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import MapView, { Polyline } from 'react-native-maps';
import { generatedMapStyle } from '../../../utils/maps/mapStyle';
import FadeIn from 'react-native-fade-in-image';
import UserMainDescription from './elements/UserMainDescription';
import LikeSave from '../FeedItem2/elements/LikeSave';
import DescriptionHashtags from '../FeedItem2/elements/DescriptionHashtags';
import openMap from 'react-native-open-maps';
import { SliderBox } from 'react-native-image-slider-box';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

let images = ['https://source.unsplash.com/1024x768/?nature', 'https://source.unsplash.com/1024x768/?water', 'https://source.unsplash.com/1024x768/?girl', 'https://source.unsplash.com/1024x768/?tree'];

export default function DetailedDay(props) {
  const dispatch = useDispatch();
  const dayId = props.navigation.getParam('dayId', 'default value');

  const currentDay = useSelector(state => state.days.detailedDay);
  const currentPost = useSelector(state => state.days.detailedPost);

  let newArray = [];
  for (let i = 0; i < currentDay.posts.length; i++) {
    let newObj = {
      latitude: currentDay.posts[i].location.coordinates[0],
      longitude: currentDay.posts[i].location.coordinates[1],
    };
    newArray.push(newObj);
  }
  console.log(newArray);

  useEffect(() => {
    dispatch(setDetailedPost(currentDay.posts[0]));
  }, []);

  onLayout = () => {
    setTimeout(() => {
      map.fitToCoordinates(newArray, { edgePadding: { top: 100, right: 100, bottom: 200, left: 100 }, animated: true });
    }, 100);
  };

  _goToYosemite = () => {
    openMap({ query: `${currentDay.posts[1].location.coordinates[0]}, ${currentDay.posts[1].location.coordinates[1]}`, provider: 'google' });
  };

  return (
    <View style={styles.dayContainer}>
      {/*    <View style={styles.topImage_container}>{currentPost ? <Image style={styles.topImage_image} source={{ uri: currentPost.postImageHiRes }} /> : <Text></Text>}</View> */}
      <View style={styles.topImage_container}>
        <SliderBox sliderBoxHeight={screenWidth} images={images} onCurrentImagePressed={index => console.warn(`image ${index} pressed`)} />
      </View>

      <UserMainDescription />
      <ScrollView>
        <View style={{ minHeight: 70, zIndex: 0 }}></View>

        <View style={styles.midContainer}>
          <Text style={styles.label}>MY DAY IN:</Text>
          <Text style={styles.city}>Barcelona</Text>
          <Text style={styles.description_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>

          <Text style={styles.label}>MY STOPS:</Text>

          <View style={styles.number_container}>
            <View style={styles.number_circle}>
              <Text style={styles.number}>1</Text>
            </View>

            <Text style={styles.stop_title}>{currentPost.title}</Text>
          </View>

          <View style={styles.horizontalScroll}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal="true">
              {currentDay.posts &&
                currentDay.posts.map(post => {
                  return (
                    <TouchableWithoutFeedback onPress={() => dispatch(setDetailedPost(post))} key={post.id}>
                      {post.id === currentPost.id ? (
                        <View style={styles.scrollableImage}>
                          <Image style={styles.scrollableImage_image} source={{ uri: post.postImageHiRes }} />
                        </View>
                      ) : (
                        <View style={styles.scrollableImage}>
                          <Image style={styles.scrollableImage_image} source={{ uri: post.postImageHiRes }} />
                        </View>
                      )}
                    </TouchableWithoutFeedback>
                  );
                })}
            </ScrollView>
          </View>

          <DescriptionHashtags item={currentDay} />
          <LikeSave item={currentDay} />
          <Text onPress={_goToYosemite}>Open in Google Maps</Text>
          <View style={{ height: 20 }}></View>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: 41.391798,
              longitude: 2.16511,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            ref={map => {
              this.map = map;
            }}
            onLayout={onLayout}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={generatedMapStyle}
            style={styles.mapStyle}
          >
            {currentDay.posts.length > 0 &&
              currentDay.posts.map((post, key) => (
                <MapView.Marker key={post.id} onPress={() => dispatch(setDetailedPost(post))} coordinate={{ latitude: post.location.coordinates[0], longitude: post.location.coordinates[1] }} title={post.title}>
                  {post.id === currentPost.id ? (
                    <View style={styles.selectedCircle}>
                      <Text style={styles.pinText}>{key + 1}</Text>
                    </View>
                  ) : (
                    <View style={styles.circle}>
                      <Text style={styles.pinText}>{key + 1}</Text>
                    </View>
                  )}
                </MapView.Marker>
              ))}
          </MapView>
        </View>
      </ScrollView>
    </View>
  );
}

DetailedDay.navigationOptions = ({ navigation }) => ({
  title: '',
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={{ marginLeft: 30, width: 50 }}>
        <AntDesign style={{ color: '#ffffff' }} name="arrowleft" size={20} />
      </View>
    </TouchableWithoutFeedback>
  ),
});

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    backgroundColor: '#453455',
  },
  topImage_container: {
    width: screenWidth,
    height: screenWidth,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topImage_image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'cover',
  },

  label: {
    fontFamily: 'sf-ui-bold',
    color: '#8a8a8f',
    fontSize: 12,
    marginBottom: 0,
  },
  city: {
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
    fontSize: 26,
    marginBottom: 10,
  },
  description_text: {
    fontFamily: 'sf-ui',
    color: '#8a8a8f',
    marginBottom: 15,
  },
  number_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  number_circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: 'sf-ui-bold',
    color: '#fff',
    fontSize: 16,
  },
  stop_title: {
    flex: 1,
    fontFamily: 'sf-ui-semibold-italic',
    color: '#1A1C2B',
    fontSize: 22,
    marginLeft: 10,
  },
  horizontalScroll: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  midContainer: {
    width: screenWidth,
    marginTop: 500,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 25,
    paddingBottom: 0,
    // height: 200,
    zIndex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20.35,
  },
  scrollableImage_image: {
    width: 125,
    height: 125,
    borderRadius: 5,
  },
  circle: {
    width: 35,
    height: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 2,
    backgroundColor: '#1A1C2B',
  },
  selectedCircle: {
    width: 35,
    height: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 2,
    backgroundColor: '#FF6251',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'sf-ui-bold',
  },
  mapContainer: {
    width: screenWidth,
    height: screenWidth,
    zIndex: 0,
    marginTop: -20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  mapStyle: {
    width: '100%',
    height: '120%',
  },

  scrollableImage: {
    marginRight: 10,
    borderRadius: 5,
  },
});
