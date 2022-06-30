import { useState } from 'react';
import React from "react";

import { Link } from 'react-router-dom';
import useWindowDimensions from './useWindowDimensions';

import NowIc from './images/now.png';
import todayIc from './images/24.png';
import tomorrowIc from './images/tomorrow.png';
import weekIc from './images/week.png';

import searchIc from './images/search.png';


//import BelСities from "./BelСities";

const nameButtons = [
    {
        name: 'Now',
        to: '/',
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

function Menu() {

    const [page, setPage] = useState(0);
    const { width, height } = useWindowDimensions();


    /*
        const rootEl = React.useRef(null);
    
        React.useEffect(() => {
            const onClick = e => {
                if(!rootEl.current.contains(e.target) && !e.target.matches('button[class$="changeLocationButton"]')){
                    setSidePanelActive(false)
                }
            };
            document.addEventListener('click', onClick);
            return () => document.removeEventListener('click', onClick);
        }, []);
        */

    /*----------Menu--------------------------------------*/
    const buttons = nameButtons.map((note, index) => {
        let elem;

        if (index === page) {
            elem = <Link to={note.to} key={index} className="linkActive" onClick={() => { setPage(index) }}>
                {width > 1000 ? note.name : <img src={note.icon} alt="ic" />}
            </Link>
        } else {
            elem = <Link to={note.to} key={index} className="linkNotActive" onClick={() => { setPage(index) }}>
                {width > 1000 ? note.name : <img src={note.icon} alt="ic" />}
            </Link>
        }
        return elem;
    })
    // Location  


    //div className="sidePanel" ref={rootEl}>

    return <div className="menu">
        <div className='headerMenu'>
            <h2 className="logo">{width > 1000 ? 'Weather' : <img src={searchIc} alt="S"/>}</h2>
        </div>

        <div className='buttonsMenu'>
            {buttons}
        </div>
        {width > 1000 ? <div></div> : <></>}
    </div>
}

export default Menu;