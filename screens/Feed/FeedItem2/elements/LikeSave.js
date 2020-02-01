import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';

import { BaseTitle, BaseInput, MasterButton, AntDesign, Feather, StyledText } from '../../../../components/ui/index';
// GRAPHQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export default function LikeSave({ item, detailedImage }) {
  let randomLike = Math.floor(Math.random() * 100);
  let randomSaved = Math.floor(Math.random() * 100);

  const user = useSelector(state => state.auth.user);

  const [liked, setLiked] = useState(false);
  const [updatedLike, setUpdatedLike] = useState(0);

  const [favourite, setFavourite] = useState(false);

  console.log(item.likesCount);

  useEffect(() => {
    if (item.author && item.likes.find(like => like.userName === user.userName)) {
      setLiked(true);
    } else setLiked(false);
  }, [item.author, item.likes]);

  useEffect(() => {
    setUpdatedLike(item.likesCount);
  }, []);

  useEffect(() => {
    if (item.author && item.favourites.find(favourite => favourite.userName === user.userName)) {
      setFavourite(true);
    } else setFavourite(false);
  }, []);

  const [likePost] = useMutation(LIKE_DAY_MUTATION, {
    variables: { dayId: item.id },
  });

  const [favouriteDay] = useMutation(FAVOURITE_DAY_MUTATION, {
    variables: { dayId: item.id },
  });

  const handleLike = () => {
    if (liked) {
      setUpdatedLike(updatedLike - 1);
    } else {
      setUpdatedLike(updatedLike + 1);
    }
    setLiked(!liked);
    likePost();
  };

  const handleFavouriteDay = () => {
    setFavourite(!favourite);
    favouriteDay();
  };

  return (
    <View style={styles.imagesContainer_container}>
      {!liked ? (
        <TouchableOpacity onPress={handleLike} style={styles.likes_container}>
          <AntDesign name="hearto" color="#8a8a8f" size={moderateScale(18, 1)} />
          <Text style={styles.likes_text}>{updatedLike}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLike} style={styles.likes_container}>
          <AntDesign name="heart" color="#ff3333" size={moderateScale(18, 1)} />
          <Text style={styles.likes_text}>{item.likesCount}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.comments_container}>
        <AntDesign name="message1" color="#8a8a8f" size={moderateScale(18, 1)} />
        <Text style={styles.likes_text}>4</Text>
      </View>

      {!favourite ? (
        <TouchableOpacity onPress={handleFavouriteDay} style={styles.comments_container}>
          <AntDesign name="staro" color="#8a8a8f" size={moderateScale(18, 1)} />
          <Text style={styles.likes_text}>{!favourite ? 'save' : 'saved'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleFavouriteDay} style={styles.comments_container}>
          <AntDesign name="star" color="#ff3333" size={moderateScale(18, 1)} />
          <Text style={styles.likes_text}>{!favourite ? 'save' : 'saved'}</Text>
        </TouchableOpacity>
      )}
      {detailedImage && (
        <View style={styles.comments_container}>
          <Text style={styles.likes_text}>open in Maps</Text>
        </View>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  imagesContainer_container: {
    flex: 1,
    marginTop: '10@ms1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  likes_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes_text: {
    fontFamily: 'sf-ui',
    marginLeft: '5@ms1',
    color: '#1A1C2B',
    fontSize: '13@ms1',
  },
  comments_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '20@ms1',
  },
});

const LIKE_DAY_MUTATION = gql`
  mutation likeDay($dayId: ID!) {
    likeDay(dayId: $dayId) {
      id
    }
  }
`;

const FAVOURITE_DAY_MUTATION = gql`
  mutation favouriteDay($dayId: ID!) {
    favouriteDay(dayId: $dayId) {
      id
    }
  }
`;
