function add(firstNumber, secondNumber) {
    return Number(firstNumber) + Number(secondNumber);
}

function subtract(firstNumber, secondNumber) {
    return Number(firstNumber) - Number(secondNumber);
}

function multiply(firstNumber, secondNumber) {
    return Number(firstNumber) * Number(secondNumber);
}

function operate(operation, firstNumber, secondNumber) {
    if (typeof window[operation] === 'function') {
        return window[operation](firstNumber, secondNumber);
    }
}

function divide(firstNumber, secondNumber) {
    if(Number(secondNumber) === 0) {
        alert('Who hurt you?');
        return;
    }

    return  Number(firstNumber) / Number(secondNumber);
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
    
    if (firstNumber === null) {
        ongoingContainer.innerText = ongoing;
    }
    else {
        ongoingContainer.innerText = `${firstNumber} ${symbol} ${ongoing}`;
    }
}

function updateFinal() {
    const container = document.querySelector('#final');
    final.innerText = result;
}

const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let ongoing = '';
let firstNumber = null;
let secondNumber = null;
let symbol = '';
let operation = '';
let result = null;

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', event => {
    const input = event.target.value;

    if(!isNaN(Number(input))) {
        ongoing += input;
    }
    else if(OPERATORS.includes(input)) {
        if(firstNumber === null) {
            firstNumber = Number(ongoing);
            ongoing = '';
            operation = input;
            symbol = getSymbol(event);
        }
        else {
            secondNumber = Number(ongoing);
            firstNumber = operate(operation, firstNumber, secondNumber);
            operation = input;
            symbol = getSymbol(event);
            secondNumber = null;
            ongoing = '';
            result = firstNumber;
            updateFinal();
        }
    }
    
    updateOngoing();
}))


// Temporary
window.addEventListener('keydown', e => console.log(e.key));