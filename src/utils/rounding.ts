import { RoundingMode } from '../types';

export function applyRounding(value: number, mode: RoundingMode): number {
  switch (mode) {
    case 'up':
      return Math.ceil(value);
    case 'down':
      return Math.floor(value);
    case 'standard':
      return Math.round(value);
    case 'none':
    default:
      return value;
  }
}
