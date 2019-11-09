import React from 'react';
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

export default function UserMapPreviewItem({ list, navigation }) {
  onLayout = () => {
    setTimeout(() => {
      map.fitToCoordinates(list, { edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }, animated: true });
    }, 50);
  };

  return (
    <View style={styles.description_container}>
      {list.length >= 1 ? (
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
          zoomEnabled={false}
          scrollEnabled={false}
          onPress={() =>
            navigation.navigate('UserMapView', {
              list: JSON.stringify(list),
            })
          }
        >
          {list.length > 0 &&
            list.map((dot, key) => (
              <MapView.Marker key={dot.postId} onPress={() => console.log('sfdg')} coordinate={{ latitude: dot.latitude, longitude: dot.longitude }} title={dot.title}>
                <View style={styles.selectedCircle}>
                  <Image style={styles.image} source={{ uri: dot.image }} />
                </View>
              </MapView.Marker>
            ))}
        </MapView>
      ) : (
        <Text></Text>
      )}
    </View>
  );
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
  mapStyle: {
    width: '100%',
    height: '120%',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'sf-ui-bold',
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
