import React from 'react';
import { Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export function BaseTitle(props) {
  return <Text {...props} style={[props.style, styles.title]} />;
}

const styles = ScaledSheet.create({
  title: {
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
    paddingBottom: '10@ms1',
    paddingTop: 30,
    fontSize: '26@ms1',
  },
});
