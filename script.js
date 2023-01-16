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
    
    if (!enteredFirstNumber) {
        ongoingContainer.innerText = ongoing;
    }
    else {
        ongoingContainer.innerText = `${firstNumber} ${operand} ${ongoing}`;
    }
}

const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let ongoing = '';
let firstNumber = 0;
let secondNumber = 0;
let enteredFirstNumber = false;
let operand = '';

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', event => {
    const input = event.target.value;

    if (!isNaN(Number(input))) {
        ongoing += input;
    }
    
    updateOngoing();
}))


// Temporary
window.addEventListener('keydown', e => console.log(e.key));