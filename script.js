// ======================== VARIABLES ========================
let lastAnswer = "";

// ======================== ADD CHARACTER TO DISPLAY ========================
function append(char) {
  document.getElementById("display").value += char;
}

// ======================== CLEAR DISPLAY ========================
function clearDisplay() {
  document.getElementById("display").value = "";
}

// ======================== CALCULATE EXPRESSION ========================
function calculate() {
  try {
    let display = document.getElementById("display");
    let expression = display.value;

    // If empty, do nothing
    if (expression.trim() === "") return;

    // Convert % to /100 before calculating
    let result = eval(expression.replace(/%/g, "/100"));
    
    display.value = result;
    lastAnswer = result;

    // Save calculation to history
    saveToHistory(expression + " = " + result);

  } catch {
    document.getElementById("display").value = "Error";
  }
}

// ======================== THEME TOGGLE ========================
function toggletheme() {
  document.body.classList.toggle("dark-mode");
}

// ======================== SAVE TO HISTORY ========================
function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push(entry);

  localStorage.setItem("calcHistory", JSON.stringify(history));

  showHistory();
}

// ======================== SHOW HISTORY ========================
function showHistory() {
  let historyDiv = document.getElementById("history");
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  if (history.length === 0) {
    historyDiv.innerHTML = "<h3>History</h3><p>No entries</p>";
    return;
  }

  historyDiv.innerHTML = "<h3>History</h3><ul>" +
    history.map(item => `<li>${item}</li>`).join("") +
    "</ul>";
}

// ======================== CLEAR HISTORY ========================
function clearHistory() {
  localStorage.removeItem("calcHistory");
  showHistory();
}

// ======================== SQUARE FUNCTION ========================
function Square() {
  let display = document.getElementById("display");
  let value = display.value;

  if (!isNaN(value) && value !== "") {
    let result = Math.pow(Number(value), 2);
    display.value = result;

    saveToHistory(value + "² = " + result);
  }
}

// ======================== SQUARE ROOT FUNCTION ========================
function SquareRoot() {
  let display = document.getElementById("display");
  let value = display.value;

  if (!isNaN(value) && value !== "") {
    let result = Math.sqrt(Number(value));
    display.value = result;

    saveToHistory("√" + value + " = " + result);
  }
}

// ======================== KEYBOARD SUPPORT ========================
document.addEventListener("keydown", function (event) {

  const key = event.key;

  // Numbers & operators
  if (!isNaN(Number(key)) || "+-*/().".includes(key)) {
    append(key);
  }

  // Enter = Calculate
  else if (key === "Enter") {
    calculate();
  }

  // Backspace = Delete last digit
  else if (key === "Backspace") {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
  }

  // 'c' = Clear
  else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});

// Load history when page opens
window.onload = showHistory;
