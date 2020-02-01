import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Image, Text, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// GRAPHQL
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign, RoundedButtonNegative } from './../../components/ui/index';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';
import FeedItem2 from './../Feed/FeedItem2/FeedItem2';


export default function SearchResult(props) {
  const searchQuery = props.navigation.getParam('city', 'default value');
  console.log(searchQuery);

  const [refreshing, setRefreshing] = useState(false);

  const { loading, error, data: { getDaysByLocation = [] } = {}, refetch } = useQuery(GET_DAYS_BY_LOCATION, {
    variables: { searchQuery },
  });

  console.log(getDaysByLocation);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}>
        {loading ? <ActivityIndicator size="large" /> : <Text></Text>}
        <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />} data={getDaysByLocation} keyExtractor={item => item.id.toString()} renderItem={day => <FeedItem2 navigation={props.navigation} day={day} />} />
      </ScrollView>
    </View>
  );
}

SearchResult.navigationOptions = ({ navigation }) => ({
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
  headerRight: null,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const GET_DAYS_BY_LOCATION = gql`
  query getDaysByLocation($searchQuery: String!) {
    getDaysByLocation(searchQuery: $searchQuery) {
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
