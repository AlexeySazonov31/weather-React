import React from "react";
import windIcon from "../images/wind.png";
import rainIcon from "../images/rain.png";
import cloudIcon from "../images/cloud.png";
import pressureIcon from "../images/pressure.png";

function Now({ fact, geo, date }) {
  const icon = `https://yastatic.net/weather/i/icons/funky/dark/${fact.icon}.svg`;

  return (
    <div className="nowCard">

      <div className="headerNow">
        <h1>Now in {geo}</h1>
      </div>

      <div className="dateInfo">
        <h3 className="boldNow">{dayWeek(date)}</h3>
        <h3 className="lightNow">{dateInfo(date)}</h3>
      </div>

      <div className="mainNow">

        <div>

            <img src={icon} alt="icon weather" />

            <div className="bottomImgInfo">
              <div>
                <h3 className="lightNow">Temp</h3>
                <h3 className="boldNow">{fact.temp} °C</h3>
              </div>
              <div>
                <h3 className="lightNow">Feels Like</h3>
                <h3 className="boldNow">{fact.feels_like} °C</h3>
              </div>
              <div>
                <h3 className="lightNow">Humidity</h3>
                <h3 className="boldNow">{fact.humidity} %</h3>
              </div>
            </div>

        </div>

        <div className="additionalInformation">

          <div className="additionalHeader">
            <h3>{condition(fact.condition)}</h3>
          </div>

          <div className="additionalContainerInfo">

            <div className="blockInfo">
              <img src={windIcon} alt="windIcon" />
              <div className="blockInfoText">
                <h3 className="lightNow">Wind</h3>
                <h4 className="lightNow">
                  <span className="boldNow">Velocity: </span>
                  {fact.wind_speed}-{fact.wind_gust}m/c
                </h4>
                <h4 className="lightNow">
                  <span className="boldNow">Direction: </span>
                  {directionWind(fact.wind_dir)}
                </h4>
              </div>
            </div>

            <div className="blockInfo">
              <img src={rainIcon} alt="rainIcon" />
              <div className="blockInfoText">
                <h3 className="lightNow">Rain</h3>
                <h4 className="lightNow">
                  <span className="boldNow">Percentage: </span>
                  {fact.prec_strength * 100} %
                </h4>
              </div>
            </div>

            <div className="blockInfo">
              <img src={cloudIcon} alt="cloudIcon" />
              <div className="blockInfoText">
                <h3 className="lightNow">Clouds</h3>
                <h4 className="lightNow">
                  <span className="boldNow">Percentage: </span>
                  {fact.cloudness * 100} %
                </h4>
              </div>
            </div>

            <div className="blockInfo">
              <img src={pressureIcon} alt="pressureIcon" />
              <div className="blockInfoText">
                <h3 className="lightNow">Pressure</h3>
                <h4 className="lightNow">
                  <span className="boldNow">Percentage: </span>
                  {fact.pressure_mm} mm
                </h4>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Now;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "october",
  "November",
  "December",
];
function dateInfo(dt) {
  dt = dt.split("-");
  if (dt[1][0] === "0") {
    dt[1] = dt[1][1];
  }
  return months[dt[1] - 1] + " " + dt[2];
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function dayWeek(dt) {
  dt = dt.split("-");
  return weekDays[new Date(dt).getDay()];
}

function condition(str) {
  let arr = str.split("-");
  let res = [];
  for (let elem of arr) {
    if (elem === "and") {
      res.push(elem);
    } else {
      res.push(elem[0].toUpperCase() + elem.slice(1));
    }
  }
  return res.join(" ");
}

function directionWind(str) {
  let obj = {
    nw: "north-west",
    n: "north",
    ne: "north-east",
    e: "eastern",
    se: "south-eastern",
    s: "southern",
    sw: "south-west",
    w: "western",
    c: "calm",
  };
  let res;
  for (let key in obj) {
    if (key === str) {
      res = obj[key];
    }
  }
  return res;
}
