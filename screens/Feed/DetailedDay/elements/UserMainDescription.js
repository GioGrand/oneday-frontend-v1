import React from 'react';
import { Image, View, Dimensions, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet } from 'react-native-size-matters';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function UserMainDescription(props) {

  return (
    <View style={styles.user_container}>
      <View style={styles.user_top_container}>
        <View style={styles.user_image_container}>
          <FadeIn>
            <Image style={styles.user_image} source={{ uri: props.day.author.profileImageLowRes }} />
          </FadeIn>
        </View>
        <View>
          <Text style={styles.user_username}>{props.day.author.userName}</Text>
          <Text style={styles.user_howManyPlaces}>been to 120 places </Text>
        </View>
        <View style={styles.user_follow_container}>
          <Text style={styles.user_follow_text}>Follow</Text>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  user_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: screenWidth - 25,
    minHeight: '110@ms1',
    maxHeight: '110@ms1',
    backgroundColor: '#453455',
    zIndex: 0,
    marginBottom: '-20@ms1',
    borderTopLeftRadius: '20@ms1',
    borderTopRightRadius: '20@ms1',
  },
  user_top_container: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth - 50,
    maxHeight: '100@ms1',
    margin: '20@ms1',
    marginTop: '20@ms1',
    marginBottom: '45@ms1',
  },
  user_image_container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxWidth: 60,
  },
  user_image: {
    width: '40@ms1',
    height: '40@ms1',
    borderRadius: '20@ms1',
  },
  user_username: {
    fontFamily: 'sf-ui-bold',
    color: '#fff',
    paddingBottom: 2,
    paddingTop: '8@ms1',
    fontSize: '13@ms1',
  },
  user_howManyPlaces: {
    fontFamily: 'sf-ui',
    color: '#e3e3e3',
    paddingBottom: '8@ms1',
    paddingTop: 0,
    fontSize: '11@ms1',
  },
  user_follow_container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  user_follow_text: {
    fontFamily: 'sf-ui',
    color: '#e3e3e3',
    marginRight: '8@ms1',
  },
});
