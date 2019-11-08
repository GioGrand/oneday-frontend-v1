import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// UI COMPONENTS
import { BaseTitle, MasterButton, AntDesign, RoundedButtonNegative } from './../../components/ui/index';

// COMPONENT SPECIFIC
import FadeIn from 'react-native-fade-in-image';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
console.log(screenWidth);

export default function Profile(props) {
  const user = useSelector(state => state.auth.user);

  let urlR = 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg';

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topImage}>
        <Image style={{ width: screenWidth, height: screenWidth * 0.66, resizeMode: 'cover' }} source={{ uri: urlR }}></Image>
      </View>
      <ScrollView>
        <View style={{ minHeight: screenWidth * 0.66 }}></View>
        <View style={{ height: 70, width: screenWidth, paddingHorizontal: 25, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Image style={{ width: screenWidth * 0.3, borderRadius: (screenWidth * 0.3) / 2, height: screenWidth * 0.3, resizeMode: 'cover', position: 'absolute', marginTop: -screenWidth * 0.217 }} source={{ uri: user.profileImageLowRes }}></Image>
          </View>
          <RoundedButtonNegative loading={false} onPress={() => props.navigation.navigate('EditProfile')}>
            Edit profile
          </RoundedButtonNegative>
        </View>

        <View style={{ height: 70, width: screenWidth, paddingHorizontal: 25, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'sf-ui-bold', color: '#1A1C2B', fontSize: 25 }}>{user.userName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'sf-ui-bold', color: '#1A1C2B', fontSize: 18, marginBottom: 2 }}>125</Text>
              <Text style={{ fontFamily: 'sf-ui', color: '#707070', fontSize: 14 }}>Follower</Text>
            </View>
            <View style={{ alignItems: 'center', marginLeft: 15, justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'sf-ui-bold', color: '#1A1C2B', fontSize: 18, marginBottom: 2 }}>328</Text>
              <Text style={{ fontFamily: 'sf-ui', color: '#707070', fontSize: 14 }}>Following</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <Text style={{ fontFamily: 'sf-ui' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          <Text style={{ fontFamily: 'sf-ui-bold', marginTop: 4 }}>#summertime #beachlife </Text>
        </View>
      </ScrollView>
    </View>
  );
}

Profile.navigationOptions = ({ navigation }) => ({
  title: '',
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: null,
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <View style={{ marginRight: 0, width: 50 }}>
        <AntDesign style={{ color: '#fff' }} name="bars" size={30} />
      </View>
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  topImage: {
    backgroundColor: '#565656',
    width: screenWidth,
    height: screenWidth * 0.66,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
