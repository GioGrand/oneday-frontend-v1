import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { BaseTitle, BaseInput, MasterButton, SearchInput2, AntDesign } from './../../components/ui/index';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export default function SearchScreen(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const { loading, error, data: { citySearch = [] } = {}, refetch } = useQuery(CITIES_QUERY, {
    variables: { searchQuery },
    suspend: false,
  });

  useEffect(() => {
    refetch(searchQuery);
    console.log(citySearch, searchQuery);
  }, [searchQuery]);

  console.log(citySearch);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingLeft: 25, paddingRight: 25, width: '100%' }}>
        <SearchInput2 placeholder="Where do you want to go?" props={props} onChangeText={e => setSearchQuery(e)} value={searchQuery} />
      </View>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={styles.container}>
          {citySearch.length > 0 &&
            searchQuery.length > 3 &&
            citySearch.map(elem => (
              <TouchableWithoutFeedback key={`${elem.name}${elem.country}`} onPress={() => console.log('ciao')}>
                <View style={styles.profileCard}>
                  <View>
                    <Text style={styles.upperText}>{elem.name}</Text>
                    <Text style={styles.lowerText}>{elem.country} </Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <AntDesign name="arrowright" size={20} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

SearchScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileCard: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1C2B',
    flex: 1,
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  upperText: {
    fontFamily: 'sf-ui',
    color: '#1A1C2B',
    paddingBottom: 5,
    paddingTop: 23,
    fontSize: 22,
  },
  lowerText: {
    fontFamily: 'sf-ui',
    color: '#1A1C2B',
    paddingBottom: 23,
    paddingTop: 5,
    fontSize: 16,
  },
});

const CITIES_QUERY = gql`
  query citySearch($searchQuery: String) {
    citySearch(searchQuery: $searchQuery) {
      name
      country
    }
  }
`;
