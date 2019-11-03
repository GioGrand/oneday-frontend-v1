import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import { DotIndicator } from 'react-native-indicators';
import { ScaledSheet } from 'react-native-size-matters';

export function MasterButtonNegative(props) {
  const { title = 'Enter', style = {}, loading, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} loading={loading} style={[styles.button, style]}>
      {loading ? <DotIndicator color="white" size={6} /> : <Text {...props} style={[props.style, styles.text]} />}
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  button: {
    display: 'flex',
    height: '44@ms1',
    paddingHorizontal: '32@ms1',

    borderRadius: '32@ms1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '18@ms1',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1A1C2B',
  },

  text: {
    fontFamily: 'sf-ui',
    fontSize: '16@ms1',
    color: '#1A1C2B',
  },
});
