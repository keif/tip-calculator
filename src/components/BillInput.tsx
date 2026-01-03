import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface BillInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function BillInput({ value, onChangeText }: BillInputProps) {
  const handleChange = (text: string) => {
    // Allow only numbers and one decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return;
    }
    // Limit to 2 decimal places
    if (parts[1]?.length > 2) {
      return;
    }
    onChangeText(cleaned);
  };

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bill Amount</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currency}>$</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#999"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  currency: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    fontSize: 18,
    color: '#999',
  },
});
