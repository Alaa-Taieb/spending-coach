import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useMemo } from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const screenOptions = useMemo(() => ({
    headerShown: false,
    tabBarActiveTintColor: colors.primary.main,
  }), [colors.primary.main]);

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="spending-coach"
        options={{
          title: 'Spending Coach',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol 
              name="dollarsign.circle.fill"
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* Add other tab screens here */}
    </Tabs>
  );
}


