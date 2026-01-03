import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RoundingMode, RoundingTarget } from '../types';
import { ROUNDING_OPTIONS, ROUNDING_TARGET_OPTIONS } from '../constants';

interface RoundingPickerProps {
  mode: RoundingMode;
  onModeChange: (value: RoundingMode) => void;
  target: RoundingTarget;
  onTargetChange: (value: RoundingTarget) => void;
}

export function RoundingPicker({
  mode,
  onModeChange,
  target,
  onTargetChange,
}: RoundingPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Round</Text>
      <View style={styles.segmentedControl}>
        {ROUNDING_TARGET_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              target === option.value && styles.segmentActive,
            ]}
            onPress={() => onTargetChange(option.value)}
          >
            <Text
              style={[
                styles.segmentText,
                target === option.value && styles.segmentTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, styles.secondLabel]}>How</Text>
      <View style={styles.segmentedControl}>
        {ROUNDING_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              mode === option.value && styles.segmentActive,
            ]}
            onPress={() => onModeChange(option.value)}
          >
            <Text
              style={[
                styles.segmentText,
                mode === option.value && styles.segmentTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  secondLabel: {
    marginTop: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  segmentTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
