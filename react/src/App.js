import './App.css';
import {useState} from 'react';
//import wtT from './wt';

import SidePanel from './SidePanel';
import BelСities from './BelСities';
import Now from './Now';
import Today from './Today';
import Week from './Week';


function App() {

	const [page, setPage] = useState(0);
	
	const [wt, setWt] = useState(null);
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	


	function setWeather(lat, lon){
		fetch(`/apiWT/${lat}/${lon}`)
		.then(res => res.json())
		.then(result => setWt(result));
	}
	function setLatLon(lat,lon){
		setLat(lat);
		setLon(lon);
	}
	function WtNull(){
		setWt(null);
	}


	let componentWT;

	if(!lat || !lon ){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLat(position.coords.latitude);
				setLon(position.coords.longitude);
				console.log('geolocation ok');
			},
			(error) => {
				console.log(error)
			}
		)
	}

	if(!wt){
		componentWT = <div className="loader"></div>;
		setWeather(lat, lon);
	} else {
		let city;
		for( let objCity of BelСities ){
			if( objCity.lat === lat && objCity.lon === lon ){
				city = objCity.name;
			}
		}
		if(!city){
			city = wt.geo_object.locality.name;
		}
			
			if( page === 0 ){
				componentWT = <Now fact={wt.fact} geo={city} date={wt.forecasts[0].date}/>
			} else if ( page === 1 ){
				componentWT = <Today todayWT={wt.forecasts[0]} date={wt.forecasts[0].date} todayRight={true} city={city}/>
			} else if ( page === 2 ){
				// Tomorrow
				// repeat today, with data for tomorrow
				componentWT = <Today todayWT={wt.forecasts[1]} date={wt.forecasts[1].date} todayRight={false} city={city}/>
			} else if ( page === 3 ){
				componentWT = <Week forecasts={wt.forecasts} yesterday={wt.yesterday} city={city}/>
			}
	}

	let backgroundClass;
	if(wt){
		if( searchWord('clear', wt.fact.condition) ){
			backgroundClass = 'main clear';
		} else if(searchWord('rain', wt.fact.condition) ||
		    searchWord('drizzle', wt.fact.condition) ||
		    searchWord('showers', wt.fact.condition) ||
		    searchWord('hail', wt.fact.condition)){
			    backgroundClass = 'main rain';
	} else if( searchWord('cloudy', wt.fact.condition) ||
			searchWord('overcast', wt.fact.condition)){
				backgroundClass = 'main cloudy';
		} else if( searchWord('snow', wt.fact.condition) ){
			backgroundClass = 'main snow';
		} else if( searchWord('thunderstorm', wt.fact.condition) ){
			backgroundClass = 'main thunderstorm';
		} else {
			backgroundClass = 'main elseBack';
		}
	} else {
		backgroundClass = 'main elseBack';
	}



	return <div className={backgroundClass}>
	<SidePanel setPage={setPage} page={page} lat={lat} lon={lon} WtNull={WtNull} setLatLon={setLatLon}  wt={wt}/>
	{componentWT};
	</div>

}
	
export default App;


function searchWord(condition, str){
	let word = str.split(' ');
	for( let elem of word ){
		for( let subWord of elem.split('-') ){
			if(String(subWord) === condition){
				return true;
			}
		}

	}
	return false;
}

/*
import React from 'react';
import {useState} from 'react';
import reactUuid from 'react-uuid';

function id(){
    return reactUuid();
}
*/















