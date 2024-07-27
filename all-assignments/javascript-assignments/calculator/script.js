let displayValue = "";

function addToDisplay(value) {
  displayValue += value;
  document.getElementById("display").value = displayValue;
}

function addOperator(operator) {
  if (displayValue !== "" && !isNaN(displayValue[displayValue.length - 1])) {
    displayValue += operator;
    document.getElementById("display").value = displayValue;
  }
}

function clearDisplay() {
  displayValue = "";
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    let result = eval(displayValue);
    document.getElementById("display").value = result;
    displayValue = result.toString();
  } catch (error) {
    console.error(error);
    document.getElementById("display").value = "Error";
    displayValue = "";
  }
}

function addDecimal() {
  if (displayValue === "" || displayValue.indexOf(".") === -1) {
    displayValue += ".";
    document.getElementById("display").value = displayValue;
  }
}

function calculatePower() {
  let values = displayValue.split("^");
  if (values.length === 2) {
    let base = parseFloat(values[0]);
    let exponent = parseFloat(values[1]);
    let result = Math.pow(base, exponent);
    document.getElementById("display").value = result;
    displayValue = result.toString();
  }
}
