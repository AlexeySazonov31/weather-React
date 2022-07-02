import { useState, useEffect } from 'react';
import React from "react";
import { Link } from "react-router-dom";


function Geosearch({setGeoData}){

    const [search, setSearch] = useState('');

    const [possOptData, setPossOptData] = useState([]);

    console.log(search);
    console.log(possOptData);

    useEffect( () => {
        if( search.length > 0 ){
            fetch(`http://api.geonames.org/searchJSON?q=${search}&maxRows=6&username=sazonov`)
            .then( res => res.json() )
            .then( data => data.geonames ? setPossOptData(data.geonames) : setPossOptData([]) )
            .catch( (e) => console.log(e) )
        } else {
            setPossOptData([]);
        }
	}, [search] );



    let possibleOptions;
    if( possOptData.length && search.length > 0 ){
        possibleOptions = possOptData.map( (opt, index) => {
            return <li key={index} onClick={() => {
                console.log(opt.name)
                setGeoData({lat: opt.lat, lon: opt.lng, name: opt.name})
            }}>
                <Link to="/now" className='link'>
                <span style={{textAlign: 'left'}}>{opt.name}</span>
                <span>{opt.countryCode}</span>
                </Link>
                </li>
        } );

    } else {
        possibleOptions = <></>;
    }



    return <div className='geosearchCard'>
        <h1>Geosearch</h1>
        <input value={search}  onChange={ (event) => setSearch(event.target.value)} placeholder="location"/>
        <h3>enter the name location and select the desired option</h3>
        <ul>
        {possibleOptions}
        </ul>
    </div>;
}

export default Geosearch;

