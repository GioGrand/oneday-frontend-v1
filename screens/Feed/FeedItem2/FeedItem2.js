import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { BaseTitle, BaseInput, MasterButton, AntDesign, StyledText } from '../../../components/ui/index';
import FadeIn from 'react-native-fade-in-image';
import { useSelector, useDispatch } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import { setDetailedDay } from '../../../store/actions/days';
import AvatarContainer from './elements/AvatarContainer';
import UserHeader from './elements/UserHeader';
import ImagesContainerSingle from './elements/ImagesContainerSingle';
import ImagesContainerScroll from './elements/ImagesContainerScroll';
import DescriptionHashtags from './elements/DescriptionHashtags';
import LikeSave from './elements/LikeSave';

const screenWidth = Math.round(Dimensions.get('window').width) - 50;

export default function FeedItem2(props) {
  let randomImage = Math.floor(Math.random() * 30);

  const { item } = props.day;

  return (
    <View style={styles.feedItem_Container}>
      <View style={styles.feedItem_avatarContainer}>
        <AvatarContainer item={item} />
      </View>
      <View style={styles.feedItem_postContainer}>
        <UserHeader item={item} />
        {randomImage < 15 ? <ImagesContainerSingle day={item} navigation={props.navigation} /> : <ImagesContainerScroll day={item} navigation={props.navigation} />}
        <DescriptionHashtags />
        <LikeSave />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  feedItem_Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '20@ms1',
  },
  feedItem_avatarContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  feedItem_postContainer: {
    flex: 9,
  },
});

// <TouchableWithoutFeedback onPress={onSelect}>
//   <View style={styles.container}>
//     <TopUserTitle post={item} />
//     <ImageGroupContainer post={item} />
//     <TextContainer post={item} />
//     <WeatherLikesContainer post={item} />
//   </View>
// </TouchableWithoutFeedback>
