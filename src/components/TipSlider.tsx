import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { TIP_SLIDER } from '../constants';

interface TipSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

export function TipSlider({ value, onValueChange }: TipSliderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Tip Percentage</Text>
        <Text style={styles.value}>{value}%</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={TIP_SLIDER.MIN}
        maximumValue={TIP_SLIDER.MAX}
        step={TIP_SLIDER.STEP}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#E5E5E5"
        thumbTintColor="#007AFF"
      />
      <View style={styles.labels}>
        <Text style={styles.minMax}>{TIP_SLIDER.MIN}%</Text>
        <Text style={styles.minMax}>{TIP_SLIDER.MAX}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minMax: {
    fontSize: 12,
    color: '#999',
  },
});
