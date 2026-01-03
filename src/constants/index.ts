export const TIP_SLIDER = {
  MIN: 0,
  MAX: 30,
  DEFAULT: 20,
  STEP: 1,
} as const;

export const ROUNDING_OPTIONS: { label: string; value: import('../types').RoundingMode }[] = [
  { label: 'None', value: 'none' },
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
  { label: 'Standard', value: 'standard' },
];

export const ROUNDING_TARGET_OPTIONS: { label: string; value: import('../types').RoundingTarget }[] = [
  { label: 'Tip', value: 'tip' },
  { label: 'Total', value: 'total' },
];
