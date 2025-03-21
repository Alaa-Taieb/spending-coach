import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SpendingCoachScreen() {
  const [moneyLeft, setMoneyLeft] = useState(250);
  const [showAlert, setShowAlert] = useState(true);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const handleCool = useCallback(() => {
    setShowAlert(false);
  }, []);

  const handleCutBack = useCallback(() => {
    setShowAlert(false);
    // Additional feedback logic could go here
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Money Left Display */}
      <ThemedView style={styles.balanceContainer}>
        <ThemedText type="title" style={styles.balanceTitle}>Money Left</ThemedText>
        <ThemedText style={styles.balanceAmount}>${moneyLeft}</ThemedText>
        <ThemedText style={styles.balancePeriod}>this week</ThemedText>
      </ThemedView>

      {/* Transaction */}
      <ThemedView style={styles.transactionContainer}>
        <IconSymbol 
          name="cart.fill" 
          size={24} 
          color={themeColors.text}
        />
        <ThemedText style={styles.transactionText}>-$50 on Takeout</ThemedText>
      </ThemedView>

      {/* Spending Coach Alert */}
      {showAlert && (
        <Animated.View 
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(300)}
          style={styles.alertContainer}
        >
          <ThemedView style={styles.alertContent}>
            <ThemedText style={styles.alertTitle}>Spending Coach</ThemedText>
            <ThemedText style={styles.alertMessage}>
              You spent $50—$200 left this week. Cool or cut back?
            </ThemedText>
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.coolButton]} 
                onPress={handleCool}
              >
                <ThemedText style={styles.buttonText}>Cool</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.cutBackButton]} 
                onPress={handleCutBack}
              >
                <ThemedText style={styles.buttonText}>Cut Back</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  balanceTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  balancePeriod: {
    opacity: 0.7,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: Platform.select({
      ios: 'rgba(140, 140, 140, 0.1)',
      default: '#f5f5f5',
    }),
    marginBottom: 20,
  },
  transactionText: {
    marginLeft: 12,
    fontSize: 16,
  },
  alertContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  alertContent: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: Platform.select({
      ios: 'rgba(60, 60, 60, 0.95)',
      default: '#333',
    }),
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  coolButton: {
    backgroundColor: '#4A4A4A',
  },
  cutBackButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});