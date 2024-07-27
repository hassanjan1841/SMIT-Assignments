
let count = 0;
const counterElement = document.getElementById("counter");
const parityElement = document.getElementById("parity");
const incrementButton = document.getElementById("increment");
const resetButton = document.getElementById("reset");
const clearHistoryButton = document.getElementById("clear-history");
const historyList = document.getElementById("history-list");
    var button = document.getElementById("history-toggle");
    var historyDiv = document.getElementById("history-list");


incrementButton.addEventListener("click", incrementCounter);
resetButton.addEventListener("click", resetCounter);
clearHistoryButton.addEventListener("click", clearHistory);

function incrementCounter() {
    count++;
    historyDiv.style.maxHeight = historyDiv.scrollHeight + "px";
    button.textContent = 'hide'
        updateCounter();
    
}

function resetCounter() {
    count = 0;
    counterElement.textContent = count;
    
}

function clearHistory() {
    historyList.innerHTML = "";
}

function updateCounter() {
    counterElement.textContent = count;
    parityElement.textContent = count % 2 === 0 ? "Even" : "Odd";
    counterElement.classList.toggle("even", count % 2 === 0);
    counterElement.classList.toggle("odd", count % 2 !== 0);
    logHistory();
}

function logHistory() {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${count} (${count % 2 === 0 ? "Even" : "Odd"})`;
    historyList.appendChild(historyItem);
}


  
function toggleContent() {

    
    if (button.textContent === "View") {
        button.textContent = "Hide";
        historyDiv.style.maxHeight = historyDiv.scrollHeight + "px";
    } else {
        button.textContent = "View";
        historyDiv.style.maxHeight = '0px'
    }
}
