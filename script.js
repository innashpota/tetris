const main = document.querySelector(".main");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const playField = [
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const figures = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ]
];

let score = 0;
let level = 1;
let possibleLevel = {
    1: {
        scorePerLine: 10,
        speed: 400,
        nextLevelScore: 500
    },
    2: {
        scorePerLine: 15,
        speed: 300,
        nextLevelScore: 1500
    },
    3: {
        scorePerLine: 20,
        speed: 250,
        nextLevelScore: 2000,
    },
    4: {
        scorePerLine: 30,
        speed: 200,
        nextLevelScore: 3000,
    },
    5: {
        scorePerLine: 50,
        speed: 10,
        nextLevelScore: Infinity,
    }
};
let activeTetro = {
    x: 0,
    y: 0,
    shape: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
};

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

function removePrevActiveTetro() {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                playField[y][x] = 0;
            }
        }
    }
}

function addActiveTetro() {
    removePrevActiveTetro();
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] === 1) {
                playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
            }
        }
    }
}

function rotateTetro() {
    const prevTetroSate = activeTetro.shape;

    activeTetro.shape = activeTetro.shape[0]
        .map((val, index) =>
            activeTetro.shape
                .map(row => row[index]).reverse()
        );

    if (hasCollisions()) {
        activeTetro.shape = prevTetroSate;
    }
}

function hasCollisions() {
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (
                activeTetro.shape[y][x] === 1 &&
                (
                    playField[activeTetro.y + y] === undefined ||
                    playField[activeTetro.y + y][activeTetro.x + x] === undefined ||
                    playField[activeTetro.y + y][activeTetro.x + x] === 2
                )
            ) {
                return true;
            }
        }
    }
    return false;
}

function removeFullLines() {
    let filledLines = 0;

    for (let y = 0; y < playField.length; y++) {
        let canRemoveLine = true;

        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] !== 2) {
                canRemoveLine = false;
                break;
            }
        }

        if (canRemoveLine) {
            playField.splice(y, 1);
            let emptyLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            playField.unshift(emptyLine);
            filledLines += 1;
        }
    }

    switch (filledLines) {
        case 1:
            score += 10;
            break;
        case 2:
            score += 3 * 10;
            break;
        case 3:
            score += 6 * 10;
            break;
        case 4:
            score += 12 * 10;
            break;
    }

    scoreElement.innerHTML = score;
    if (score >= possibleLevel[level].nextLevelScore) {
        level++;
        levelElement.innerHTML = level;
    }
}

function getNewTetro() {
    const random = Math.floor(Math.random() * 7);
    return figures[random];
}

function fixTetro() {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                playField[y][x] = 2;
            }
        }
    }
}

function moveTetroDawn() {
    activeTetro.y += 1;

    if (hasCollisions()) {
        activeTetro.y -= 1;
        fixTetro();
        removeFullLines();
        activeTetro.shape = getNewTetro();
        activeTetro.x = Math.floor((10 - activeTetro.shape[0].length) / 2);
        activeTetro.y = 0;
    }
}

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            activeTetro.x -= 1;
            if (hasCollisions()) {
                activeTetro.x += 1;
            }
            break;
        case 38:
            rotateTetro();
            break;
        case 39:
            activeTetro.x += 1;
            if (hasCollisions()) {
                activeTetro.x -= 1;
            }
            break;
        case 40:
            moveTetroDawn()
            break;
    }
    addActiveTetro();
    draw();
}

scoreElement.innerHTML = score;
levelElement.innerHTML = level;

addActiveTetro();
draw();

function startGame() {
    moveTetroDawn();
    addActiveTetro();
    draw();

    setTimeout(startGame, possibleLevel[level].speed);
}

setTimeout(startGame, possibleLevel[level].speed);
