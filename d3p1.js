const fs = require("fs");
const _ = require("lodash");

const array = fs.readFileSync("d3.input.test.txt").toString().split("\n");
// const array = fs.readFileSync("d3.input.txt").toString().split("\n");

const SYMBOL = ["@", "#", "$", "%", "&", "*", "/", "+", "+", "=", "-"];

// array.forEach((line)=>{
//     line.forEach(char=> )
// })
let listOfSymbol = [
    // {
    //     row,
    //     col
    // }
];
let listOfNumber = [
    // {
    //     number,
    //     start:{row, col},
    //     end:{row,col},
    //     wantedPositions:[{row,col}]
    // }
];
for (let row = 0; row < array.length; row++) {
    let numberIndexReached = -1;
    for (let col = 0; col < array.length; col++) {
        if (SYMBOL.includes(array[row][col])) {
            listOfSymbol.push({
                row,
                col,
            });
        }
        if (!isNaN(Number(array[row][col])) && numberIndexReached < col) {
            // console.log("🚀 ~ file: d3p1.js:34 ~ array[row][col]:", row, col, array[row][col]);
            numberIndexReached = col;
            let numberObj = { start: { col, row }, end: {}, number: 0 };
            let numberIndex;
            for (numberIndex = col; numberIndex <= 140; numberIndex++) {
                if (!isNaN(Number(array[row][numberIndex]))) {
                    numberObj.number += array[row][numberIndex];
                } else {
                    numberObj.end = { col: numberIndex - 1, row };
                    numberObj.number = Number(numberObj.number);
                    break;
                }
            }
            listOfNumber.push(numberObj);
            numberIndexReached = numberIndex;
        }
    }
}

// console.log("🚀 ~ file: d3p1.js:17 ~ listOfSymbol:", listOfSymbol, listOfNumber);

function findAdjacentPositions(number) {
    let output = [];
    let a = [
        //Ends
        { row: number.start.row, col: number.start.col - 1 },
        { row: number.end.row, col: number.end.col + 1 },
        //diagonals
        { row: number.start.row - 1, col: number.start.col - 1 },
        { row: number.start.row + 1, col: number.start.col - 1 },
        { row: number.end.row - 1, col: number.start.col + 1 },
        { row: number.end.row + 1, col: number.start.col + 1 },
    ];
    a.forEach((a) => {
        if (a.row > 0 && a.col > 0) {
            output.push(a);
        }
    });
    for (let index = number.start.row, i = 0; index <= number.end.row; index++, i++) {
        let b = [
            { row: index - 1, col: number.start.col + i },
            { row: index + 1, col: number.start.col + i },
        ];
        b.forEach((a) => {
            if (a.row > 0 && a.col > 0) {
                // console.log(a);
                output.push(a);
            }
        });
    }
    return output;
}

// console.log(findAdjacentPositions(listOfNumber[5]));

let sum = 0;
listOfNumber.forEach((numberObj) => {
    let adjacentPositions = findAdjacentPositions(numberObj);
    const intersection = _.intersectionWith(adjacentPositions, listOfSymbol, _.isEqual);
    if (intersection.length) {
        sum += numberObj.number;
    }
});
console.log("🚀 ~ file: d3p1.js:92 ~ sum:", sum);
