// Global Variables
const headingElement = document.querySelector('h1');
const headingArray = Array.from(headingElement.innerText);
const middleDiv = document.getElementById("middleDiv");
const leftDiv = document.getElementById("leftDiv");
const rightDiv = document.getElementById("rightDiv");

// Variables to control speed of typing
const h1TimeVar = 123,
pTimeVar = 123;

//color variables
const white = "#ffffff",
black = "#000000",
grey = "#bcbcbc",
red = "#ff0000",
orange = "#ffa500",
yellow = "#ffff00",
green = "#008000",
blue = "#0000ff",
indigo = "#4b0082",
violet = "#ee82ee";

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
    matrix = matrix.reverse();
    return matrix;
}


function createGrid(matrix) {
    let gridArray = matrix.reverse();
    let rows = matrix.length,
    columns = matrix[0].length;
    for (let y = 0; y < rows; y++) {
        console.log(gridArray[y]);
        let reverseArray = gridArray[y].reverse();
        console.log(reverseArray);
        for (let x = 0; x < columns; x++) {
            console.log((gridArray[y])[x]);
            middleDiv.insertAdjacentHTML("afterbegin", `<div class="cell">${(gridArray[y])[x]}</div>`);
        }
        middleDiv.insertAdjacentHTML("afterbegin", "<div></div>");
    }
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
var testMatrix = createMatrix(20,20);