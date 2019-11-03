import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import { DotIndicator } from 'react-native-indicators';
import { ScaledSheet } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';

export function MasterButtonIcon(props) {
  const { title = 'Enter', style = {}, loading, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} loading={loading} style={[styles.button, style]}>
      {loading ? <DotIndicator color="white" size={6} /> : <AntDesign {...props} style={[props.style, styles.icon]} name="delete" size={20} />}
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  button: {
    display: 'flex',
    height: '44@ms1',
    width: '44@ms1',

    borderRadius: '22@ms1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '18@ms1',
    backgroundColor: '#e3e3e3',
  },

  icon: {
    color: '#8a8a8f',
  },
});
