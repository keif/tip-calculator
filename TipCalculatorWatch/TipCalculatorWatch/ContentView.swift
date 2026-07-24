import SwiftUI

struct ContentView: View {
    @StateObject private var calculator = TipCalculator()
    @State private var inputString: String = ""
    @State private var showingResults = false

    var body: some View {
        NavigationStack {
            GeometryReader { geometry in
                let width = geometry.size.width
                let height = geometry.size.height
                let buttonWidth = (width - 24) / 3
                let buttonHeight: CGFloat = (height - 70) / 5  // 5 rows of buttons

                VStack(spacing: 0) {
                    // App title
                    Text("Just Jason's Tip")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(.secondary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.leading, 8)
                        .padding(.top, 4)

                    // Display - large, right aligned
                    Text(displayAmount)
                        .font(.system(size: 32, weight: .light, design: .rounded))
                        .minimumScaleFactor(0.4)
                        .lineLimit(1)
                        .frame(maxWidth: .infinity, alignment: .trailing)
                        .padding(.trailing, 8)
                        .frame(height: 36)

                    // Number pad
                    VStack(spacing: 2) {
                        // Row 1: 7 8 9
                        HStack(spacing: 2) {
                            CalcButton(label: "7", width: buttonWidth, height: buttonHeight) { appendDigit("7") }
                            CalcButton(label: "8", width: buttonWidth, height: buttonHeight) { appendDigit("8") }
                            CalcButton(label: "9", width: buttonWidth, height: buttonHeight) { appendDigit("9") }
                        }
                        // Row 2: 4 5 6
                        HStack(spacing: 2) {
                            CalcButton(label: "4", width: buttonWidth, height: buttonHeight) { appendDigit("4") }
                            CalcButton(label: "5", width: buttonWidth, height: buttonHeight) { appendDigit("5") }
                            CalcButton(label: "6", width: buttonWidth, height: buttonHeight) { appendDigit("6") }
                        }
                        // Row 3: 1 2 3
                        HStack(spacing: 2) {
                            CalcButton(label: "1", width: buttonWidth, height: buttonHeight) { appendDigit("1") }
                            CalcButton(label: "2", width: buttonWidth, height: buttonHeight) { appendDigit("2") }
                            CalcButton(label: "3", width: buttonWidth, height: buttonHeight) { appendDigit("3") }
                        }
                        // Row 4: 0 00 ⌫
                        HStack(spacing: 2) {
                            CalcButton(label: "0", width: buttonWidth, height: buttonHeight) { appendDigit("0") }
                            CalcButton(label: "00", width: buttonWidth, height: buttonHeight) { appendDigit("00") }
                            CalcButton(label: "⌫", width: buttonWidth, height: buttonHeight, style: .gray) { deleteDigit() }
                        }
                        // Row 5: C and =
                        HStack(spacing: 2) {
                            CalcButton(label: "C", width: buttonWidth, height: buttonHeight, style: .gray) { inputString = "" }
                            CalcButton(label: "=", width: buttonWidth * 2 + 2, height: buttonHeight, style: .orange) { saveAndShowResults() }
                        }
                    }
                    .padding(.horizontal, 8)
                }
            }
            .ignoresSafeArea()
            .toolbar(.hidden)
            .navigationBarHidden(true)
            .navigationDestination(isPresented: $showingResults) {
                ResultsView(calculator: calculator, inputString: $inputString, showingResults: $showingResults)
            }
        }
    }

    private var displayAmount: String {
        if inputString.isEmpty {
            return "$0.00"
        }
        let cents = Int(inputString) ?? 0
        let dollars = Double(cents) / 100.0
        return String(format: "$%.2f", dollars)
    }

    private func appendDigit(_ digit: String) {
        if inputString.count < 7 {
            inputString += digit
        }
    }

    private func deleteDigit() {
        if !inputString.isEmpty {
            inputString.removeLast()
        }
    }

    private func saveAndShowResults() {
        guard !inputString.isEmpty else { return }
        let cents = Int(inputString) ?? 0
        calculator.billAmount = Double(cents) / 100.0
        showingResults = true
    }
}

struct CalcButton: View {
    let label: String
    let width: CGFloat
    let height: CGFloat
    var style: ButtonStyle = .dark
    let action: () -> Void

    enum ButtonStyle {
        case dark, gray, orange
    }

    var backgroundColor: Color {
        switch style {
        case .dark: return Color(white: 0.2)
        case .gray: return Color(white: 0.4)
        case .orange: return .orange
        }
    }

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.system(size: 18, weight: .medium))
                .foregroundColor(.white)
                .frame(width: width, height: height)
                .background(backgroundColor)
                .clipShape(Capsule())
        }
        .buttonStyle(.plain)
    }
}

struct ResultsView: View {
    @ObservedObject var calculator: TipCalculator
    @Binding var inputString: String
    @Binding var showingResults: Bool
    @FocusState private var isTipFocused: Bool

    var body: some View {
        VStack(spacing: 8) {
            HStack {
                Text("Bill")
                    .foregroundColor(.secondary)
                Spacer()
                Text("$\(calculator.billAmount, specifier: "%.2f")")
                    .fontWeight(.medium)
            }

            Divider()

            HStack {
                Text("Tip")
                    .foregroundColor(.secondary)
                Spacer()
                Text("\(Int(calculator.tipPercentage))%")
                    .fontWeight(.semibold)
                    .foregroundColor(.blue)
            }
            .focusable()
            .focused($isTipFocused)
            .digitalCrownRotation(
                $calculator.tipPercentage,
                from: 0,
                through: 30,
                by: 1,
                sensitivity: .medium,
                isContinuous: false,
                isHapticFeedbackEnabled: true
            )

            Divider()

            NavigationLink(destination: SettingsView(calculator: calculator)) {
                HStack {
                    Text("Tip $")
                        .foregroundColor(.secondary)
                    Spacer()
                    Text("$\(calculator.tipAmount, specifier: "%.2f")")
                        .fontWeight(.medium)
                    Image(systemName: "chevron.right")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
            .buttonStyle(.plain)

            Divider()

            HStack {
                Text("Total")
                    .fontWeight(.semibold)
                Spacer()
                Text("$\(calculator.totalAmount, specifier: "%.2f")")
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.green)
            }
        }
        .padding(.horizontal)
        .navigationTitle("Result")
        .navigationBarBackButtonHidden(true)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button {
                    inputString = ""
                    showingResults = false
                } label: {
                    Image(systemName: "arrow.left")
                }
            }
        }
        .onAppear {
            isTipFocused = true
        }
    }
}

struct SettingsView: View {
    @ObservedObject var calculator: TipCalculator

    var body: some View {
        List {
            Section("Round") {
                Picker("What", selection: $calculator.roundingTarget) {
                    ForEach(RoundingTarget.allCases, id: \.self) { target in
                        Text(target.rawValue).tag(target)
                    }
                }

                Picker("How", selection: $calculator.roundingMode) {
                    ForEach(RoundingMode.allCases, id: \.self) { mode in
                        Text(mode.rawValue).tag(mode)
                    }
                }
            }
        }
        .navigationTitle("Settings")
    }
}

#Preview {
    ContentView()
}
