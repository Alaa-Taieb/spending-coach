import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';

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

  const insights: Insight[] = [
    {
      title: "Spending Alert",
      message: "You're spending 30% more on dining this month",
      type: "warning",
      icon: "chart.line.uptrend.xyaxis"
    },
    {
      title: "Saving Opportunity",
      message: "Set aside $200 this week to reach your goal",
      type: "info",
      icon: "dollarsign.circle"
    }
  ];

  const goals = [
    {
      name: "Vacation Fund",
      current: 2500,
      target: 5000,
      dueDate: "Dec 2023"
    },
    {
      name: "Emergency Fund",
      current: 4000,
      target: 10000,
      dueDate: "Mar 2024"
    }
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={colors.primary}
      headerImage={
        <View style={styles.headerImageContainer}>
          <LinearGradient
            colors={[colors.primary.main, colors.primary.dark]}
            style={StyleSheet.absoluteFill}
          >
            <View style={styles.headerContent}>
              <Text style={[styles.headerTitle, { color: colors.primary.contrast }]}>
                Spending Coach
              </Text>
              <View style={styles.balanceContainer}>
                <Text style={[styles.balanceLabel, { color: colors.primary.contrast }]}>
                  Available Balance
                </Text>
                <Text style={[styles.balanceAmount, { color: colors.primary.contrast }]}>
                  $2,450.00
                </Text>
              </View>
            </View>
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
          {insights.map((insight, index) => (
            <View 
              key={index} 
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
          {goals.map((goal, index) => (
            <View 
              key={index} 
              style={[styles.goalCard, { backgroundColor: colors.background.card }]}
            >
              <View style={styles.goalHeader}>
                <Text style={[styles.goalName, { color: colors.text.primary }]}>
                  {goal.name}
                </Text>
                <Text style={[styles.goalDate, { color: colors.text.secondary }]}>
                  Due: {goal.dueDate}
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
    flex: 1,
  },
  headerContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceContainer: {
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
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
});
