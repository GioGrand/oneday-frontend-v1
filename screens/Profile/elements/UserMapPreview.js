import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';
const screenWidth = Math.round(Dimensions.get('window').width);
// GRAPHQL
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import MapView, { Polyline } from 'react-native-maps';
import { generatedMapStyle } from '../../../utils/maps/mapStyle';
import openMap from 'react-native-open-maps';
import UserMapPreviewItem from './UserMapPreviewItem';

export default function UserMapPreview({ profile, navigation }) {
  function convertToArray(response) {
    const dots = [];
    for (let i = 0; i < response.length; i++) {
      for (let y = 0; y < response[i].posts.length; y++) {
        console.log('Im a post', response[i].posts[y].postImageHiRes);
        let newDot = {
          title: response[i].posts[y].title,
          image: response[i].posts[y].postImageHiRes,
          dayId: response[i].id,
          postId: response[i].posts[y].id,
          latitude: response[i].posts[y].location.coordinates[0],
          longitude: response[i].posts[y].location.coordinates[1],
        };
        dots.push(newDot);
      }
    }
    console.log(dots);
    return dots;
  }

  const [loaded, setloaded] = useState(false);
  const userId = profile.id;
  console.log(userId);

  const { loading, error, data: { getDaysByUser = [] } = {}, refetch } = useQuery(GET_DAYS_BY_USER, {
    variables: { userId },
  });

  console.log(getDaysByUser);

  if (!getDaysByUser) {
    postMarkup = <Text>Loading data</Text>;
  } else {
    let result = convertToArray(getDaysByUser);
    if (result) {
      postMarkup = (
        <View style={styles.description_container}>
          <UserMapPreviewItem navigation={navigation} list={result} />
        </View>
      );
    }
  }

  return postMarkup;
}

const styles = ScaledSheet.create({
  description_container: {
    width: screenWidth,
    height: screenWidth - 100,
    zIndex: 0,
    marginVertical: '-20@ms1',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

const GET_DAYS_BY_USER = gql`
  query getDaysByUser($userId: ID!) {
    getDaysByUser(userId: $userId) {
      id
      locationName
      description
      weatherType
      likesCount
      likes {
        userName
      }
      temperature
      open
      author {
        id
        userName
        profileImageLowRes
      }
      favouritesCount
      favourites {
        userName
      }
      createdAt
      postsCount
      posts {
        id
        title
        postImageHiRes
        location {
          coordinates
        }
        description
      }
    }
  }
`;

// let dotsForLayout = [];

// for (let i = 0; i < dots.length; i++) {
//   let newObj = {
//     latitude: dots[i].latitude,
//     longitude: dots[i].longitude,
//   };
//   dotsForLayout.push(newObj);
// }

// console.log(dotsForLayout)
