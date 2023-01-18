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
        return null;
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

    if(!isNaN(Number(input)) || (input === '.' && !ongoing.includes(input))) {
        // Do nothing if the user enters a number right after clicking equals
        if(!(firstNumber !== null && operation === null)) {
            ongoing += input;
        }
    }
    else if((OPERATORS.includes(input) || input === 'equals') && ongoing !== '') {
        if(firstNumber === null) {
            firstNumber = ongoing;
        }
        else if(secondNumber === null) {
            secondNumber = ongoing;
        }

        if(firstNumber !== null && secondNumber !== null) {
            result = operate(operation, firstNumber, secondNumber);
            firstNumber = result;
            secondNumber = null;
            updateFinal();
        }

        ongoing = '';
        symbol = getSymbol(event);
        operation = OPERATORS.includes(input) ? input : null;
    }
    else if(OPERATORS.includes(input) && operation === null) {
        symbol = getSymbol(event);
        operation = input;
    }
    else if(input === 'delete') {
        ongoing = ongoing.slice(0, ongoing.length - 1);
    }
    else if(input === 'clear') {
        initializeValues();
        updateFinal();
    }

    updateOngoing();
}

function initializeValues() {
    ongoing = '';
    firstNumber = null;
    secondNumber = null;
    symbol = '';
    operation = null;
    result = null;
}

const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let ongoing, firstNumber, secondNUmber, symbol, operation, result;
initializeValues();

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', updateCalculator));

// Temporary
window.addEventListener('keydown', e => console.log(e.key));