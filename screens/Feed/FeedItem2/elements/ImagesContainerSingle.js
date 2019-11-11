import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import { setDetailedDay } from '../../../../store/actions/days';

export default function ImagesContainerSingle(props) {
  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';
  const dispatch = useDispatch();

  const onSelect = () => {
    console.log('/////////////////////////////////////////', props.day);
    dispatch(setDetailedDay(props.day));
    props.navigation.navigate('DetailedDay', {
      dayId: props.day.id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.imagesContainer_container}>
        <FadeIn>
          <Image style={styles.imagesContainer_image} source={{ uri: props.day.posts[0].postImageHiRes }} />
        </FadeIn>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  imagesContainer_container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    marginTop: '20@ms1',
    borderRadius: '8@ms1',
    overflow: 'hidden',
    marginRight: '12@ms1',
  },
  imagesContainer_image: {
    width: '100%',
    minHeight: '200@ms1',
    resizeMode: 'cover',
  },
});
