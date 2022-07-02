import './styles/App.css';
import { useState, useEffect } from 'react';
//import wtT from './wt';

import Menu from './Menu';

import Now from './pages/Now';
import Today from './pages/Today';
import Week from './pages/Week';
import NotFound from './pages/NotFound';
import Geosearch from './pages/Geosearch';

import { Routes, Route, Navigate } from 'react-router-dom';


//-----


function App() {

	const [dataWT, setDataWT] = useState(null);
	const [geoData, setGeoData] = useState({ lat: 53.9, lon: 27.5667, name: 'Minsk' });

	const [loading, setLoading] = useState(true);


	useEffect( () => {
		setLoading(true);
		fetch( `/apiWT/${geoData.lat}/${geoData.lon}` )
	        .then( res => res.json() )
			.then( data => {setDataWT(data);setLoading(false)} )
			.catch( e => console.log(e) )


	}, [geoData] );


	//  background --------------------------------
	let backgroundClass;
	if (dataWT) {
		if (searchWord('clear', dataWT.fact.condition)) {
			backgroundClass = 'main clear';
		} else if (searchWord('rain', dataWT.fact.condition) ||
			searchWord('drizzle', dataWT.fact.condition) ||
			searchWord('showers', dataWT.fact.condition) ||
			searchWord('hail', dataWT.fact.condition)) {
			backgroundClass = 'main rain';
		} else if (searchWord('cloudy', dataWT.fact.condition) ||
			searchWord('overcast', dataWT.fact.condition)) {
			backgroundClass = 'main cloudy';
		} else if (searchWord('snow', dataWT.fact.condition)) {
			backgroundClass = 'main snow';
		} else if (searchWord('thunderstorm', dataWT.fact.condition)) {
			backgroundClass = 'main thunderstorm';
		} else {
			backgroundClass = 'main elseBack';
		}
	} else {
		backgroundClass = 'main elseBack';
	}
//-----------------------------------------------------






	return <div className={backgroundClass}>
		<Menu name={geoData.name}/>
		{ loading ? (
			<div className='loader'></div>
		) : (
			<Routes>
			<Route path='/' element={<Geosearch  setGeoData={setGeoData}/>} />
			<Route path='/now' element={<Now fact={dataWT.fact} geo={geoData.name} date={dataWT.forecasts[0].date} />} />
			<Route path='/today' element={<Today todayWT={dataWT.forecasts[0]} date={dataWT.forecasts[0].date} todayRight={true} city={geoData.name} />} />
			<Route path="/week" element={<Week forecasts={dataWT.forecasts} yesterday={dataWT.yesterday} city={geoData.name} />} />
			<Route path='/tomorrow' element={<Today todayWT={dataWT.forecasts[1]} date={dataWT.forecasts[1].date} todayRight={false} city={geoData.name} />} />
			<Route path='/not-found-404' element={<NotFound />} />
			<Route path='*' element={<Navigate to="/not-found-404" />} />

		</Routes>
		) }
	</div>

}

export default App;


function searchWord(condition, str) {
	let word = str.split(' ');
	for (let elem of word) {
		for (let subWord of elem.split('-')) {
			if (String(subWord) === condition) {
				return true;
			}
		}

	}
	return false;
}















