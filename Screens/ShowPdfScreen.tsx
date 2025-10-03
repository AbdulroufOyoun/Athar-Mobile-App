import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import Pdf from 'react-native-pdf';

export default function ShowPdfScreen() {
  const route = useRoute();

  const { pdf = null }: any = route.params || {};

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <Pdf source={{ uri: pdf, cache: true }} style={{ flex: 1 }} />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
