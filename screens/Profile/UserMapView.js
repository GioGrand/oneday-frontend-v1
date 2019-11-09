import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';
import { BaseTitle, MasterButton, BaseInput, AntDesign } from './../../components/ui/index';

// GRAPHQL
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// COMPONENT SPECIFIC
import MapView, { Polyline } from 'react-native-maps';
import { generatedMapStyle } from '../../utils/maps/mapStyle';
import openMap from 'react-native-open-maps';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function UserMapView({ profile, navigation }) {
  const list = JSON.parse(navigation.getParam('list', 'default value'));

  onLayout = () => {
    setTimeout(() => {
      map.fitToCoordinates(list, { edgePadding: { top: 100, right: 100, bottom: 200, left: 100 }, animated: true });
    }, 100);
  };

  return (
    <View style={styles.description_container}>
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
        {list.length > 0 &&
          list.map((post, key) => (
            <MapView.Marker key={key} onPress={() => console.log('Ciao')} coordinate={{ latitude: post.latitude, longitude: post.longitude }} title={post.title}>
              <View style={styles.selectedCircle}>
                <Image style={styles.image} source={{ uri: post.image }} />
              </View>
            </MapView.Marker>
          ))}
      </MapView>
    </View>
  );
}

UserMapView.navigationOptions = ({ navigation }) => ({
  title: '',
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={{ marginLeft: 30, width: 50 }}>
        <AntDesign style={{ color: '#000' }} name="arrowleft" size={20} />
      </View>
    </TouchableWithoutFeedback>
  ),
});

const styles = ScaledSheet.create({
  description_container: {
    width: screenWidth,
    height: screenHeight,
    zIndex: 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  selectedCircle: {
    width: '50@ms1',
    height: '50@ms1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5@ms1',
  },
  image: {
    width: '50@ms1',
    height: '50@ms1',
    borderRadius: '5@ms1',
  },
});
