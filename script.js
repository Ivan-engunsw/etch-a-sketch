let initialGridSize = 16;
let blocks = [];
let flexBoxes = [];

const sizeButton = document.createElement('button');
document.querySelector('.big-container').appendChild(sizeButton);
sizeButton.textContent = 'Change Size';
sizeButton.setAttribute('style', 'max-height: 50px; max-width: 100px; border-radius: 8px; background-color: cyan')
sizeButton.addEventListener('click', changeSize);

// creates initial grid with size 16
createFlexBoxes(initialGridSize);
createGrid(initialGridSize);

// changes the size of the grid to the new size the user inputs
function changeSize() {
    let newSize = parseInt(prompt('Enter a new size for the grid'));

    while (newSize < 0 || newSize > 100) {
        alert('Please enter a number between 1 and 100');
        newSize = parseInt(prompt('Enter a new size for the grid'));
    }

    clearGrid();
    createFlexBoxes(newSize);
    createGrid(newSize);
}

// clears the grid of all blocks and flex-boxes so the new grid can be created in the same space
function clearGrid() {
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
        document.querySelector('.container').appendChild(flexBoxes[i]);
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
        blocks[i].setAttribute('style', 'border: 1px solid black; padding: auto; background-color: white; box-sizing: border-box');
        blocks[i].style.height = `${700 / size}px`;
        blocks[i].style.width = `${960 / size}px`;
        blocks[i].addEventListener('mouseover', changeColor);
    }   
}

function changeColor(e) {
    e.target.style.backgroundColor = 'blue';
}