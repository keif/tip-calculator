import Foundation

enum RoundingMode: String, CaseIterable {
    case none = "Exact"
    case up = "Up"
    case down = "Down"
    case standard = "Standard"
}

enum RoundingTarget: String, CaseIterable {
    case tip = "Tip"
    case total = "Total"
}

class TipCalculator: ObservableObject {
    @Published var billAmount: Double = 0
    @Published var tipPercentage: Double = 20
    @Published var roundingMode: RoundingMode = .none
    @Published var roundingTarget: RoundingTarget = .tip

    var tipAmount: Double {
        let rawTip = billAmount * (tipPercentage / 100)

        // Don't apply rounding if tip is 0
        let effectiveMode = tipPercentage == 0 ? .none : roundingMode

        if roundingTarget == .tip {
            return applyRounding(rawTip, mode: effectiveMode)
        } else {
            // When rounding total, calculate tip from rounded total
            let rawTotal = billAmount + rawTip
            let roundedTotal = max(billAmount, applyRounding(rawTotal, mode: effectiveMode))
            return roundedTotal - billAmount
        }
    }

    var totalAmount: Double {
        if roundingTarget == .tip {
            return billAmount + tipAmount
        } else {
            let rawTip = billAmount * (tipPercentage / 100)
            let rawTotal = billAmount + rawTip
            let effectiveMode = tipPercentage == 0 ? .none : roundingMode
            return max(billAmount, applyRounding(rawTotal, mode: effectiveMode))
        }
    }

    private func applyRounding(_ value: Double, mode: RoundingMode) -> Double {
        switch mode {
        case .none:
            return value
        case .up:
            return ceil(value)
        case .down:
            return floor(value)
        case .standard:
            return round(value)
        }
    }
}
