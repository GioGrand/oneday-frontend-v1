import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { BaseTitle } from '../../components/ui/BaseTitle';
import { MasterButton } from './../../components/ui/MasterButton';

export default function FavouritesScreen(props) {
  const [value, setValue] = useState();
  return (
    <View style={styles.container}>
      <BaseTitle>Favourities</BaseTitle>
    </View>
  );
}

FavouritesScreen.navigationOptions = {
  title: 'Favourities',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
