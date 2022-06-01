import {useState} from 'react';
import React from "react";
import {YMaps, Map} from 'react-yandex-maps';


import BelСities from "./BelСities";

const nameButtons = [ 'Now', 'Today', 'Tomorrow', 'Week'];

function SidePanel({setPage, page, lat, lon, WtNull, setLatLon, wt}){

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
            elem = <button key={index} className='menuButtonActive' onClick={() => {setPage(index);setSidePanelActive(false);}}>
                {note}
            </button>
        } else {
            elem = <button key={index} className='menuButton' onClick={() => {setPage(index);setSidePanelActive(false);}}>
                {note}
            </button>
        }
        return elem;
    } )
/*-----Location--------------------------------*/
    const [changeLocation, setChangeLocation] = useState(false);
    const [valueLocation, setValueLocation] = useState('0');

    const options = BelСities.map( (note, index) => {
        return <option key={index} value={index}>{note.name}</option>
    } )

    let elemLocation;
    if(!changeLocation){
        elemLocation = <button className='changeLocationButton' onClick={() => setChangeLocation(!changeLocation)}>change location</button>
    }else{
        elemLocation = <div className='changeLocationTrue'>
            <select
            value={valueLocation} 
            onChange={(event) => {
                setValueLocation(event.target.value);
                }}>
                {options}
            </select>
            <button
            onClick={() => {
                setLatLon(BelСities[Number(valueLocation)].lat,BelСities[Number(valueLocation)].lon);
                WtNull();
                setChangeLocation(false);
            }}>ok</button>
        </div>
    }

    /*------maps----------------*/
    let maps;
    if(wt){
        maps = <YMaps>
        <Map defaultState={{ center: [lat, lon+0.23], zoom: 9 }} />
    </YMaps>
    }


    return <div className={classNameSidePanel} ref={rootEl}>
        <div className='headerSidePanel'>
            <div className='inlineHeaderPanel'>
                <h2 className="logo">Weather</h2>
                <button className={buttonMenuActive} onClick={() => {setSidePanelActive(!sidePanelActive)}}>&#9776;</button>
            </div>

            {elemLocation}
        </div>

        <div className='buttonsMenu'>
            {buttons}
        </div>

        <div className="sideMap">
            {maps}
        </div>
    </div>
}

export default SidePanel;