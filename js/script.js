// Global Variables
var headingElement = document.querySelector('h1');
var headingArray = Array.from(headingElement.innerText);
var middleDiv = document.getElementById("middleDiv");
var leftDiv = document.getElementById("leftDiv");
var rightDiv = document.getElementById("rightDiv");
var workspaceDiv = document.getElementById("workspaceDiv");
var gridDiv = document.getElementById("gridDiv");
var leftClick = document.getElementById("leftClick");
var rightClick = document.getElementById("rightClick");
const createGridButtom = document.getElementById("createGrid");
const button5x5 = document.getElementById("5x5");
const button10x10 = document.getElementById("10x10");
const button15x15 = document.getElementById("15x15");
const button20x20 = document.getElementById("20x20");
const colorInput = document.getElementById("inputColor");
const inputRows = document.getElementById("inputRows");
const inputColumns = document.getElementById("inputColumns");
const customColorBox = document.getElementById("customColor");
var gridMatrix = [];

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

// Variable to control color pickers
var clickColor = black
var rightClickColor = white
var customColor = "#ffffff"

// Prevents resizing with ctrl + mousewheel
window.addEventListener("wheel", (event) => {
    if (event.ctrlKey || event.metaKey)
        event.preventDefault();
}, {passive: false});


// Prevents resizing with ctrl + =/-
window.addEventListener("keydown", (event) => {
    if (event.key === '=') {
        event.preventDefault();
    }
    else if (event.key === '-') {
        event.preventDefault();
    }    
}, {passive: false});

// Prevents right-click context menus on work space
workspaceDiv.addEventListener('contextmenu', e => e.preventDefault())
leftDiv.addEventListener('contextmenu', e => e.preventDefault())

// Listens for mouse click
workspaceDiv.addEventListener("mousedown", colorCell);
leftDiv.addEventListener("mousedown", selectColor);
createGridButtom.addEventListener("mousedown", createGridFromButton);
colorInput.addEventListener("input", customColorInput);

function customColorInput() {
    console.log(colorInput.value);
    customColor = colorInput.value;
    customColorBox.innerHTML = `<div class = "cellColor" style = "background-color: ${customColor}"></div>`;
    


}

function createGridFromButton(event) {
    if ((inputColumns.value < 1) || (inputColumns.value > 20) || (inputRows.value < 1) || (inputRows.value > 20)) {
        alert("Error: your grid must be from 1 - 20 in both width and height");
    }
    else {
        makeGrid(inputColumns.value, inputRows.value);
    }
}

function selectColor(event) {
    // Changes color variable based on left / right  mouse click
    if (event.button === 0) {
        if ((event.target.id != "") && (event.target.id != "leftClick") && (event.target.id != "rightClick") && (event.target.id != "customColor")) {
            clickColor = event.target.id;
            let colorBox = leftClick.getElementsByClassName("cellColor")[0];
            let insideHTML = colorBox.innerHTML;
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${clickColor};">${insideHTML}\n</div>`;
            leftClick = document.getElementById("leftClick");
            rightClick = document.getElementById("rightClick");
        }
    }
    else if (event.button === 2) {
        if ((event.target.id != "") && (event.target.id != "leftClick") && (event.target.id != "rightClick") && (event.target.id != "customColor")) {
            rightClickColor = event.target.id;
            let colorBox = rightClick.getElementsByClassName("cellColor")[0];
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${rightClickColor};">\n</div>`;
            leftClick = document.getElementById("leftClick");
            rightClick = document.getElementById("rightClick");
        }
    }
}


function colorCell(event) {
    // Changes cell color according to left or right click
    if (event.button === 0) {
        event.target.outerHTML = `<div class='cellColor' style = "background-color: ${clickColor}"></div>`
    }
    else if (event.button === 2) {
        event.target.outerHTML = `<div class='cellColor' style = "background-color: ${rightClickColor}"></div>`
    }
    else if (event.button === 1) {
    // Placeholder, will be used in the future to replace one color with another
        console.log("middle-click")
    }
}

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


function createGridFrom(matrix) {
    // Creates a grid from the matrix generated by createMatrix
    let gridArray = matrix.reverse();
    let rows = matrix.length;
    let columns = matrix[0].length;
    workspaceDiv.innerHTML = `<div id='gridDiv' style = "width: ${columns * 30}px; height: ${rows * 30}px"><div id = 'middleDiv' style = "width: ${columns * 30}px; height: ${rows * 30}px"></div></div>`;
    gridDiv = document.getElementById("gridDiv");
    middleDiv = document.getElementById("middleDiv");
    for (let y = 0; y < rows; y++) {
        let reverseArray = gridArray[y].reverse();
        for (let x = 0; x < columns; x++) {
            middleDiv.insertAdjacentHTML("afterbegin", `<div class="cell" id = "${(gridArray[y])[x]}"><div class="grid"></div></div>`);
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

function makeGrid(_M_, _N_) {
    gridMatrix = createMatrix(_N_, _M_);
    createGridFrom(gridMatrix);
}

typeHeading();
