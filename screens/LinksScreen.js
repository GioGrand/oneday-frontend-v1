import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MonoText } from "../components/StyledText";

export default function LinksScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <MonoText>Second page</MonoText>
      </View>
    </SafeAreaView>
  );
}

LinksScreen.navigationOptions = {
  title: "Links"
};

const styles = StyleSheet.create({});
