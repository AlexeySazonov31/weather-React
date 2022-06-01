import React from "react";

function Today({todayWT,date,todayRight,city}){

    const result = todayWT.hours.map( (note, item) => {

        const icon = `https://yastatic.net/weather/i/icons/funky/dark/${note.icon}.svg`;
        let ClassName = '';
        if(  ((new Date()).getHours() === Number(note.hour)) && todayRight ){
            ClassName = 'rightNowToday';
        } else {
            ClassName = 'hourCard';
        }
        return <div className={ClassName} key={item}>
            <div className="hourTodayBlock">
                {note.hour}:00
            </div>
            <div className="conditionTodayBlock">
                {oneWord(note.condition)}
            </div>
            <div className="imageTodayBlock">
                <img src={icon} alt="icon weather"/>
            </div>
            <div className="bottomInfoTodayBlock">
                <span>{note.temp}°C</span>&nbsp;&nbsp;&nbsp;{note.feels_like}°C
            </div>
        </div>
    })


    return <div className="todayCard">
        <div className="todayInfoTop">
            <h1>{dateHeader(date)}, {city}</h1>
        </div>

        <div className="byHours">
            {result}
        </div>
    </div>
}

export default Today;

const months = ["January","February","March","April","May","June","July","August","September","october","November","December"];
const weekDays = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];

function oneWord(str){
    let arr = str.split('-');
    return arr[0];
}
function dateHeader(str){
    let arr = str.split('-');
    let result = months[arr[1]-1] + ' ' + arr[2] + ', ' + weekDays[(new Date(arr)).getDay()];
    return result;
}

