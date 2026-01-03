# Tip Calculator - Development Plan

## Overview

A simple React Native tip calculator app for iOS. Input a bill total, select a tip percentage via slider, and choose a rounding preference.

## Tech Stack

- **Framework:** React Native (Expo managed workflow)
- **Language:** TypeScript
- **State Management:** React useState (app is simple enough)
- **Styling:** StyleSheet (built-in) or NativeWind if you prefer Tailwind
- **Testing:** Jest + React Native Testing Library

### Why Expo?

- Faster setup, no Xcode configuration headaches
- Easy to share with friends via Expo Go app (no TestFlight needed initially)
- Can eject to bare workflow later if needed

---

## Features

### Core

1. **Bill Input** - Numeric input for the total bill amount
2. **Tip Percentage Slider** - Adjustable slider (e.g., 0-30%)
3. **Rounding Options** - Toggle between:
   - No rounding
   - Round up (ceiling)
   - Round down (floor)
   - Standard rounding (nearest)
4. **Results Display** - Show tip amount and final total

### Nice-to-Have (Future)

- Split bill among multiple people
- Preset percentage buttons (15%, 18%, 20%)
- Dark mode support
- Haptic feedback on slider

---

## Component Structure

```
src/
├── App.tsx                 # Root component
├── components/
│   ├── BillInput.tsx       # Text input for bill amount
│   ├── TipSlider.tsx       # Percentage slider + display
│   ├── RoundingPicker.tsx  # Rounding option selector
│   └── ResultsCard.tsx     # Displays tip + total
├── hooks/
│   └── useTipCalculator.ts # Core calculation logic
├── utils/
│   └── rounding.ts         # Rounding helper functions
├── types/
│   └── index.ts            # TypeScript types
└── constants/
    └── index.ts            # Default values, limits
```

---

## Implementation Phases

### Phase 1: Project Setup

- [ ] Initialize Expo project with TypeScript template
- [ ] Set up folder structure
- [ ] Configure ESLint/Prettier (optional)
- [ ] Verify app runs on iOS simulator

### Phase 2: Core Logic

- [ ] Create `useTipCalculator` hook
  - Inputs: bill amount, tip percentage, rounding mode
  - Outputs: tip amount, total amount
- [ ] Create `rounding.ts` utility functions
- [ ] Write unit tests for calculation logic

### Phase 3: UI Components

- [ ] Build `BillInput` component
  - Numeric keyboard
  - Currency formatting
  - Clear button
- [ ] Build `TipSlider` component
  - Range: 0-30% (configurable)
  - Display current percentage
- [ ] Build `RoundingPicker` component
  - Segmented control or button group
  - Options: None, Up, Down, Standard
- [ ] Build `ResultsCard` component
  - Show tip amount
  - Show final total

### Phase 4: Integration & Styling

- [ ] Assemble components in App.tsx
- [ ] Apply consistent styling
- [ ] Handle edge cases (empty input, 0 bill, etc.)
- [ ] Test on iOS simulator

### Phase 5: Polish & Distribution

- [ ] Add app icon
- [ ] Test on physical device via Expo Go
- [ ] Share with friends via Expo Go link
- [ ] (Optional) Build standalone IPA for TestFlight

---

## Rounding Logic

```typescript
type RoundingMode = 'none' | 'up' | 'down' | 'standard';

function applyRounding(value: number, mode: RoundingMode): number {
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
```

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Expo vs bare RN | Expo | Faster setup, easier sharing |
| State management | useState | App is simple, no need for Redux/Zustand |
| Styling | StyleSheet | Keep dependencies minimal |
| Rounding applies to | Tip | User preference - round tip, then add to bill |

---

## Commands Reference

```bash
# Create project
npx create-expo-app tip-calculator --template expo-template-blank-typescript

# Run on iOS simulator
npx expo start --ios

# Run tests
npm test

# Build for iOS (when ready)
eas build --platform ios
```

---

## Next Steps

1. Review this plan
2. Initialize the Expo project
3. Start with Phase 2 (core logic) - get calculations working first
4. Build UI components around the working logic
