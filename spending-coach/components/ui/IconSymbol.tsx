// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Define the exact SF Symbol names we're using
const SF_SYMBOLS = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'dollarsign.circle.fill': 'account-balance-wallet',
  'cart.fill': 'shopping-cart',
  'chart.bar.fill': 'bar-chart',
  'plus.circle.fill': 'add-circle',
  'chart.line.uptrend.xyaxis': 'trending-up',
  'dollarsign.circle': 'account-balance',
  'fork.knife': 'restaurant',
  'car.fill': 'directions-car',
  'gear': 'settings',
} as const;

// Create a type for our SF Symbol names
type SFSymbolName = keyof typeof SF_SYMBOLS;

// Create a type for Material Icons names
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

// Create the mapping with proper types
const MAPPING: Record<SFSymbolName, MaterialIconName> = SF_SYMBOLS;

export type IconSymbolName = SFSymbolName;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const materialIconName = MAPPING[name];
  if (!materialIconName) {
    console.warn(`No Material Icon mapping found for SF Symbol: ${name}`);
    return null;
  }
  
  return <MaterialIcons color={color} size={size} name={materialIconName} style={style} />;
}





