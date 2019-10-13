import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";

import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <MonoText>Hello World!</MonoText>
      </View>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({});
