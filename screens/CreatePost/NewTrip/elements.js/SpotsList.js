import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign } from './../../../../components/ui/index';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// CONTEXTS
// GRAPHQL
import gql from 'graphql-tag';

export default function SpotsList({ item }) {
  console.log(item);
  return (
    <View style={styles.spots_container}>
      <View style={styles.spots_image_container}>
        <Image style={{ width: moderateScale(60, 1), height: moderateScale(60, 1), borderRadius: 5 }} source={{ uri: item.item.postImageHiRes }} />
      </View>
      <View style={styles.spots_text_wrapper}>
        <View style={styles.title_wrapper}>
          <Text style={styles.mainTitle}>{item.item.title}</Text>
          <Text style={styles.middleText}>{item.item.description}</Text>
          <Text style={styles.delete_edit}>Edit - Delete</Text>
        </View>
        <View style={styles.buttons_wrapper}>
          <Text>Ciao</Text>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  spots_container: {
    width: '100%',
    minHeight: '60@ms1',
    flexDirection: 'row',
    paddingBottom: '20@ms1',
    //  marginBottom: '20@ms1',
    //  borderBottomWidth: 1,
    //  borderBottomColor: '#8a8a8f',
  },
  spots_image_container: {
    height: '60@ms1',
    width: '60@ms1',
    backgroundColor: '#e3e3e3',
    borderRadius: '5@ms1',
  },
  spots_text_wrapper: {
    flex: 1,
    height: '60@ms1',
    width: '60@ms1',
    marginLeft: '12@ms1',
    flexDirection: 'row',
  },
  title_wrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  buttons_wrapper: {
    width: '60@ms1',
    alignItems: 'flex-end',
  },
  mainTitle: {
    fontFamily: 'sf-ui',
    color: '#1A1C2B',
    fontSize: '16@ms1',
    marginBottom: 0,
  },
  delete_edit: {
    fontFamily: 'sf-ui',
    color: '#8a8a8f',
    fontSize: '12@ms1',
  },
  middleText: {
    fontFamily: 'sf-ui',
    color: '#8a8a8f',
    fontSize: '14@ms1',
  },
});
