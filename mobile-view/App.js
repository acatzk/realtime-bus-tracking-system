import { WebView } from 'react-native-webview'
import { StyleSheet, Text, View } from 'react-native'

export default function AppMobile() {
  return (
    <>
      <View style={styles.container}></View>
      <WebView source={{ uri: 'https://www.clemrose.ml' }} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#1f1b58'
  }
})
