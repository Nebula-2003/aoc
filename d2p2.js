const fs = require("fs");
let RED_CUBES = 12;
let GREEN_CUBES = 13;
let BLUE_CUBES = 14;

// const array = fs.readFileSync("d2.input.test.txt").toString().split("\n");
const array = fs.readFileSync("d2.input.txt").toString().split("\n");

let sumOfPower = 0;

array.forEach((line) => {
    let obj = {
        id: 0,
        data: [
            // {
            //     red,
            //     green,
            //     blue,
            // },
        ],
    };
    let maxDataObj = {
        red: 0,
        green: 0,
        blue: 0,
    };
    if (line === "") return;
    obj.id = Number(line.split(" ")[1].replace(":", ""));
    let data = line.split(":")[1].trim();
    let eachRound = data.split(";");
    eachRound.forEach((round) => {
        let eachColor = round.trim().split(",");
        let data = new Map();
        eachColor.forEach((colorCount) => {
            let oneColor = colorCount.trim().split(" ");
            data.set(oneColor[1], oneColor[0]);
            obj.data.push(Object.fromEntries(data));
        });
    });

    obj.data.forEach((round) => {
        Object.keys(round).forEach((key) => {
            if (Number(round[key]) > Number(maxDataObj[key])) {
                maxDataObj[key] = round[key];
            }
        });
    });
    let power = 1;
    Object.values(maxDataObj).forEach((e) => {
        power *= e;
    });
    sumOfPower += power;
    console.log("🚀 ~ file: d2p2.js:50 ~ array.forEach ~ product:", power);
    console.log("🚀 ~ file: d2p2.js:26 ~ array.forEach ~ maxDataObj:", maxDataObj);
});
console.log("****************************************************************");
console.log("🚀 ~ file: d2p2.js:53 ~ array.forEach ~ sumOfPower:", sumOfPower);
console.log("****************************************************************");
