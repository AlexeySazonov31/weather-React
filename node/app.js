import 'dotenv/config';
import express from "express";
import request from "request";
import bodyParser from "body-parser";

const key = process.env.KEY;
const PORT = process.env.PORT || 8080;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let wt;

app.get("/apiWT/:lat/:lon", (req, res) => {
  let options = {
    method: "GET",
    uri: `https://api.weather.yandex.ru/v1/forecast?lat=${req.params.lat}&lon=${req.params.lon}&lang=en_US&limit=7&hours=true&extra=false`,
    headers: {
      "X-Yandex-API-Key": key,
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

app.listen(PORT, () => {
  console.log("running, port: " + PORT);
});
