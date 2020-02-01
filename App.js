import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { onError } from "apollo-link-error";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import axios from "axios";
import jwtDecode from "jwt-decode";
// REDUX

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { storeR, persistor } from './store/configireStore';

import Nav_EntryPoint from './navigation/Nav_EntryPoint';

// END OF REDUX

const httpLink = createUploadLink({
  uri: 'https://oneday-backend-v1.herokuapp.com/graphql',
});

// const httpLink = createUploadLink({
//   uri: 'http://localhost:4002/graphql',
// });

const getToken = async () => {
  const token = await AsyncStorage.getItem("jwtToken");
  const refreshToken = await AsyncStorage.getItem("jwtRefreshToken");

  console.log('THIS IS THE TOKEN', token);
  console.log('THIS IS THE REFRESH TOKEN', refreshToken);
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log('THIS IS THE DECODED TOKEN', decodedToken);
    const now = new Date();
    let delta = now.getTime() < decodedToken.exp * 1000;
    console.log('THIS IS THE DELTA', delta);
    if (!delta && refreshToken) {
      console.log("refreshing");
      let resp = await axios({
        url: 'https://oneday-backend-v1.herokuapp.com/graphql',
        method: "post",
        data: {
          query: `mutation refreshToken { refreshToken(refreshToken: "${refreshToken}") { accessToken }}`
        }
      });
      // console.log(resp.data.data.refreshToken.accessToken);
      const newToken = resp.data.data.refreshToken.accessToken;
      await AsyncStorage.setItem("jwtToken", newToken);
      return newToken;
    }
    return token;
  }
  return undefined;
};


const authLink = setContext(async (_, { headers, ...context }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...context,
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(
        async ({ message, locations, path, extensions }) => {
          //console.log(extensions)
          console.log(
            `CALLING FROM MIDDLEWARE: => [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, ${extensions.code}`
          );
        }
      );
    if (networkError)
      console.log(
        `CALLING FROM MIDDLEWARE: => [Network error]: ${networkError}`
      );
  }
);

const link = ApolloLink.from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <AppLoading startAsync={loadResourcesAsync} onError={handleLoadingError} onFinish={() => handleFinishLoading(setLoadingComplete)} />;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={storeR}>
          <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
              <ApolloHooksProvider client={client}>
                <Nav_EntryPoint />
              </ApolloHooksProvider>
            </ApolloProvider>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png')]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'libre-baskerville-bold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'sf-ui': require('./assets/fonts/SFUIText-Regular.ttf'),
      'sf-ui-bold': require('./assets/fonts/SFUIText-Bold.ttf'),
      'sf-ui-semibold-italic': require('./assets/fonts/SFUIText-SemiboldItalic.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
