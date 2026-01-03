import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ResultsCardProps {
  tipAmount: number;
  totalAmount: number;
}

export function ResultsCard({ tipAmount, totalAmount }: ResultsCardProps) {
  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Tip</Text>
        <Text style={styles.tipValue}>${formatCurrency(tipAmount)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${formatCurrency(totalAmount)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tipValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
});
