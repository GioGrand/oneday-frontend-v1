import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { BaseTitle } from "../components/ui/BaseTitle";
import { MasterButton } from "./../components/ui/MasterButton";
import BaseInput from "../components/ui/BaseInput";

export default function HomeScreen() {
  const [value, setValue] = useState();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-end",
        flexDirection: "column"
      }}
      style={{ flex: 1,  }}
    >
      <View style={styles.imageGroup}>
        <Image style={{width: '100%', height: 400, resizeMode: 'cover', borderRadius: 25 }} source={{uri: 'https://cdn.viewing.nyc/assets/media/f4fff3335082871fe598be301624194c/elements/208eed0122e71f70cfed275c4758fb71/xl/8a3ca706-fac4-40c9-af97-ff21469a6f38_2x.jpg'}} />
      </View>
      <View style={styles.loginGroup}>
        <BaseTitle>Login</BaseTitle>
        <BaseInput
          placeholder='Email'
          value={value}
          onChangeText={email => console.log("ciao")}
        />
        <BaseInput
          placeholder='Password'
          value={value}
          onChangeText={email => console.log("ciao")}
        />
        <MasterButton loading={false}>Log in</MasterButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  
  imageGroup: {
    flex: 1  },
  loginGroup: {
    padding: 30,
    flex: 2,
    justifyContent: "flex-end",
    
  }
});

/* <MonoText>Hello World!</MonoText>

 <MasterButton loading={true}>Send</MasterButton> */
