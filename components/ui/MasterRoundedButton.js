import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import { DotIndicator } from 'react-native-indicators';

export function MasterRoundedButton(props) {
  const { title = 'Enter', style = {}, loading, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} loading={loading} style={[styles.button, style]}>
      {loading ? <DotIndicator color="white" size={6} /> : <Text {...props} style={[props.style, styles.text]} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 50,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#1A1C2B',
  },

  text: {
    fontFamily: 'sf-ui',
    fontSize: 17,
    color: '#FFFFFF',
  },
});
