import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { DotIndicator } from "react-native-indicators";

export function MasterButton(props) {
  const { title = "Enter", style = {}, loading, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      loading={loading}
      style={[styles.button, style]}
    >
      {loading ? (
        <DotIndicator color='white' size={6} />
      ) : (
        <Text {...props} style={[props.style, styles.text]} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#1A1C2B"
  },

  text: {
    fontFamily: "sf-ui",
    fontSize: 23,
    color: "#FFFFFF"
  }
});
