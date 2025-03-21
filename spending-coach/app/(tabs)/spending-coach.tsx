import { StyleSheet, View, ActivityIndicator, RefreshControl, Platform } from 'react-native';
import { Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SpendingCoachService } from '@/services/mockSpendingCoachService';
import { useState, useEffect, useCallback } from 'react';
import { SpendingCoachData } from '@/types/spending-coach';
import { BlurView } from 'expo-blur';

type InsightType = 'warning' | 'info' | 'success' | 'error';
type Insight = {
  title: string;
  message: string;
  type: InsightType;
  icon: IconSymbolName;
};

export default function SpendingCoachScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  
  const [data, setData] = useState<SpendingCoachData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const result = await SpendingCoachService.getData();
      setData(result);
    } catch (error) {
      console.error('Failed to load spending coach data:', error);
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
      console.error('Failed to refresh spending coach data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: colors.text.primary }]}>
          Failed to load data
        </Text>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: colors.primary.main,
        dark: colors.primary.main
      }}
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
          >
            <BlurView
              intensity={isDark ? 20 : 40}
              tint={isDark ? 'dark' : 'light'}
              style={styles.headerContent}
            >
              <Text style={[styles.headerTitle, { color: colors.primary.contrast }]}>
                Spending Coach
              </Text>
              <View style={styles.balanceContainer}>
                <Text style={[styles.balanceLabel, { color: colors.primary.contrast }]}>
                  Available Balance
                </Text>
                <Text style={[styles.balanceAmount, { color: colors.primary.contrast }]}>
                  ${data?.balance.available.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </Text>
                <View style={styles.balanceDetails}>
                  <IconSymbol 
                    name="chart.bar.fill"
                    size={12} 
                    color={colors.primary.contrast} 
                    style={styles.balanceIcon}
                  />
                  <Text style={[styles.balanceUpdated, { color: colors.primary.contrast }]}>
                    Last updated: {new Date(data?.balance.lastUpdated ?? '').toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            </BlurView>
          </LinearGradient>
        </View>
      }
    >
      <View style={[styles.mainContent, { backgroundColor: colors.background.main }]}>
        {/* Insights Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Smart Insights
          </Text>
          {data.insights.map((insight) => (
            <View 
              key={insight.id} 
              style={[styles.insightCard, { backgroundColor: colors.background.card }]}
            >
              <IconSymbol 
                name={insight.icon} 
                size={24} 
                color={colors.status[insight.type].main} 
              />
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text.primary }]}>
                  {insight.title}
                </Text>
                <Text style={[styles.insightMessage, { color: colors.text.secondary }]}>
                  {insight.message}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Goals Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Savings Goals
          </Text>
          {data.goals.map((goal) => (
            <View 
              key={goal.id} 
              style={[styles.goalCard, { backgroundColor: colors.background.card }]}
            >
              <View style={styles.goalHeader}>
                <Text style={[styles.goalName, { color: colors.text.primary }]}>
                  {goal.name}
                </Text>
                <Text style={[styles.goalDate, { color: colors.text.secondary }]}>
                  Due: {new Date(goal.dueDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.goalProgress}>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[styles.progressBar, { backgroundColor: colors.primary.overlay }]}
                  >
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${(goal.current / goal.target) * 100}%`,
                          backgroundColor: colors.primary.main 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.goalAmount, { color: colors.text.primary }]}>
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    height: 200,
  },
  headerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Add this to center content vertically
    paddingTop: Platform.OS === 'ios' ? 40 : 20, // Adjust padding based on platform
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16, // Reduced from 24 to 16 for better spacing
  },
  balanceContainer: {
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  balanceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  balanceIcon: {
    marginRight: 4,
    opacity: 0.7,
  },
  balanceUpdated: {
    fontSize: 12,
    opacity: 0.7,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightContent: {
    marginLeft: 12,
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightMessage: {
    fontSize: 14,
  },
  goalCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
  },
  goalDate: {
    fontSize: 14,
  },
  goalProgress: {
    flex: 1,
  },
  progressBarContainer: {
    flex: 1,
    gap: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalAmount: {
    fontSize: 14,
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },

});
