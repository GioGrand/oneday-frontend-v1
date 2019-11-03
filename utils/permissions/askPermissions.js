// COMPONENT SPECIFIC
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

exports.verifyPermissions = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION, Permissions.CAMERA, Permissions.CAMERA_ROLL);
  if (result.status !== 'granted') {
    Alert.alert('Insufficient permissions.', [{ text: 'Okay' }]);
    return false;
  }
  return true;
};
