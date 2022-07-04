import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import fetch from 'node-fetch';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

let wt;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build"));


app.get( "/apiWT/:lat/:lon", (req, res) => {
  fetch( `https://api.weather.yandex.ru/v1/forecast?lat=${req.params.lat}&lon=${req.params.lon}&lang=en_US&limit=7&hours=true&extra=false`, {
    method: "GET",
    headers: {
      "X-Yandex-API-Key": API_KEY,
    } } )
      .then( res => res.json() )
      .then( data => {
        res.json( data );
        console.log('!!!data sent!!!,  ' + data.geo_object.locality.name);
      } )
      .catch((e) => {
        console.log(e);
      })
} )

app.get( "/apiGeo/:search", (req, res) => {
  fetch(`http://api.geonames.org/searchJSON?q=${req.params.search}&maxRows=6&username=sazonov`)
      .then( res => res.json() )
      .then( data => {
        res.json( data );
        console.log('!!!search location!!!');
      } )
      .catch((e) => {
        console.log(e);
      })
} )


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, () => {
  console.log("running, port: " + PORT);
});

