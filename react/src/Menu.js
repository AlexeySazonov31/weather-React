import React from "react";

import { Link, useLocation } from 'react-router-dom';
import useWindowDimensions from './useWindowDimensions';

import NowIc from './images/now.png';
import todayIc from './images/24.png';
import tomorrowIc from './images/tomorrow.png';
import weekIc from './images/week.png';
import searchIc from './images/search.png';

const nameButtons = [
    {
        name: 'Geosearch',
        to: '/',
        icon: searchIc,
    },
    {
        name: 'Now',
        to: '/now',
        icon: NowIc,
    },
    {
        name: 'Today',
        to: '/today',
        icon: todayIc,
    },
    {
        name: 'Tomorrow',
        to: '/tomorrow',
        icon: tomorrowIc,
    },
    {
        name: 'Week',
        to: '/week',
        icon: weekIc,
    },
];

function Menu({name}) {

    const { width, height } = useWindowDimensions();


    const location = useLocation()

    /*----------Menu--------------------------------------*/
    const buttons = nameButtons.map((note, index) => {
        let elem;

        if (location.pathname === note.to) {
            elem = <Link to={note.to} key={index} className="linkActive">
                {width > 1000 ? note.name : <img src={note.icon} alt="ic" />}
            </Link>
        } else {
            elem = <Link to={note.to} key={index} className="linkNotActive">
                {width > 1000 ? note.name : <img src={note.icon} alt="ic" />}
            </Link>
        }
        return elem;
    })

    return <div className="menu">
        {width > 1000 ? (
        <div className='headerMenu'>
        <h2 className="logo">Weather</h2>
        <hr/>
        <h3>{name}</h3>
    </div>
        ) : ( <></> )}


        <div className='buttonsMenu'>
            {buttons}
        </div>
        {width > 1000 ? <div></div> : <></>}
    </div>
}

export default Menu;