const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");

const data1 = [
  [-2, 0, 180],
  [-2, 0, 145],
  [-2, 0, 115],
  [-2, 0, 80],
  [-2, 0, 40],
  [-2, 0, 25],
  [-2, 0, 20],
  [-2, 0, 12],
  [-2, 0, -2],
  [15, 0, -2],
  [25, 0, -2],
  [55, 0, -2],
  [110, 0, -2],
  [160, 0, -2],
  [170, 0, -2],
  [180, 0, -2],
];
const data2 = [
  [-2, 0, 170],
  [-2, 0, 130],
  [-2, 0, 105],
  [-2, 0, 65],
  [-2, 0, 25],
  [-2, 0, 22],
  [-2, 0, 8],
  [-2, 0, -5],
  [-2, 0, -25],
  [-2, 0, -40],
  [-2, 0, -55],
  [-2, 0, -105],
  [-2, 0, -145],
  [-2, 0, -215],
  [-2, 0, -260],
  [-2, 0, -285],
];
const data3 = [
  [-5.5, 0, 175],
  [-5.5, 0, 135],
  [-5.5, 0, 105],
  [-5.5, 0, 65],
  [-5.5, 0, 25],
  [-5.5, 0, 22],
  [-5.5, 0, 8],
  [-5.5, 0, -5],
  [-5.5, 0, -25],
  [-5.5, 0, -45],
  [-5.5, 0, -55],
  [-5.5, 0, -105],
  [-5.5, 0, -145],
  [-5.5, 0, -215],
  [-5.5, 0, -265],
  [-5.5, 0, -285],
];

const app = express();
app.use(cors());

const port = 3000;

const dataList = [data1, data2, data3];
let indexWrapper = new Array(dataList.length).fill(0);
let responseJson;

app.get("/getWayPoint", (req, res) => {
  res.json(responseJson);
});

setInterval(() => {
  responseJson = {
    data: [],
  };
  dataList.forEach((data, idx) => {
    const result = {
      type: "car",
      uuid: v4(),
    };

    result.x = data[indexWrapper[idx]][0];
    result.y = data[indexWrapper[idx]][1];
    result.z = data[indexWrapper[idx]][2];

    responseJson.data.push(result);
  });

  console.log(responseJson);

  dataList.forEach((data, idx) => {
    indexWrapper[idx] += 1;
    if (indexWrapper[idx] >= data.length) indexWrapper[idx] = 0;
  });
}, 1000);

app.listen(port, () => {
  console.log(`Eample app listening on port ${port}`);
});
