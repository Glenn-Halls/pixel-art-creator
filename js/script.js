// Global Variables
var headingElement = document.querySelector('h1');
var headingArray = Array.from(headingElement.innerText);
var middleDiv = document.getElementById("middleDiv");
var leftDiv = document.getElementById("leftDiv");
var rightDiv = document.getElementById("rightDiv");
var workspaceDiv = document.getElementById("workspaceDiv");
var gridDiv = document.getElementById("gridDiv");

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
violet = "#ee82ee",
colors = [red, orange, yellow, green, blue, indigo, violet];

//prevents browser zoom
const preventZoom = function(e) {
    if(e.ctrlKey || e.metaKey)
        e.preventDefault();
};
window.addEventListener("wheel", preventZoom, {passive: false});
window.addEventListener("keydown", preventZoom, {passive: false});



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
    for (let z = 0; z < columns; z++) {
        rowArray.forEach(element => coordinates.push(columnArray[z] + "-" + rowArray[element]));
        matrix.push(coordinates);
        coordinates = [];
    }
    matrix = matrix.reverse();
    return matrix;
}


function createGrid(matrix) {
    let gridArray = matrix.reverse();
    let rows = matrix.length;
    let columns = matrix[0].length;
    workspaceDiv.innerHTML = `<div id='gridDiv' style = "width: ${columns * 25.6}px; height: ${rows * 25.6}px"><div id = 'middleDiv' style = "width: ${columns * 25.6}px; height: ${rows * 25.6}px"></div></div>`;
    gridDiv = document.getElementById("gridDiv");
    middleDiv = document.getElementById("middleDiv");
    for (let y = 0; y < rows; y++) {
        let reverseArray = gridArray[y].reverse();
        for (let x = 0; x < columns; x++) {
            middleDiv.insertAdjacentHTML("afterbegin", `<div class="cell">${(gridArray[y])[x]}</div>`);
        }
        reverseArray = gridArray[y].reverse();
        middleDiv.insertAdjacentHTML("afterbegin", "<div></div>");
    }
    matrix = matrix.reverse();
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
