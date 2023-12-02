const fs = require("fs");

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

function mainDay2() {
    const array = fs.readFileSync("d2.input.txt").toString().split("\n");

    let sumOfValidGames = 0;

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
        let isPossible = true;
        if (line === "") return;
        obj.id = Number(line.split(" ")[1].replace(":", ""));
        let data = line.split(":")[1].trim();
        let eachRound = data.split(";");
        eachRound.forEach((round) => {
            let eachColor = round.trim().split(",");
            // let data = new Map();
            let data = {};
            eachColor.forEach((colorCount) => {
                let oneColor = colorCount.trim().split(" ");
                data[oneColor[1]] = oneColor[0];
            });
            obj.data.push(data);
        });
        obj.data.forEach((data) => {
            if (data.red > RED_CUBES || data.green > GREEN_CUBES || data.blue > BLUE_CUBES) isPossible = false;
        });
        if (isPossible) sumOfValidGames += obj.id;
        console.log("🚀 ~ file: d2p1.js:39 ~ array.forEach ~ isPossible:", isPossible);
        console.log("🚀 ~ file: d2p1.js:21 ~ array.forEach ~ obj:", obj);
    });
    console.log("🚀 ~ file: d2p1.js:39 ~ array.forEach ~ sumOfValidGames:", sumOfValidGames);
}
function measurePerformance(callback) {
    const startTime = performance.now();
    callback();
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`Operation took ${elapsedTime} milliseconds.`);
}

measurePerformance(mainDay2);
