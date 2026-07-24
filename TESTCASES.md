# Shared calculation test cases

Both apps implement the same tip model in different languages
([`useTipCalculator.ts`](src/hooks/useTipCalculator.ts) and
[`TipCalculator.swift`](TipCalculatorWatch/TipCalculatorWatch/TipCalculator.swift)).
This table is the single source of truth for what that model should produce. Any
change to the calculation must keep both implementations passing every row here.

## How the model works

- **Round What = Tip:** round the raw tip, then `total = bill + tip`.
- **Round What = Total:** round `bill + rawTip`, clamp to at least `bill`, then
  `tip = total − bill`.
- **Round How:** `Exact` (no rounding), `Up` (ceiling), `Down` (floor),
  `Standard` (nearest).
- A **0% tip** forces `Round How` to `Exact`, regardless of the selected mode.

## Cases

| # | Bill | Tip % | Round What | Round How | Expected Tip | Expected Total | Covers |
|---|------|-------|------------|-----------|-------------:|---------------:|--------|
| 1 | 40.00 | 20 | Tip | Exact | 8.00 | 48.00 | Baseline, clean division |
| 2 | 40.00 | 18 | Tip | Exact | 7.20 | 47.20 | Fractional tip, no rounding |
| 3 | 40.00 | 18 | Tip | Up | 8.00 | 48.00 | Ceiling on the tip |
| 4 | 40.00 | 18 | Tip | Down | 7.00 | 47.00 | Floor on the tip |
| 5 | 40.00 | 18 | Tip | Standard | 7.00 | 47.00 | Nearest rounds **down** (7.20 → 7) |
| 6 | 40.00 | 19 | Tip | Standard | 8.00 | 48.00 | Nearest rounds **up** (7.60 → 8) |
| 7 | 42.75 | 20 | Total | Exact | 8.55 | 51.30 | Round-total target, no rounding |
| 8 | 42.75 | 20 | Total | Up | 9.25 | 52.00 | Ceiling on the total, tip absorbs the difference |
| 9 | 42.75 | 20 | Total | Down | 8.25 | 51.00 | Floor on the total |
| 10 | 42.75 | 20 | Total | Standard | 8.25 | 51.00 | Nearest total (51.30 → 51) |
| 11 | 50.40 | 0 | Total | Up | 0.00 | 50.40 | **Guardrail:** 0% tip disables rounding — no invented tip |
| 12 | 5.90 | 1 | Total | Down | 0.00 | 5.90 | **Guardrail:** total clamped to bill — tip never goes negative |
| 13 | 100.00 | 0 | Tip | Up | 0.00 | 100.00 | 0% tip stays 0 regardless of mode |
| 14 | *(empty)* | 20 | Tip | Exact | 0.00 | 0.00 | Empty/zero bill parses to 0 |

### Why the guardrails matter

- **Row 11** — without the 0%-disables-rounding rule, `ceil(50.40) = 51` would
  charge a $0.60 tip on a bill the user explicitly marked as 0% tip.
- **Row 12** — `floor(5.90 + 0.059) = floor(5.959) = 5`, which is *below* the bill.
  The raw `tip = 5 − 5.90 = −0.90` is negative, so the model clamps the total up to
  the bill and reports a $0.00 tip instead.

## A note on floating point

Values like `40 × 0.18` are not exactly representable in binary floating point
(you may see `7.200000000000001`). The rounding modes (`ceil`/`floor`/`round`)
absorb this for rows 3–10, but exact-value rows (2, 7) and any direct equality
check should compare within a small epsilon (e.g. `1e-9`) or after rounding to
cents, not with strict `==`.
