import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';

// UI COMPONENTS
import { BaseInput, BaseTitle, MasterButton, AntDesign } from './../../components/ui/index';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// GRAPHQL
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// CONTEXTS
import FeedItem2 from './../Feed/FeedItem2/FeedItem2';

export default function FavouritesScreen(props) {
  const [refreshing, setRefreshing] = useState(false);

  const { loading, error, data: { getMyFavourites = [] } = {}, refetch } = useQuery(GET_MY_FAVOURITES);

  console.log(getMyFavourites);

  _onRefresh = () => {
    setRefreshing(true);
    console.log('refreshing');
    refetch();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <BaseTitle style={styles.baseTitle}>Saved trips</BaseTitle>
      <View style={styles.login_container}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}>
          {loading ? <ActivityIndicator size="large" /> : <Text></Text>}
          <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />} data={getMyFavourites} keyExtractor={item => item.id.toString()} renderItem={day => <FeedItem2 navigation={props.navigation} day={day} />} />
        </ScrollView>
      </View>
    </View>
  );
}

FavouritesScreen.navigationOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerLeft: null,
  headerRight: null,
});

const styles = ScaledSheet.create({
  login_container: {
    marginTop: '15@ms1',
    height: '100%',
  },
  baseTitle: {
    marginLeft: '25@ms1',
  },
});

const GET_MY_FAVOURITES = gql`
  query getMyFavourites {
    getMyFavourites {
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
