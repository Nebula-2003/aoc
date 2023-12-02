const fs = require("fs");
const readline = require("readline");
const filePath = "./aoc_1_input.txt";
const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

const linesArray = [];
const numbersArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine","zero"];
rl.on("line", (line) => {
    linesArray.push(line);
});

rl.on("close", () => {
    console.log("File closed");
    let finalSum = 0;
    linesArray.forEach((line) => {
        numbersArray.forEach((number) => {
            index   = line.search(number)
        });
        console.log("🚀 ~ file: aoc_1.js:29 ~ linesArray.forEach ~ line:", line);
        let fNumber = line.split("").find((char) => !isNaN(Number(char)));
        let rLine = line.split("").reverse().join("");
        let lNumber = rLine.split("").find((char) => !isNaN(Number(char)));
        finalSum = finalSum + Number(fNumber) * 10 + Number(lNumber);
    });
    console.log("🚀 ~ file: aoc_1.js:29 ~ linesArray.forEach ~ finalSum:", finalSum);
});
