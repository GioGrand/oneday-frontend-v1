import React from 'react';
import { Image, View, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { BaseTitle, BaseInput, MasterButton, AntDesign, Feather, StyledText } from '../../../../components/ui/index';

export default function LikeSave(props) {
  let randomLike = Math.floor(Math.random() * 100);
  let randomSaved = Math.floor(Math.random() * 100);

  return (
    <View style={styles.imagesContainer_container}>
      <View style={styles.likes_container}>
        <AntDesign name={randomLike < 50 ? 'hearto' : 'heart'} color={randomLike < 50 ? "#8a8a8f" : '#ff3333'} size={moderateScale(18, 1)} />
        <Text style={styles.likes_text}>23</Text>
      </View>
      <View style={styles.comments_container}>
        <AntDesign name="message1" color="#8a8a8f" size={moderateScale(18, 1)} />
        <Text style={styles.likes_text}>4</Text>
      </View>
      <View style={styles.comments_container}>
        <AntDesign name={randomSaved < 50 ? 'staro' : 'star'} color={randomSaved < 50 ? "#8a8a8f" : "#ff3333"} size={moderateScale(18, 1)} />
        <Text style={styles.likes_text}>{randomSaved < 50 ? "save" : "saved"}</Text>
      </View>
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
