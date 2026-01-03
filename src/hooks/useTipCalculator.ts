import { useState, useMemo } from 'react';
import { RoundingMode, RoundingTarget, TipCalculation } from '../types';
import { applyRounding } from '../utils/rounding';
import { TIP_SLIDER } from '../constants';

export function useTipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(TIP_SLIDER.DEFAULT);
  const [roundingMode, setRoundingMode] = useState<RoundingMode>('none');
  const [roundingTarget, setRoundingTarget] = useState<RoundingTarget>('tip');

  const calculation = useMemo((): TipCalculation => {
    const bill = parseFloat(billAmount) || 0;
    const rawTip = bill * (tipPercentage / 100);

    let tipAmount: number;
    let totalAmount: number;

    // Don't apply rounding if tip percentage is 0 (can't have negative tip)
    const effectiveRoundingMode = tipPercentage === 0 ? 'none' : roundingMode;

    if (roundingTarget === 'tip') {
      tipAmount = applyRounding(rawTip, effectiveRoundingMode);
      totalAmount = bill + tipAmount;
    } else {
      // Round the total
      const rawTotal = bill + rawTip;
      let roundedTotal = applyRounding(rawTotal, effectiveRoundingMode);
      // Ensure total never rounds below the bill (tip can't be negative)
      totalAmount = Math.max(bill, roundedTotal);
      tipAmount = totalAmount - bill;
    }

    return {
      tipAmount,
      totalAmount,
    };
  }, [billAmount, tipPercentage, roundingMode, roundingTarget]);

  return {
    billAmount,
    setBillAmount,
    tipPercentage,
    setTipPercentage,
    roundingMode,
    setRoundingMode,
    roundingTarget,
    setRoundingTarget,
    ...calculation,
  };
}
