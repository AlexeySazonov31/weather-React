import React from "react";

function Week({ forecasts, yesterday, city }) {
  const result = forecasts.map((note, item) => {
    const icon = `https://yastatic.net/weather/i/icons/funky/dark/${note.parts.day_short.icon}.svg`;
    let ClassName = "";
    if (item === 0) {
      ClassName = "rightNowWeek";
    } else {
      ClassName = "dayCard";
    }
    return (
      <div className={ClassName} key={item}>
        <div className="headerWeekDayCard">{headerInfo(note.date)}</div>
        <div className="conditionWeekDayCard">
          {conditionText(note.parts.day_short.condition)}
        </div>
        <div className="imageWeekDayCard">
          <img src={icon} alt="icon weather" />
        </div>
        <div className="bottomInfoWeekDayCard">
          <div>
            <h4>Temp</h4>
            <h4>
              <span>{note.parts.day_short.temp}°C&nbsp;&nbsp;</span>
              {note.parts.day_short.feels_like}°C
            </h4>
          </div>
          <div>
            <h4>Humidity</h4>
            <h4>
              <span>{note.parts.day_short.humidity}%</span>
            </h4>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="weekCard">
      <div className="weekInfoTop">
        <h1>The forecast for seven days, {city}</h1>
      </div>

      <div className="daysWeekBlock">
        {/*-------------yesterday----------*/}
        <div className="dayCard yesterdayWeek">
          <div className="headerWeekDayCard">
            {yesterdayDate(forecasts[0].date)}
          </div>
          <div className="headerWeekDayCard">yesterday</div>
          <div className="bottomInfoWeekDayCard">
            <h4>Temp:</h4>
            <h4>
              <span>{yesterday.temp}°C</span>
            </h4>
          </div>
        </div>
        {/*---------------yesterday---------------*/}
        {result}
      </div>
    </div>
  );
}

export default Week;
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
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function headerInfo(str) {
  let arr = str.split("-");
  let res =
    months[arr[1] - 1] + " " + arr[2] + ", " + weekDays[new Date(arr).getDay()];
  return res;
}

function conditionText(str) {
  return str.split("-")[0];
}

function yesterdayDate(str) {
  let arr = str.split("-");
  arr[2] = arr[2] - 1;
  if (String(arr[2]).length === 1) {
    arr[2] = "0" + arr[2];
  }
  let res =
    months[arr[1] - 1] + " " + arr[2] + ", " + weekDays[new Date(arr).getDay()];
  return res;
}
