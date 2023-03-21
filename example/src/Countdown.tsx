import * as React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCountdown } from "react-native-timestamp-timer-hooks";
import { formatTimeString } from './util';

const Countdown = () => {
  const { counter, start, stop, reset, isStart } = useCountdown({
    from: 30000,
    interval: 100,
    to: 20000,
  });

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.defaultText, { alignSelf: 'center' }]}>
          Countdown
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          onPress={() => {
            if (isStart) stop();
            else start();
          }}
        >
          <Text style={[styles.defaultText]}>{isStart ? 'stop' : 'start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => reset()}>
          <Text style={[styles.defaultText]}>reset</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text
          style={[styles.defaultText, { fontSize: 24, fontWeight: 'bold' }]}
        >
          {formatTimeString(counter)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  defaultText: {
    color: 'black',
  },
});

export default Countdown;
