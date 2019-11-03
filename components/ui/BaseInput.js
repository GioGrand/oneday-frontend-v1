import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default BaseInput = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.input_container}>
      <Text style={styles.input_label}>{label}</Text>
      <TextInput autoCapitalize="none" placeholder={placeholder} autoCorrect={false} style={styles.input_body} value={value} onChangeText={onChangeText} />
    </View>
  );
};

const styles = ScaledSheet.create({
  input_container: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    marginBottom: '17@ms1',
  },
  input_body: {
    color: '#1A1C2B',
    paddingBottom: '17@ms1',
    paddingLeft: '20@ms1',
    fontSize: '14@ms1',
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
  },
  input_label: {
    fontSize: '14@ms1',
    color: '#1A1C2B',
    paddingBottom: '8@ms1',
    paddingLeft: '20@ms1',
  },
});
