import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Text, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';

// Custom color palette definition at the top of the file
const colors = {
  // Primary colors
  primary: {
    light: '#6366f1', // Base primary color
    dark: '#818cf8',
    gradient: {
      light: ['#6366f1', '#4f46e5'] as const, // Add as const here
      dark: ['#818cf8', '#6366f1'] as const,  // Add as const here
    }
  },
  
  // Background colors
  background: {
    light: '#ffffff',
    dark: '#111827',
    surface: {
      light: 'rgba(248, 250, 252, 0.8)',
      dark: 'rgba(30, 41, 59, 0.8)',
    }
  },
  
  // Text colors
  text: {
    primary: {
      light: '#1f2937',
      dark: '#f3f4f6',
    },
    secondary: {
      light: '#4b5563',
      dark: '#9ca3af',
    },
    onPrimary: '#ffffff',
  },
  
  // Border colors
  border: {
    light: '#e5e7eb',
    dark: '#374151',
  },
  
  // Status colors
  status: {
    success: {
      light: '#22c55e',
      dark: '#4ade80',
    },
    error: {
      light: '#ef4444',
      dark: '#f87171',
    },
    warning: {
      light: '#eab308',
      dark: '#facc15',
    },
    info: {
      light: '#3b82f6',
      dark: '#60a5fa',
    }
  },
  
  // Progress bar colors
  progress: {
    background: {
      light: 'rgba(255, 255, 255, 0.15)',
      dark: 'rgba(255, 255, 255, 0.15)',
    },
    fill: {
      light: '#e0e7ff',
      dark: '#a5b4fc',
    }
  }
} as const; // Make the entire colors object readonly

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: colors.background.light,
        dark: colors.background.dark
      }}
      headerImage={
        <LinearGradient
          colors={isDark ? colors.primary.gradient.dark : colors.primary.gradient.light}
          style={StyleSheet.absoluteFill}
        />
      }
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <BlurView 
            intensity={isDark ? 20 : 40} 
            tint={isDark ? 'dark' : 'light'} 
            style={[styles.headerContent, {
              backgroundColor: isDark 
                ? `${colors.primary.dark}E6` // E6 = 90% opacity
                : `${colors.primary.light}E6`
            }]}
          >
            <View style={styles.welcomeContainer}>
              <Text style={[styles.greeting, { color: 'rgba(255, 255, 255, 0.95)' }]}>
                Good morning,
              </Text>
              <Text style={[styles.name, { color: '#ffffff' }]}>
                Alex
              </Text>
            </View>
            
            <View style={styles.balanceContainer}>
              <Text style={[styles.balanceLabel, { color: 'rgba(255, 255, 255, 0.95)' }]}>
                Total Balance
              </Text>
              <Text style={[styles.balanceAmount, { color: colors.text.onPrimary }]}>
                $1,170.00
              </Text>
              <View style={styles.budgetContainer}>
                <View style={styles.budgetInfo}>
                  <Text style={[styles.budgetLabel, { color: 'rgba(255, 255, 255, 0.95)' }]}>
                    Monthly Budget
                  </Text>
                  <Text style={[styles.budgetPercentage, { color: '#ffffff' }]}>
                    52%
                  </Text>
                </View>
                <View style={[styles.progressBarContainer, {
                  backgroundColor: colors.progress.background[isDark ? 'dark' : 'light']
                }]}>
                  <View style={[styles.progressBar, { 
                    width: '52%',
                    backgroundColor: colors.progress.fill[isDark ? 'dark' : 'light']
                  }]} />
                </View>
              </View>
            </View>
          </BlurView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { 
            color: colors.text.primary[isDark ? 'dark' : 'light']
          }]}>
            Recent Transactions
          </Text>
          <View style={styles.transactionList}>
            <TransactionItem 
              icon="cart.fill"
              title="Grocery Shopping"
              amount={-85.50}
              date="Today"
            />
            <TransactionItem 
              icon="fork.knife"
              title="Restaurant"
              amount={-32.40}
              date="Yesterday"
            />
            <TransactionItem 
              icon="car.fill"
              title="Gas Station"
              amount={-45.00}
              date="Sep 20"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { 
            color: colors.text.primary[isDark ? 'dark' : 'light']
          }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            <QuickActionButton 
              icon="plus.circle.fill"
              title="Add"
              color={isDark ? colors.status.info.dark : colors.status.info.light}
            />
            <QuickActionButton 
              icon="chart.bar.fill"
              title="Reports"
              color={isDark ? colors.status.success.dark : colors.status.success.light}
            />
            <QuickActionButton 
              icon="gear"
              title="Settings"
              color={isDark ? colors.status.error.dark : colors.status.error.light}
            />
            <QuickActionButton 
              icon="dollarsign.circle"
              title="Budget"
              color={isDark ? colors.status.warning.dark : colors.status.warning.light}
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
  const isDark = useColorScheme() === 'dark';
  
  return (
    <BlurView 
      intensity={isDark ? 15 : 30} 
      tint={isDark ? 'dark' : 'light'} 
      style={[styles.transactionItem, {
        backgroundColor: colors.background.surface[isDark ? 'dark' : 'light'],
        borderColor: colors.border[isDark ? 'dark' : 'light'],
        borderWidth: 1,
      }]}
    >
      <View style={[styles.transactionIcon, { 
        backgroundColor: amount < 0 
          ? colors.status.error[isDark ? 'dark' : 'light']
          : colors.status.success[isDark ? 'dark' : 'light']
      }]}>
        <IconSymbol name={icon} size={20} color={colors.text.onPrimary} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionTitle, { 
          color: colors.text.primary[isDark ? 'dark' : 'light']
        }]}>{title}</Text>
        <Text style={[styles.transactionDate, { 
          color: colors.text.secondary[isDark ? 'dark' : 'light']
        }]}>{date}</Text>
      </View>
      <Text style={[styles.transactionAmount, { 
        color: amount < 0 
          ? colors.status.error[isDark ? 'dark' : 'light']
          : colors.status.success[isDark ? 'dark' : 'light']
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
  const isDark = useColorScheme() === 'dark';

  return (
    <Pressable style={styles.quickActionButton}>
      <BlurView 
        intensity={isDark ? 15 : 30} 
        tint={isDark ? 'dark' : 'light'} 
        style={[styles.quickActionIcon, {
          backgroundColor: colors.background.surface[isDark ? 'dark' : 'light'],
        }]}
      >
        <IconSymbol name={icon} size={24} color={color} />
      </BlurView>
      <Text style={[styles.quickActionText, { 
        color: colors.text.primary[isDark ? 'dark' : 'light']
      }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    height: 340,
    paddingTop: 60,
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeContainer: {
    marginBottom: 32,
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
    marginTop: 'auto',
  },
  balanceLabel: {
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '700',
    marginTop: 8,
  },
  budgetContainer: {
    marginTop: 24,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
  },
  budgetPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
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
    gap: 12,
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
});
















