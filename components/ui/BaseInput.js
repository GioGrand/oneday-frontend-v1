import React from "react";
import { TextInput, View, Text } from "react-native";

const BaseInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry
}) => {
  const { containerStyle, labelStyle, inputStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#1A1C2B",
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 25,
    lineHeight: 23,
    borderBottomColor: "#707070",
    borderBottomWidth: 1
  },

  containerStyle: {
    maxHeigth: 60,
    backgroundColor: "white",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 30
  }
};

export default BaseInput;
