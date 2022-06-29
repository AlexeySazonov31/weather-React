import {useState} from 'react';
import React from "react";

import { Link } from 'react-router-dom';



//import BelСities from "./BelСities";

const nameButtons = [ 
    {
        name: 'Now',
        to: '/'
    },
    {
        name: 'Today',
        to: '/today'
    },
    {
        name: 'Tomorrow',
        to: '/tomorrow'
    },
    {
        name: 'Week',
        to: '/week'
    },
];

function SidePanel(){

    const [page, setPage] = useState(0);


/*----SidePanel---------------*/

    const [sidePanelActive, setSidePanelActive] = useState(false);
    let classNameSidePanel, buttonMenuActive;
    if(sidePanelActive){
        classNameSidePanel = 'sidePanel';
        buttonMenuActive = 'ButtonMenuActive';
    } else {
        classNameSidePanel = 'sidePanelHidden';
        buttonMenuActive = 'ButtonMenuHidden';
    }

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
    

/*----------Menu--------------------------------------*/
    const buttons = nameButtons.map( (note, index) => {
        let elem;
        if( index === page ){
            elem = <Link to={note.to} key={index}>
             <button className='menuButtonActive' onClick={() => {setPage(index);setSidePanelActive(false);}}>
                {note.name}
            </button>
            </Link>
        } else {
            elem = <Link to={note.to}>
                <button key={index} className='menuButton' onClick={() => {setPage(index);setSidePanelActive(false);}}>
                {note.name}
            </button>
            </Link>
        }
        return elem;
    } )
// Location  



    return <div className={classNameSidePanel} ref={rootEl}>
        <div className='headerSidePanel'>
            <div className='inlineHeaderPanel'>
                <h2 className="logo">Weather</h2>
            </div>
        </div>

        <div className='buttonsMenu'>
            {buttons}
        </div>

        <div className="sideMap">
        </div>
    </div>
}

export default SidePanel;