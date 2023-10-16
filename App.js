import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const [loggedUser, setLoggedUser] = React.useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: process.env.IOS_CLIENT_ID,
		iosClientId: process.env.ANDROID_CLIENT_ID,
    webClientId: process.env.WEB_CLIENT_ID
	})

  React.useEffect(() => {
    handleResponse()
  }, [response])

  const handleResponse = async() => {
    if (response?.type === 'success') {
      await handleUser(response?.params?.access_token)
    }
  }

  const handleUser = async(token) =>{
    if (!token) return
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      const user = await response.json()
      setLoggedUser(user)

      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text onPress={() => promptAsync()}>
        click here to Rock n Roll!
      </Text>
      <Text>{JSON.stringify(loggedUser)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
