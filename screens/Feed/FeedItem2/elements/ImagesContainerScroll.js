import React from 'react';
import { Image, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import { setDetailedDay } from '../../../../store/actions/days';

export default function ImagesContainerScroll(props) {
  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';
  const dispatch = useDispatch();

  const onSelect = () => {
    dispatch(setDetailedDay(props.day));
    props.navigation.navigate('DetailedDay', {
      dayId: props.day.id,
    });
  };

  return (
    <View style={styles.imagesContainer_container}>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.horizontalScrollFilter} horizontal="true">
        {props.day.posts &&
          props.day.posts.map(post => {
            return (
              <TouchableWithoutFeedback onPress={onSelect} key={post.id}>
                <View style={styles.scrollableImage}>
                  <FadeIn>
                    <Image style={styles.imagesContainer_image} source={{ uri: post.postImageHiRes }} />
                  </FadeIn>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = ScaledSheet.create({
  imagesContainer_container: {
    flex: 1,
    marginTop: '20@ms1',
  },
  scrollableImage: {
    width: '150@ms1',
    height: '150@ms1',
    overflow: 'hidden',
    borderRadius: '8@ms1',
    marginRight: '12@ms1',
  },
  imagesContainer_image: {
    width: '100%',
    resizeMode: 'cover',
    width: '150@ms1',
    height: '150@ms1',
  },
});
