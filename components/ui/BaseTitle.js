import React from "react";
import { Text } from "react-native";

export function BaseTitle(props) {
  return <Text {...props} style={[props.style, styles.title]} />;
}

const styles = {
  title: {
    fontFamily: "sf-ui-bold",
    color: "#1A1C2B",
    paddingBottom: 30,
    fontSize: 30
  }
};
