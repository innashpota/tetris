let main = document.querySelector(".main");

let playField = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0]
];

let gameSpeed = 400;

function draw() {
    let mainInnerHTML = '';

    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            switch (playField[y][x]) {
                case 1:
                    mainInnerHTML += '<div class="cell moving-cell"></div>';
                    break;
                case 2:
                    mainInnerHTML += '<div class="cell fixed-cell"></div>';
                    break;
                default:
                    mainInnerHTML += '<div class="cell"></div>';
            }
        }
    }
    main.innerHTML = mainInnerHTML;
}

function canMoveTetroDown() {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                if (y === playField.length - 1 || playField[y + 1][x] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function moveTetroDown() {
    if (canMoveTetroDown()) {
        for (let y = playField.length - 1; y >= 0; y--) {
            for (let x = 0; x < playField[y].length; x++) {
                if (playField[y][x] === 1) {
                    playField[y + 1][x] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    } else {
        fixTetro();
    }
}

function canMoveTetroLeft() {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                if (x === 0 || playField[y][x - 1] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function moveTetroLeft() {
    if (canMoveTetroLeft()) {
        for (let y = playField.length - 1; y >= 0; y--) {
            for (let x = 0; x < playField[y].length; x++) {
                if (playField[y][x] === 1) {
                    playField[y][x - 1] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }
}

function canMoveTetroRight() {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                if (x === playField[y].length - 1 || playField[y][x + 1] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function moveTetroRight() {
    if (canMoveTetroRight()) {
        for (let y = playField.length - 1; y >= 0; y--) {
            for (let x = playField[y].length - 1; x >= 0; x--) {
                if (playField[y][x] === 1) {
                    playField[y][x + 1] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }
}

function removeFullLines() {
    for (let y = 0; y < playField.length; y++) {
        let canRemoveLine = true;

        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] !== 2) {
                canRemoveLine = false;
            }
        }

        if (canRemoveLine) {
            playField.splice(y, 1);
            playField.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }
}

function fixTetro() {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                playField[y][x] = 2;
            }
        }
    }

    removeFullLines();

    playField[0] = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    playField[1] = [0, 0, 0, 1, 1, 1, 0, 0, 0, 0];
}

draw();

document.onkeydown = function (event) {
    switch(event.keyCode) {
        case 37:
            moveTetroLeft();
            break;
        case 39:
            moveTetroRight();
            break;
        case 40:
            moveTetroDown();
            break;
    }
    draw();
}

function startGame() {
    moveTetroDown();
    draw();

    setTimeout(startGame, gameSpeed);
}

setTimeout(startGame, 1000);