/**
 * Sample Timer Hooks App
 * https://github.com/leejaehyup/react-native-timestamp-timer-hooks
 */

import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Countdown from './src/Countdown';
import Timer from './src/Timer';

const App = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.flexContainer}>
        <View style={[styles.flexContainer, { justifyContent: 'center' }]}>
          <Countdown />
        </View>
        <View style={[styles.flexContainer, { justifyContent: 'center' }]}>
          <Timer />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default App;
