import React from 'react';
import { View, Text, Image } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { BaseTitle, BaseInput, MasterButton, AntDesign, Feather, StyledText } from '../../../../components/ui/index';

export default function UserHeader(props) {
  let weatherOptions = ['sun', 'cloud', 'cloud-snow', 'cloud-rain', 'cloud-drizzle', 'cloud-lightning'];
  let cityOptions = ['Barcelona', 'Madrid', 'Rome', 'New York city', 'Los Angeles', 'San Diego'];
  let usernameOptions = ['mahmood', 'letofrancesca', 'johnsonnaylor', 'simona.branchetti', 'federica.panicucci', 'marcomazzoliofficial'];
  let randomIndex = Math.floor(Math.random() * 6);
  let randomTemperature = Math.floor(Math.random() * 30);
  let weatherIcon = weatherOptions[randomIndex];

  return (
    <View style={styles.userHeader_container}>
      <View>
        <Text style={styles.userHeader_userName}>{usernameOptions[randomIndex]}</Text>
        <Text style={styles.userHeader_place}>{cityOptions[randomIndex]}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Feather name={weatherIcon} color="#8a8a8f" size={moderateScale(22, 1)} />
        <Text style={styles.userHeader_temperature}>{randomTemperature}°</Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  userHeader_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: '40@ms1',
    minHeight: '40@ms1',
    marginRight: '20@ms1',
  },
  userHeader_userName: {
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
    paddingBottom: '0.5@ms1',
    fontSize: '14@ms1',
  },
  userHeader_place: {
    fontFamily: 'sf-ui-semibold-italic',
    color: '#8a8a8f',
    paddingBottom: '0.5@ms1',
    fontSize: '13@ms1',
  },
  rightContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userHeader_temperature: {
    fontFamily: 'sf-ui-bold',
    color: '#1A1C2B',
    paddingBottom: '0.5@ms1',
    marginLeft: '7@ms1',
    fontSize: '13@ms1',
  },
});
