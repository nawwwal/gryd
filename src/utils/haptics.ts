// src/utils/haptics.ts

/**
 * A simple haptic feedback utility for mobile devices.
 * This ensures that feedback is only triggered on touch-enabled devices
 * and that the API is available in the browser.
 */

// Define the types of haptic feedback available
export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection';

// A mapping of feedback types to their corresponding vibration patterns
const HAPTIC_PATTERNS: Record<HapticFeedbackType, number | number[]> = {
  light: 20,
  medium: 40,
  heavy: 60,
  selection: 10,
};

/**
 * Triggers haptic feedback if the device supports it.
 * @param type The type of haptic feedback to trigger.
 */
export const triggerHapticFeedback = (type: HapticFeedbackType = 'light') => {
  // Check if the Vibration API is available
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(HAPTIC_PATTERNS[type]);
    } catch (error) {
      console.warn('[Haptics] Could not trigger haptic feedback:', error);
    }
  }
};
