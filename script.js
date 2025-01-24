let initialGridSize = 16;
let blocks = [];
let flexBoxes = [];
let color = 'black';
let mousedown = false;

const body = document.querySelector('body');
body.addEventListener('mousedown', () => {
    mousedown = true;
});
body.addEventListener('mouseup', () => {
    mousedown = false;
});

// changes the color as the user clicks on the new color in the color picker
const colorPicker = document.createElement('input');
colorPicker.setAttribute('type', 'color');
document.querySelector('.controls').appendChild(colorPicker);
colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
});

const clearButton = document.createElement('button');
document.querySelector('.controls').appendChild(clearButton);
clearButton.textContent = 'Clear Grid';
clearButton.setAttribute('style', 'height: 80px; width: 150px; border-radius: 8px; background-color: darkcyan; color: white')
clearButton.addEventListener('click', clearGrid);

function clearGrid() {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = 'white';
    }
}

// changes the size of the grid when the user clicks the 'Change Size' button
const sizeButton = document.createElement('button');
document.querySelector('.controls').appendChild(sizeButton);
sizeButton.textContent = 'Change Size';
sizeButton.setAttribute('style', 'height: 80px; width: 150px; border-radius: 8px; background-color: darkcyan; color: white')
sizeButton.addEventListener('click', changeSize);

// creates initial grid with size 16
createFlexBoxes(initialGridSize);
createGrid(initialGridSize);

// changes the size of the grid to the new size the user inputs
function changeSize() {
    let newSizeString = prompt('Enter a new size for the grid');
    if (newSizeString === null) {
        return;
    }

    let newSize = parseInt(newSizeString);

    while (newSize < 0 || newSize > 100) {
        alert('Please enter a number between 1 and 100');
        newSize = parseInt(prompt('Enter a new size for the grid'));
    }

    removeGrid();
    createFlexBoxes(newSize);
    createGrid(newSize);
}

// removes the grid of all blocks and flex-boxes so the new grid can be created in the same space
function removeGrid() {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].remove();
    }

    for (let i = 0; i < flexBoxes.length; i++) {
        flexBoxes[i].remove();
    }

    blocks.splice(0, blocks.length);
    flexBoxes.splice(0, flexBoxes.length);
}

// Creates the flex boxes that will contain the blocks in a grid-like manner
function createFlexBoxes(size) {
    for (let i = 0; i < size; i++) {
        flexBoxes[i] = document.createElement('div');
        flexBoxes[i].classList.add('flex-box');
        document.querySelector('.grid').appendChild(flexBoxes[i]);
        flexBoxes[i].setAttribute('style', `display: flex; flex-direction: column`);
    }
}

// Creates each block in the grid
function createGrid(size) {
    // creating size * size number of blocks
    for (let i = 0; i < (size ** 2); i++) {
        blocks[i] = document.createElement('div');
        blocks[i].classList.add('block');
        flexBoxes[i % size].appendChild(blocks[i]);
        blocks[i].setAttribute('style', 'padding: auto; background-color: white; box-sizing: border-box');
        blocks[i].style.height = `${700 / size}px`;
        blocks[i].style.width = `${960 / size}px`;
        blocks[i].addEventListener('mouseover', changeColor);
        blocks[i].addEventListener('mousedown', changeColor);
    }   
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mousedown) {
        return;
    }
    e.target.style.backgroundColor = color;
}