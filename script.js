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

function updateOngoing() {
    const ongoingContainer = document.querySelector('#ongoing'); 

    ongoingContainer.innerText = firstNumber === null ? ongoing : `${firstNumber} ${symbol} ${ongoing}`;
}

function updateFinal() {
    const container = document.querySelector('#final');
    final.innerText = result;
}

function updateCalculator(event) {
    let input;

    if(event.type === 'click') {
        input = event.target.value;
    }
    else if(event.type === 'keydown') {
        let temp = event.key;

        if(!isNaN(Number(temp)) || temp === '.') {
            input = temp;
        }
        else if (KEYDOWN_MAP[temp] !== undefined) {
            input = KEYDOWN_MAP[temp];
        }
        else return;
    }

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
        symbol = SYMBOL_MAP[input];
        operation = OPERATORS.includes(input) ? input : null;
    }
    else if(OPERATORS.includes(input) && operation === null) {
        symbol = SYMBOL_MAP[input];
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

function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");

    return txt.documentElement.textContent;
}

const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];
const KEYDOWN_MAP = {
    '+' : 'add',
    '-' : 'subtract',
    '*' : 'multiply',
    '/' : 'divide',
    'Enter' : 'equals'
};
const SYMBOL_MAP = {
    'add' : decode('&plus;'),
    'subtract' : decode('&minus;'),
    'multiply' : decode('&times;'),
    'divide' : decode('&divide;') ,
    'equals' : decode('&equals;')
}

let ongoing, 
    firstNumber,
    secondNumber, 
    symbol, 
    operation, 
    result;

initializeValues();

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', updateCalculator));
window.addEventListener('keydown', updateCalculator);