// Global Variables
var headingElement = document.querySelector('h1'),
headingArray = Array.from(headingElement.innerText),
middleDiv = document.getElementById("middleDiv"),
leftDiv = document.getElementById("leftDiv"),
rightDiv = document.getElementById("rightDiv"),
workspaceDiv = document.getElementById("workspaceDiv"),
gridDiv = document.getElementById("gridDiv"),
leftClick = document.getElementById("leftClick"),
rightClick = document.getElementById("rightClick"),
middleClick = document.getElementById("middleClick"),
gridMatrix = [];

const createGridButtom = document.getElementById("createGrid"),
button5x5 = document.getElementById("5x5"),
button10x10 = document.getElementById("10x10"),
button15x15 = document.getElementById("15x15"),
button20x20 = document.getElementById("20x20"),
colorInput = document.getElementById("inputColor"),
inputRows = document.getElementById("inputRows"),
inputColumns = document.getElementById("inputColumns"),
customColorBox = document.getElementById("customColor");

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
var middleClickColor = '#ffffff'

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
workspaceDiv.addEventListener('contextmenu', e => e.preventDefault());
leftDiv.addEventListener('contextmenu', e => e.preventDefault());

// Listens for mouse click
workspaceDiv.addEventListener("mousedown", colorCell);
leftDiv.addEventListener("mousedown", selectColor);
createGridButtom.addEventListener("mousedown", createGridFromButton);
colorInput.addEventListener("input", customColorInput);

// Listens and responds to clicks on EZ Grid buttons
button5x5.addEventListener("mousedown", e => {makeGrid(5, 5)});
button10x10.addEventListener("mousedown", e => {makeGrid(10, 10)});
button15x15.addEventListener("mousedown", e => {makeGrid(15, 15)});
button20x20.addEventListener("mousedown", e => {makeGrid(20, 20)});

function customColorInput() {
    // Changes customColor variable and customColorBox color after custom color selection
    customColor = colorInput.value;
    customColorBox.innerHTML = `<div class = "cellColor" style = "background-color: ${customColor}; pointer-events: none;"></div>`;
}

function createGridFromButton(event) {
    // Creates a new grid from inputted _N_ and _M_ values
    if ((inputColumns.value < 1) || (inputColumns.value > 20) || (inputRows.value < 1) || (inputRows.value > 20)) {
        alert("Error: your grid must be from 1 - 20 in both width and height");
    }
    else {
        makeGrid(inputColumns.value, inputRows.value);
    }
}

function reClick() {
    leftClick = document.getElementById("leftClick");
    rightClick = document.getElementById("rightClick");
    middleClick = document.getElementById("middleClick");
}

function selectColor(event) {
    // Changes color variable based on left / right  mouse click
    if (event.button === 0) {
        // Event on left-click
        if ((event.target.id != "") && (event.target.id != "leftClick") && (event.target.id != "rightClick") && (event.target.id != "customColor")) {
            // Changes color when preset colors are left-clicked
            clickColor = event.target.id;
            let colorBox = leftClick.getElementsByClassName("cellColor")[0];
            let insideHTML = colorBox.innerHTML;
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${clickColor};">${insideHTML}\n</div>`;
        }
        else if (event.target.id === "customColor") {
            // Changes color when custom color is left-clicked
            clickColor = customColor;
            let colorBox = leftClick.getElementsByClassName("cellColor")[0];
            let insideHTML = colorBox.innerHTML;
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${clickColor};">${insideHTML}\n</div>`;
        }
    reClick();
    }
    else if (event.button === 2) {
        // Event on right-click
        if ((event.target.id != "") && (event.target.id != "leftClick") && (event.target.id != "rightClick") && (event.target.id != "customColor")) {
            // Changes color when preset colors are right-clicked
            rightClickColor = event.target.id;
            let colorBox = rightClick.getElementsByClassName("cellColor")[0];
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${rightClickColor};">\n</div>`;
        }
        if (event.target.id === "customColor") {
            // Changes color when custom color is right-clicked
            rightClickColor = customColor;
            let colorBox = rightClick.getElementsByClassName("cellColor")[0];
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${rightClickColor};">\n</div>`;
        }
    reClick();
    }
    else if (event.button === 1) {
        // Event on middle-click
        if ((event.target.id != "") && (event.target.id != "leftClick") && (event.target.id != "rightClick") && (event.target.id != "customColor")) {
            // Changes color when preset colors are middle-clicked
            middleClickColor = event.target.id;
            let colorBox = middleClick.getElementsByClassName("cellColor")[0];
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${middleClickColor};">\n</div>`;
        }
        if (event.target.id === "customColor") {
            // Changes color when custom color is middle-clicked
            middleClickColor = customColor;          
            let colorBox = middleClick.getElementsByClassName("cellColor")[0];
            colorBox.outerHTML = `<div class="cellColor" style="background-color: ${middleClickColor};">\n</div>`;
        }
    reClick();
    }
}


function colorCell(event) {
    // Changes cell color according to left, right or middle click
    if (event.button === 0) {
        event.target.outerHTML = `<div class='cellColor' style = "background-color: ${clickColor}"></div>`
    }
    else if (event.button === 2) {
        event.target.outerHTML = `<div class='cellColor' style = "background-color: ${rightClickColor}"></div>`
    }
    else if (event.button === 1) {
        // Changes all cells of the color that is clicked, to the middleClickColor
        changeColor(event.target.outerHTML);
    }
}


function changeColor(colorSelect) {
    middleDiv.innerHTML = middleDiv.innerHTML.replaceAll(colorSelect, middleClick.innerHTML);
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
    headingElement.innerHTML = newVar;
}

function makeGrid(_M_, _N_) {
    gridMatrix = createMatrix(_N_, _M_);
    createGridFrom(gridMatrix);
}

typeHeading();
