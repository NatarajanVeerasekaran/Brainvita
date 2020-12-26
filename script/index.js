var initialMatixArr = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0]
];
var defaultExcludePosition = [0, 1, 5, 6, 7, 8, 12, 13, 35, 36, 40, 41, 42, 43, 47, 48]
var initialMatrixObj = { 0: "0,0", 1: "0,1", 2: "0,2", 3: "0,3", 4: "0,4", 5: "0,5", 6: "0,6", 7: "1,0", 8: "1,1", 9: "1,2", 10: "1,3", 11: "1,4", 12: "1,5", 13: "1,6", 14: "2,0", 15: "2,1", 16: "2,2", 17: "2,3", 18: "2,4", 19: "2,5", 20: "2,6", 21: "3,0", 22: "3,1", 23: "3,2", 24: "3,3", 25: "3,4", 26: "3,5", 27: "3,6", 28: "4,0", 29: "4,1", 30: "4,2", 31: "4,3", 32: "4,4", 33: "4,5", 34: "4,6", 35: "5,0", 36: "5,1", 37: "5,2", 38: "5,3", 39: "5,4", 40: "5,5", 41: "5,6", 42: "6,0", 43: "6,1", 44: "6,2", 45: "6,3", 46: "6,4", 47: "6,5", 48: "6,6" }

function bindInitialTable() {
    var tbody = document.getElementById("tableBody");
    var counter = -1;
    for (let index = 0; index < 7; index++) {
        var tr = document.createElement("tr");
        for (let index1 = 0; index1 < 7; index1++) {
            counter++;
            var td = document.createElement("td");
            td.id = "td_" + counter;
            if (defaultExcludePosition.indexOf(counter) > -1) {
                td.style.visibility = "hidden";
            } else {
                if (counter != 24) {
                    td.style.backgroundColor = "green";
                }
                // td.innerText = counter;
            }
            tr.append(td);
        }
        tbody.appendChild(tr);
    }
}

function getRow(index) {
    return parseInt(initialMatrixObj[index].split(',')[0]);
}

function getColumn(index) {
    return parseInt(initialMatrixObj[index].split(',')[1]);
}

function updateMatrix(index, value) {
    var row = getRow(index);
    var column = getColumn(index);
    console.log(row + "," + column + " =>" + value);
    initialMatixArr[row][column] = value;
}

function getFreeSpaces() {
    var tempArr = [];
    var counter = -1;
    for (let index = 0; index < 7; index++) {
        for (let index1 = 0; index1 < 7; index1++) {
            counter++;
            if (defaultExcludePosition.indexOf(counter) == -1 && initialMatixArr[index][index1] == 0) {
                tempArr.push(counter);
            }
        }
    }
    return tempArr;
}

function getIndex(row, column) {
    return (row * 7) + column;
}

function getPossibleMoveElements(index) {
    var tempArr = [];
    var row = getRow(index);
    var column = getColumn(index);
    if (row - 2 >= 0) {
        if (initialMatixArr[row - 2][column] != 0 && initialMatixArr[row - 1][column] != 0) {
            tempArr.push({ "CElement": getIndex(row - 2, column), "MElement": getIndex(row - 1, column) });
        }
    }
    if (row + 2 <= 6) {
        if (initialMatixArr[row + 2][column] != 0 && initialMatixArr[row + 1][column] != 0) {
            tempArr.push({ "CElement": getIndex(row + 2, column), "MElement": getIndex(row + 1, column) });
        }
    }
    if (column - 2 >= 0) {
        if (initialMatixArr[row][column - 2] != 0 && initialMatixArr[row][column - 1] != 0) {
            tempArr.push({ "CElement": getIndex(row, column - 2), "MElement": getIndex(row, column - 1) });
        }
    }
    if (column + 2 <= 6) {
        if (initialMatixArr[row][column + 2] != 0 && initialMatixArr[row][column + 1] != 0) {
            tempArr.push({ "CElement": getIndex(row, column + 2), "MElement": getIndex(row, column + 1) });
        }
    }
    return tempArr;
}

function firstSwap(callback) {
    var firstMoveArr = [{ "CElement": 10, "MElement": 17 },
        { "CElement": 22, "MElement": 23 },
        { "CElement": 26, "MElement": 25 },
        { "CElement": 38, "MElement": 31 }
    ];
    var randomIndex = randomNumber(0, 3);
    setTimeout(() => {
        document.getElementById("td_" + firstMoveArr[randomIndex].CElement).style.backgroundColor = "white";
        document.getElementById("td_" + firstMoveArr[randomIndex].MElement).style.backgroundColor = "white";
        document.getElementById("td_24").style.backgroundColor = "green";
        updateMatrix(firstMoveArr[randomIndex].CElement, 0);
        updateMatrix(firstMoveArr[randomIndex].MElement, 0);
        updateMatrix(24, 1);
        callback.call();
    }, 1000);
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame() {
    setTimeout(() => {
        var freeSpaceArr = getFreeSpaces();
        var tempFreeSpaceArr = [];
        for (let index = 0; index < freeSpaceArr.length; index++) {
            if (getPossibleMoveElements(freeSpaceArr[index]).length > 0) {
                tempFreeSpaceArr.push(freeSpaceArr[index]);
            }
        }
        freeSpaceArr = tempFreeSpaceArr;
        if (freeSpaceArr.length == 0) {
            document.getElementById("td_23").colSpan = 3;
            document.getElementById("td_24").remove();
            document.getElementById("td_25").remove();
            document.getElementById("td_23").classList.add("game-over");
            document.getElementById("td_23").innerText = "Game over..!";
        } else {
            var randomIndex = randomNumber(0, freeSpaceArr.length - 1);
            var possibleArr = getPossibleMoveElements(freeSpaceArr[randomIndex]);

            var randomIndex2 = randomNumber(0, possibleArr.length - 1);
            document.getElementById("td_" + freeSpaceArr[randomIndex]).style.backgroundColor = "green";
            document.getElementById("td_" + possibleArr[randomIndex2].CElement).style.backgroundColor = "white";
            document.getElementById("td_" + possibleArr[randomIndex2].MElement).style.backgroundColor = "white";
            updateMatrix(freeSpaceArr[randomIndex], 1);
            updateMatrix(possibleArr[randomIndex2].CElement, 0);
            updateMatrix(possibleArr[randomIndex2].MElement, 0);
            playGame();
        }

    }, 1000);
}

bindInitialTable();
firstSwap(playGame);