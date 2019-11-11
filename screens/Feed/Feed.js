import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { openDay, clearDay } from './../../store/actions/days';
// UI COMPONENTS
import { BaseTitle, BaseInput, MasterButton, SearchInput } from './../../components/ui/index';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

// CONTEXTS
import FeedItem2 from './FeedItem2/FeedItem2';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import OpenDayBottomContainer from '../../components/openDayBottomContainer/OpenDayBottomContainer';

export default function Feed(props) {
  const [refreshing, setRefreshing] = useState(false);

  const { loading, error, data: { getDays = [] } = {}, refetch } = useQuery(GET_DAYS);

  _onRefresh = () => {
    setRefreshing(true);
    console.log('refreshing');
    refetch();
    setRefreshing(false);
  };
  const day = useSelector(state => state.days.day);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}>
        {loading ? <ActivityIndicator size="large" /> : <Text></Text>}
        <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />} data={getDays} keyExtractor={item => item.id.toString()} renderItem={day => <FeedItem2 navigation={props.navigation} day={day} />} />
      </ScrollView>
      {day.id ? <OpenDayBottomContainer props={props} /> : <View></View>}
    </View>
  );
}

Feed.navigationOptions = {
  headerTitle: 'oneDay',
  headerTitleStyle: {
    fontFamily: 'libre-baskerville-bold',
    fontSize: moderateScale(16, 1),
    color: '#1A1C2B',
    flex: 1,
    textAlign: 'center',
    fontWeight: null,
  },
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const GET_DAYS = gql`
  query getDays {
    getDays {
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
