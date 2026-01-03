export type RoundingMode = 'none' | 'up' | 'down' | 'standard';

export type RoundingTarget = 'tip' | 'total';

export interface TipCalculation {
  tipAmount: number;
  totalAmount: number;
}
