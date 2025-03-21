import { StyleSheet, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Text, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SpendingCoachService } from '@/services/mockSpendingCoachService';
import { useState, useEffect, useCallback } from 'react';
import { SpendingCoachData, Transaction } from '@/types/spending-coach';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [data, setData] = useState<SpendingCoachData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const result = await SpendingCoachService.getData();
      setData(result);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const result = await SpendingCoachService.refreshData();
      setData(result);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={colors.primary}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary.contrast}
        />
      }
      headerImage={
        <View style={styles.headerImageContainer}>
          <LinearGradient
            colors={[colors.primary.main, colors.primary.dark]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.headerContent}>
            {/* Spending Overview */}
            <View style={styles.spendingOverview}>
              <Text style={[styles.overviewTitle, { color: colors.primary.contrast }]}>
                Monthly Overview
              </Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: colors.primary.overlay }]}>
                  <View style={[styles.progressFill, { 
                    width: `${(data.overview.spent / data.overview.budget) * 100}%`,
                    backgroundColor: colors.status.success.light
                  }]} />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={[styles.progressText, { color: colors.text.onOverlay }]}>
                    ${data.overview.spent.toLocaleString()} spent
                  </Text>
                  <Text style={[styles.progressText, { color: colors.text.onOverlay }]}>
                    ${data.overview.budget.toLocaleString()} budget
                  </Text>
                </View>
              </View>
            </View>

            {/* Quick Insights */}
            <View style={styles.insightsContainer}>
              <View style={[styles.insightItem, { backgroundColor: colors.primary.overlay }]}>
                <IconSymbol 
                  name="chart.line.uptrend.xyaxis" 
                  size={24} 
                  color={colors.status.success.main}
                />
                <View style={styles.insightText}>
                  <Text style={[styles.insightLabel, { color: colors.text.onOverlay }]}>
                    Biggest Saving
                  </Text>
                  <Text style={[styles.insightValue, { color: colors.primary.contrast }]}>
                    -{data.overview.biggestSaving.percentage}% on {data.overview.biggestSaving.category}
                  </Text>
                </View>
              </View>
              <View style={[styles.insightItem, { backgroundColor: colors.primary.overlay }]}>
                <IconSymbol 
                  name="chart.bar.fill" 
                  size={24} 
                  color={colors.status.warning.light}
                />
                <View style={styles.insightText}>
                  <Text style={[styles.insightLabel, { color: colors.text.onOverlay }]}>
                    Top Category
                  </Text>
                  <Text style={[styles.insightValue, { color: colors.primary.contrast }]}>
                    {data.overview.topCategory.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      }
    >
      <View style={[styles.mainContent, { backgroundColor: colors.background.main }]}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Recent Transactions
            </Text>
            <Pressable>
              <Text style={[styles.sectionAction, { color: colors.primary.main }]}>
                See All
              </Text>
            </Pressable>
          </View>
          <View style={styles.transactionList}>
            {data?.transactions?.length ? (
              data.transactions.map((transaction: Transaction) => (
                <TransactionItem 
                  key={transaction.id}
                  icon={transaction.icon}
                  title={transaction.title}
                  amount={transaction.amount}
                  date={transaction.date}
                />
              ))
            ) : (
              <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                No transactions to display
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            <QuickActionButton 
              icon="plus.circle.fill"
              title="Add"
              color={colors.status.info.main}
            />
            <QuickActionButton 
              icon="chart.bar.fill"
              title="Reports"
              color={colors.status.success.main}
            />
            <QuickActionButton 
              icon="gear"
              title="Settings"
              color={colors.status.error.main}
            />
            <QuickActionButton 
              icon="dollarsign.circle"
              title="Budget"
              color={colors.status.warning.main}
            />
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

interface TransactionItemProps {
  icon: IconSymbolName;
  title: string;
  amount: number;
  date: string;
}

function TransactionItem({ icon, title, amount, date }: TransactionItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';
  
  return (
    <BlurView 
      intensity={isDark ? 15 : 30} 
      tint={isDark ? 'dark' : 'light'} 
      style={[styles.transactionItem, {
        backgroundColor: colors.background.surface,
        borderColor: colors.border.main,
        borderWidth: 1,
      }]}
    >
      <View style={[styles.transactionIcon, { 
        backgroundColor: amount < 0 
          ? colors.status.error.main
          : colors.status.success.main
      }]}>
        <IconSymbol name={icon} size={20} color={colors.text.onPrimary} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionTitle, { color: colors.text.primary }]}>
          {title}
        </Text>
        <Text style={[styles.transactionDate, { color: colors.text.secondary }]}>
          {date}
        </Text>
      </View>
      <Text style={[styles.transactionAmount, { 
        color: amount < 0 
          ? colors.status.error.main
          : colors.status.success.main
      }]}>
        {amount < 0 ? '-' : '+'}${Math.abs(amount).toFixed(2)}
      </Text>
    </BlurView>
  );
}

interface QuickActionButtonProps {
  icon: IconSymbolName;
  title: string;
  color: string;
}

function QuickActionButton({ icon, title, color }: QuickActionButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  return (
    <Pressable style={styles.quickActionButton}>
      <BlurView 
        intensity={isDark ? 15 : 30} 
        tint={isDark ? 'dark' : 'light'} 
        style={[styles.quickActionIcon, {
          backgroundColor: colors.background.surface,
        }]}
      >
        <IconSymbol name={icon} size={24} color={color} />
      </BlurView>
      <Text style={[styles.quickActionText, { color: colors.text.primary }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 100, // Add extra margin to account for the stats overlay
    paddingHorizontal: 16,
  },
  headerContent: {
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
  },
  balanceContainer: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '700',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  quickStats: {
    position: 'absolute',
    bottom: -100, // Position it to overlap the bottom
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24, // Add padding to create space after the stats
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  transactionDate: {
    fontSize: 13,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  headerImageContainer: {
    flex: 1,
    height: 200, // Adjust this value to control header height
  },
  spendingOverview: {
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  insightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  insightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
  },
  insightText: {
    flex: 1,
  },
  insightLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  insightValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
  },
});
















