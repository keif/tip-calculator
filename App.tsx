import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { BillInput, TipSlider, RoundingPicker, ResultsCard } from './src/components';
import { useTipCalculator } from './src/hooks/useTipCalculator';

export default function App() {
  const {
    billAmount,
    setBillAmount,
    tipPercentage,
    setTipPercentage,
    roundingMode,
    setRoundingMode,
    roundingTarget,
    setRoundingTarget,
    tipAmount,
    totalAmount,
  } = useTipCalculator();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.container}>
                <Text style={styles.title}>Tip Calculator</Text>

                <BillInput value={billAmount} onChangeText={setBillAmount} />

                <TipSlider value={tipPercentage} onValueChange={setTipPercentage} />

                <RoundingPicker
                  mode={roundingMode}
                  onModeChange={setRoundingMode}
                  target={roundingTarget}
                  onTargetChange={setRoundingTarget}
                />

                <ResultsCard tipAmount={tipAmount} totalAmount={totalAmount} />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
});
