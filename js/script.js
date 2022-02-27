// Global Variables
const headingElement = document.querySelector('h1');
const headingArray = Array.from(headingElement.innerText);

// Variables to control speed of typing
const h1TimeVar = 123,
pTimeVar = 123;

function createMatrix(columns, rows) {
    // Creates a matrix of arrays within an array with each element representing a cell with unique coordinates
    let matrix = [],
    columnArray = [],
    rowArray = [],
    coordinates = [];
    for (let x = 0; x < columns; x++) {
        columnArray.push(x);
    }
    for (let y = 0; y < rows; y++) {
        rowArray.push(y);
    }
    console.log(matrix);
    for (let z = 0; z < columns; z++) {
        rowArray.forEach(element => coordinates.push(columnArray[z] + "-" + rowArray[element]));
        matrix.push(coordinates);
        console.log(matrix);
        coordinates = [];
    }
    return matrix;
}

function typeHeading() {
    // animates the h1 element to be typed out
    headingElement.textContent = ''
    for (let char = 0; char < headingArray.length; char++) {
        setTimeout(() => {headingElement.insertAdjacentHTML("beforeend", headingArray[char])}, (h1TimeVar+(char*h1TimeVar)));
    }
}

function colorLetter(char, color) {
    // changes the color of a character in h1
    headingArray.splice(char, 1, `<font color = '${color}'>${headingArray[char]}</font>`);
    var newVar = headingArray.join("");
    console.log(headingArray);
    console.log(newVar);
    headingElement.innerHTML = newVar;
}

typeHeading();
