import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Text, FlatList, StyleSheet, View, Button, Alert, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, BaseInput, AntDesign } from './../../components/ui/index';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

export default function OpenDayBottomContainer({ props }) {
  const day = useSelector(state => state.days.day);

  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';

  return (
    <View style={styles.bottomActiveDay}>
      <Text style={{ fontFamily: 'sf-ui-bold', color: '#fff', fontSize: 15, marginBottom: 15, marginTop: 10 }}>Your current day</Text>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.filterContainer} horizontal="true">
        {day.posts &&
          day.posts.map(post => {
            return (
              <View style={{ marginRigth: 10, width: 75, height: 60, borderRadius: 5 }} key={post.id}>
                <Image style={{ width: 60, height: 60, borderRadius: 5 }} source={{ uri: post.postImageHiRes || urlR }} />
              </View>
            );
          })}
        <TouchableOpacity style={{ backgroundColor: '#000', borderColor: '#e3e3e3', borderWidth: 1, marginRigth: 10, width: 60, height: 60, borderRadius: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.navigate('AddPost')}>
          <AntDesign name="plus" color="#F3F3F3" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#000', borderColor: '#e3e3e3', borderWidth: 1, marginLeft: 15, width: 60, height: 60, borderRadius: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.navigate('SaveDay')}>
          <Text style={{ fontFamily: 'sf-ui', color: '#F3F3F3' }}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = ScaledSheet.create({
  bottomActiveDay: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: 135,
    backgroundColor: '#000',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 25,
    paddingTop: 15,
    flex: 1,

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 1,
    shadowRadius: 12.35,
  },
  filterContainer: {
    minHeight: 150,
    maxHeight: 150,
    width: '100%',
  },
});
