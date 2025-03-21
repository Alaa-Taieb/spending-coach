import { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
  headerImage,
  style,
  refreshControl, // Add this prop
}: {
  children: React.ReactNode;
  headerBackgroundColor: { light: string; dark: string };
  headerImage: React.ReactNode;
  style?: ViewStyle;
  refreshControl?: React.ReactNode; // Add this type
}) {
  const colorScheme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const onLayout = useCallback((event: { nativeEvent: { layout: { height: number } } }) => {
    setScrollViewHeight(event.nativeEvent.layout.height);
  }, []);

  const headerStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: headerBackgroundColor[colorScheme ?? 'light'],
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    transform: [{ translateY: headerTranslate }],
  };

  const headerImageStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: windowWidth,
    height: HEADER_MAX_HEIGHT,
    opacity: imageOpacity,
    transform: [{ translateY: imageTranslate }],
  };

  return (
    <View style={[styles.container, style]}> {/* Add style prop here */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT,
          minHeight: scrollViewHeight + HEADER_MAX_HEIGHT,
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        style={{ flex: 1 }}
        onLayout={onLayout}
        scrollEventThrottle={16}>
        {children}
      </Animated.ScrollView>
      <Animated.View style={headerStyle}>
        <Animated.View style={[headerImageStyle, { pointerEvents: 'none' }]}>
          {headerImage}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


