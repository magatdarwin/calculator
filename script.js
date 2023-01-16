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

    return  Number(firstNumber) / Number(secondNumber);
}

// function operate(operation, firstNumber, secondNumber) {
//     return operation(firstNumber, secondNumber);
// }

const operate = (operation, firstNumber, secondNumber) => window[operation](firstNumber, secondNumber);

