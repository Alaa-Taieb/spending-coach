import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SpendingCoachScreen() {
  const [moneyLeft, setMoneyLeft] = useState(250);
  const [showAlert, setShowAlert] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = Colors[colorScheme ?? 'light'];

  const handleCool = useCallback(() => {
    setShowAlert(false);
  }, []);

  const handleCutBack = useCallback(() => {
    setShowAlert(false);
    // Additional feedback logic could go here
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
    },
    header: {
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerContent: {
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    budgetCard: {
      margin: 16,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    balanceContainer: {
      padding: 20,
    },
    balanceTitle: {
      fontSize: 18,
      marginBottom: 8,
    },
    balanceAmount: {
      fontSize: 36,
      fontWeight: '700',
      marginBottom: 4,
    },
    balancePeriod: {
      fontSize: 14,
      opacity: 0.7,
      marginBottom: 16,
    },
    progressContainer: {
      marginTop: 16,
    },
    progressBar: {
      height: 8,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#6366f1',
      borderRadius: 4,
    },
    progressLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    progressLabel: {
      fontSize: 13,
      opacity: 0.7,
    },
    section: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    transactionList: {
      gap: 12,
    },
    transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#6366f1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    transactionDetails: {
      flex: 1,
      marginLeft: 12,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    transactionCategory: {
      fontSize: 13,
      opacity: 0.7,
    },
    transactionRight: {
      alignItems: 'flex-end',
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: '600',
    },
    transactionTime: {
      fontSize: 12,
      opacity: 0.7,
    },
    insightCards: {
      flexDirection: 'row',
      gap: 12,
    },
    insightCard: {
      flex: 1,
      padding: 16,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
    },
    insightTitle: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 8,
      textAlign: 'center',
    },
    insightDescription: {
      fontSize: 12,
      opacity: 0.7,
      marginTop: 4,
      textAlign: 'center',
    },
    recommendationList: {
      gap: 12,
    },
    recommendationItem: {
      flexDirection: 'row',
      padding: 16,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
    },
    recommendationContent: {
      marginLeft: 12,
      flex: 1,
    },
    recommendationTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    recommendationDescription: {
      fontSize: 13,
      opacity: 0.7,
    },
    alertOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    alertContent: {
      width: '100%',
      padding: 24,
      borderRadius: 16,
      alignItems: 'center',
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
    },
    alertTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#ffffff',
      marginTop: 16,
      marginBottom: 8,
    },
    alertMessage: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginBottom: 24,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      minWidth: 120,
      alignItems: 'center',
    },
    coolButton: {
      backgroundColor: '#4A4A4A',
    },
    cutBackButton: {
      backgroundColor: '#6366f1',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background }
      ]}
    >
      {/* Header Section */}
      <LinearGradient
        colors={isDark ? ['#818cf8', '#6366f1'] : ['#6366f1', '#4f46e5']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>Spending Coach</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Your Financial Advisor</ThemedText>
        </View>
      </LinearGradient>

      {/* Weekly Budget Status */}
      <BlurView
        intensity={isDark ? 20 : 40}
        tint={isDark ? 'dark' : 'light'}
        style={styles.budgetCard}
      >
        <View style={styles.balanceContainer}>
          <ThemedText type="title" style={styles.balanceTitle}>Weekly Budget Status</ThemedText>
          <ThemedText style={styles.balanceAmount}>${moneyLeft}</ThemedText>
          <ThemedText style={styles.balancePeriod}>remaining for this week</ThemedText>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(moneyLeft / 400) * 100}%` }]} />
            </View>
            <View style={styles.progressLabels}>
              <ThemedText style={styles.progressLabel}>$150 spent</ThemedText>
              <ThemedText style={styles.progressLabel}>$400 budget</ThemedText>
            </View>
          </View>
        </View>
      </BlurView>

      {/* Recent Activity */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
        <View style={styles.transactionList}>
          <TransactionItem
            icon="cart.fill"
            title="Takeout"
            amount={-50}
            category="Food"
            time="2 hours ago"
          />
          <TransactionItem
            icon="cart.fill"
            title="Shopping"
            amount={-75}
            category="Retail"
            time="Yesterday"
          />
        </View>
      </View>

      {/* Insights Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Spending Insights</ThemedText>
        <View style={styles.insightCards}>
          <InsightCard
            icon="chart.line.uptrend.xyaxis"
            title="Spending Trend"
            description="15% higher than last week"
            type="warning"
          />
          <InsightCard
            icon="cart.fill"
            title="Top Category"
            description="Food & Dining"
            type="info"
          />
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Recommendations</ThemedText>
        <View style={styles.recommendationList}>
          <RecommendationItem
            icon="chart.line.uptrend.xyaxis"
            title="Consider meal prep"
            description="Save up to $200/month on food"
          />
          <RecommendationItem
            icon="chart.line.uptrend.xyaxis"
            title="Budget adjustment needed"
            description="Entertainment spending exceeds limit"
          />
        </View>
      </View>

      {/* Spending Alert */}
      {showAlert && (
        <Animated.View 
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(300)}
          style={styles.alertOverlay}
        >
          <BlurView intensity={70} tint="dark" style={styles.alertContent}>
            <IconSymbol name="dollarsign.circle.fill" size={32} color="#FFD700" />
            <ThemedText style={styles.alertTitle}>Spending Alert</ThemedText>
            <ThemedText style={styles.alertMessage}>
              Recent $50 purchase on takeout detected. You have $200 left this week.
              Would you like to continue this spending pattern?
            </ThemedText>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.coolButton]} 
                onPress={handleCool}
              >
                <ThemedText style={styles.buttonText}>Continue</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.cutBackButton]} 
                onPress={handleCutBack}
              >
                <ThemedText style={styles.buttonText}>Cut Back</ThemedText>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      )}
    </ScrollView>
  );
}

// Component for transaction items
function TransactionItem({ 
  icon, 
  title, 
  amount, 
  category, 
  time 
}: {
  icon: IconSymbolName;
  title: string;
  amount: number;
  category: string;
  time: string;
}) {
  const isDark = useColorScheme() === 'dark';
  
  return (
    <BlurView
      intensity={isDark ? 15 : 30}
      tint={isDark ? 'dark' : 'light'}
      style={styles.transactionItem}
    >
      <View style={styles.transactionIcon}>
        <IconSymbol name={icon} size={24} color="#fff" />
      </View>
      <View style={styles.transactionDetails}>
        <ThemedText style={styles.transactionTitle}>{title}</ThemedText>
        <ThemedText style={styles.transactionCategory}>{category}</ThemedText>
      </View>
      <View style={styles.transactionRight}>
        <ThemedText style={styles.transactionAmount}>${Math.abs(amount)}</ThemedText>
        <ThemedText style={styles.transactionTime}>{time}</ThemedText>
      </View>
    </BlurView>
  );
}

// Component for insight cards
function InsightCard({ 
  icon, 
  title, 
  description, 
  type 
}: {
  icon: IconSymbolName;
  title: string;
  description: string;
  type: 'warning' | 'success' | 'error' | 'info';
}) {
  const isDark = useColorScheme() === 'dark';
  
  return (
    <BlurView
      intensity={isDark ? 15 : 30}
      tint={isDark ? 'dark' : 'light'}
      style={styles.insightCard}
    >
      <IconSymbol name={icon} size={24} color={getTypeColor(type)} />
      <ThemedText style={styles.insightTitle}>{title}</ThemedText>
      <ThemedText style={styles.insightDescription}>{description}</ThemedText>
    </BlurView>
  );
}

// Component for recommendation items
function RecommendationItem({ 
  icon, 
  title, 
  description 
}: {
  icon: IconSymbolName;
  title: string;
  description: string;
}) {
  const isDark = useColorScheme() === 'dark';
  
  return (
    <BlurView
      intensity={isDark ? 15 : 30}
      tint={isDark ? 'dark' : 'light'}
      style={styles.recommendationItem}
    >
      <IconSymbol name={icon} size={24} color="#60a5fa" />
      <View style={styles.recommendationContent}>
        <ThemedText style={styles.recommendationTitle}>{title}</ThemedText>
        <ThemedText style={styles.recommendationDescription}>{description}</ThemedText>
      </View>
    </BlurView>
  );
}

// Helper function for insight card colors
function getTypeColor(type: 'warning' | 'success' | 'error' | 'info'): string {
  switch (type) {
    case 'warning': return '#facc15';
    case 'success': return '#4ade80';
    case 'error': return '#f87171';
    case 'info': return '#60a5fa';
    default: return '#60a5fa';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  budgetCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  balanceContainer: {
    padding: 20,
  },
  balanceTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
  },
  balancePeriod: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  transactionList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionCategory: {
    fontSize: 13,
    opacity: 0.7,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionTime: {
    fontSize: 12,
    opacity: 0.7,
  },
  insightCards: {
    flexDirection: 'row',
    gap: 12,
  },
  insightCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  insightDescription: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
    textAlign: 'center',
  },
  recommendationList: {
    gap: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  recommendationContent: {
    marginLeft: 12,
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 13,
    opacity: 0.7,
  },
  alertOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContent: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  coolButton: {
    backgroundColor: '#4A4A4A',
  },
  cutBackButton: {
    backgroundColor: '#6366f1',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
