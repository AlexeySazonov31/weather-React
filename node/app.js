import "dotenv/config";
import express from "express";
import request from "request";
import bodyParser from "body-parser";

import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

console.log(process.env)

let wt;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build"));

app.use("/apiWT/:lat/:lon", (req, res) => {
  let options = {
    method: "GET",
    uri: `https://api.weather.yandex.ru/v1/forecast?lat=${req.params.lat}&lon=${req.params.lon}&lang=en_US&limit=7&hours=true&extra=false`,
    headers: {
      "X-Yandex-API-Key": API_KEY,
    },
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      wt = JSON.parse(body);
      console.log("temp: " + wt.fact.temp);
    }
  });

  res.json(wt);
  console.log("json send");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, () => {
  console.log("running, port: " + PORT);
});

