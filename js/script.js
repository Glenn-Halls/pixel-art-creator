// Global Variables
const headingElement = document.querySelector('h1');
const headingArray = Array.from(headingElement.innerText);

// Variables to control speed of typing
const h1TimeVar = 123,
pTimeVar = 123;

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
