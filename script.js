function add(firstNumber, secondNumber) {
    return Number(firstNumber) + Number(secondNumber);
}

function subtract(firstNumber, secondNumber) {
    return Number(firstNumber) - Number(secondNumber);
}

function multiply(firstNumber, secondNumber) {
    return Number(firstNumber) * Number(secondNumber);
}

function divide(firstNumber, secondNumber) {
    if(Number(secondNumber) === 0) {
        alert('Who hurt you?');
        return;
    }

    return Number(firstNumber) / Number(secondNumber);
}

function operate(operation, firstNumber, secondNumber) {
    if (typeof window[operation] === 'function') {
        return window[operation](firstNumber, secondNumber);
    }
}

function getValue(event) {
    const input = event.target.value;

    if (!isNaN(Number(input))) {
        return Number(input);
    }
    else {
        return input;
    }
}

function getSymbol(event) {
    return event.target.innerText;
}

function updateOngoing() {
    const ongoingContainer = document.querySelector('#ongoing'); 

    ongoingContainer.innerText = firstNumber === null ? ongoing : `${firstNumber} ${symbol} ${ongoing}`;
}

function updateFinal() {
    const container = document.querySelector('#final');
    final.innerText = result;
}

function updateCalculator(event) {
    const input = event.target.value;

    if(!isNaN(Number(input)) || (input === '.' && !ongoing.includes('.'))) {
        ongoing += input;
        updateOngoing();
    }
    else if(OPERATORS.includes(input) || input === 'equals') {
        if(firstNumber === null) {
            firstNumber = Number(ongoing);
        }
        else if(secondNumber === null && ongoing !== ''){
            secondNumber = Number(ongoing);
            result = operate(operation, firstNumber, secondNumber);
            firstNumber = result;
            secondNumber = null;            
        }

        if(OPERATORS.includes(input)) {
            operation = input;
        }
        else if (input === 'equals') {
            operation = '';
        }

        ongoing = '';
        symbol = getSymbol(event);
        updateOngoing();
        updateFinal();
    }
}

const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let ongoing = '';
let firstNumber = null;
let secondNumber = null;
let symbol = '';
let operation = '';
let result = null;

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', updateCalculator));

// Temporary
// window.addEventListener('keydown', e => console.log(e.key));