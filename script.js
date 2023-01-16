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

const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let ongoing = '';
let firstNumber = 0;
let secondNumber = 0;

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', event => {
    console.log(getValue(event));
}))


// Temporary
window.addEventListener('keydown', e => console.log(e.key));