/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    primary: {
      main: '#6366f1',    // Indigo-500
      light: '#818cf8',   // Indigo-400
      dark: '#4f46e5',    // Indigo-600
      contrast: '#ffffff', // Text on primary
      overlay: 'rgba(99, 102, 241, 0.2)', // For progress bars, etc.
      darkOverlay: 'rgba(79, 70, 229, 0.9)', // For dark overlays
      lightOverlay: 'rgba(129, 140, 248, 0.9)', // For light overlays
    },
    background: {
      main: '#ffffff',
      surface: 'rgba(248, 250, 252, 0.8)',
      elevated: '#f8fafc',
      overlay: 'rgba(0, 0, 0, 0.5)',
      card: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#1f2937',    // Gray-800
      secondary: '#4b5563',  // Gray-600
      tertiary: '#9ca3af',   // Gray-400
      onOverlay: 'rgba(255, 255, 255, 0.8)',
      onPrimary: '#ffffff',
      onCard: '#1f2937',
    },
    status: {
      success: {
        main: '#22c55e',
        light: '#4ade80',
        dark: '#16a34a',
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
      },
      warning: {
        main: '#eab308',
        light: '#facc15',
        dark: '#ca8a04',
      },
      info: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
      },
      highlight: '#FFD700',
    },
    border: {
      main: '#e5e7eb',
      light: '#f3f4f6',
      dark: '#d1d5db',
    },
    opacity: {
      subtle: 0.7,
      medium: 0.8,
      high: 0.9,
    }
  },
  dark: {
    primary: {
      main: '#818cf8',    // Indigo-400
      light: '#a5b4fc',   // Indigo-300
      dark: '#6366f1',    // Indigo-500
      contrast: '#ffffff', // Text on primary
      overlay: 'rgba(129, 140, 248, 0.2)', // For progress bars, etc.
      darkOverlay: 'rgba(99, 102, 241, 0.9)', // For dark overlays
      lightOverlay: 'rgba(165, 180, 252, 0.9)', // For light overlays
    },
    background: {
      main: '#111827',
      surface: 'rgba(30, 41, 59, 0.8)',
      elevated: '#1e293b',
      overlay: 'rgba(0, 0, 0, 0.5)',
      card: 'rgba(30, 41, 59, 0.9)',
    },
    text: {
      primary: '#f3f4f6',    // Gray-100
      secondary: '#d1d5db',  // Gray-300
      tertiary: '#6b7280',   // Gray-500
      onOverlay: 'rgba(255, 255, 255, 0.8)',
      onPrimary: '#ffffff',
      onCard: '#f3f4f6',
    },
    status: {
      success: {
        main: '#4ade80',
        light: '#86efac',
        dark: '#22c55e',
      },
      error: {
        main: '#f87171',
        light: '#fca5a5',
        dark: '#ef4444',
      },
      warning: {
        main: '#facc15',
        light: '#fde047',
        dark: '#eab308',
      },
      info: {
        main: '#60a5fa',
        light: '#93c5fd',
        dark: '#3b82f6',
      },
      highlight: '#FFD700',
    },
    border: {
      main: '#374151',
      light: '#4b5563',
      dark: '#1f2937',
    },
    opacity: {
      subtle: 0.7,
      medium: 0.8,
      high: 0.9,
    }
  }
} as const;

// Type-safe color getter
export function getColor(
  scheme: 'light' | 'dark',
  path: string // e.g., 'primary.main' or 'text.primary'
): string {
  return path.split('.').reduce((obj: any, key: string) => {
    if (obj && typeof obj === 'object' && key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        return value;
      }
      return value;
    }
    throw new Error(`Invalid color path: ${path}`);
  }, Colors[scheme]);
}

// Type definitions for better TypeScript support
export type ColorScheme = keyof typeof Colors;
export type ColorPath = keyof typeof Colors.light & keyof typeof Colors.dark;










