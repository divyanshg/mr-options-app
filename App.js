import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { WebView } from 'react-native-webview';
export default function App() {
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setStatus({ ...status, update: true, fetching: true })
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (!__DEV__) {
      checkForUpdates();
    }
  }, [])

  const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
      <WebView source={{ uri: 'https://mr-options.vercel.app/' }}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        scrollEnabled={false}
      />
    </SafeAreaView>
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
