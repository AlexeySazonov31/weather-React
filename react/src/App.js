import './styles/App.css';
import { useState, useEffect } from 'react';
import wtT from './wt';

import Menu from './Menu';

import Now from './pages/Now';
import Today from './pages/Today';
import Week from './pages/Week';
import NotFound from './pages/NotFound';

import { Routes, Route, Navigate } from 'react-router-dom';


//-----


function App() {


	const [dataWT, setDataWT] = useState(null);
	const [geoData, setGeoData] = useState({ lat: 53.9, lon: 27.5667 });

	const [loading, setLoader] = useState(true);
/*
	useEffect( () => {

	} )
*/
	let city = 'Minsk';

	//console.log(wtT);

	let wt = wtT;

	let backgroundClass;
	if (wt) {
		if (searchWord('clear', wt.fact.condition)) {
			backgroundClass = 'main clear';
		} else if (searchWord('rain', wt.fact.condition) ||
			searchWord('drizzle', wt.fact.condition) ||
			searchWord('showers', wt.fact.condition) ||
			searchWord('hail', wt.fact.condition)) {
			backgroundClass = 'main rain';
		} else if (searchWord('cloudy', wt.fact.condition) ||
			searchWord('overcast', wt.fact.condition)) {
			backgroundClass = 'main cloudy';
		} else if (searchWord('snow', wt.fact.condition)) {
			backgroundClass = 'main snow';
		} else if (searchWord('thunderstorm', wt.fact.condition)) {
			backgroundClass = 'main thunderstorm';
		} else {
			backgroundClass = 'main elseBack';
		}
	} else {
		backgroundClass = 'main elseBack';
	}
	




// !!!!!!!!!!!!!!   <Route path='/tommorow' element={<Today todayWT={wt.forecasts[1]} date={wt.forecasts[1].date} todayRight={false} city={city} />} />

	return <div className={backgroundClass}>
		<Menu/>
		{ loading ? (
			<div className='loader'></div>
		) : (
			<Routes>
			<Route path='/' element={<Now fact={wt.fact} geo={city} date={wt.forecasts[0].date} />} />
			<Route path='/today' element={<Today todayWT={wt.forecasts[0]} date={wt.forecasts[0].date} todayRight={true} city={city} />} />
			<Route path="/week" element={<Week forecasts={wt.forecasts} yesterday={wt.yesterday} city={city} />} />

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















