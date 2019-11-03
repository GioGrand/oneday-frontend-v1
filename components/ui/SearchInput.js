import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchInput = ({ label, placeholder, value, onChangeText, secureTextEntry, props, autoFocus }) => {
  const { containerStyle, labelStyle, inputStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, justifyContent: 'flex-start' }}>
        <AntDesign name="search1" size={25} color="#e3e3e3" />
      </View>
      <TextInput autoFocus={false} onFocus={() => props.navigation.navigate('Search')} autoCapitalize="none" placeholder={placeholder} autoCorrect={false} style={inputStyle} value={value} onChangeText={onChangeText} />
    </View>
  );
};

const styles = {
  inputStyle: {
    flex: 1,
    color: '#1A1C2B',
    padding: 20,
    fontSize: 16,
    fontFamily: 'sf-ui',
  },
  containerStyle: {
    borderRadius: 10,
    maxHeigth: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
};

export default SearchInput;
