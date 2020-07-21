// First import
import React, {useState} from 'react';

// API KEY HERE. MUST BE UNIQUE TO ME AND MY ACCOUNT
const api = {
  key: "1743a7b820524ef215c02272bff8f62f",
  base: "https://api.openweathermap.org/data/2.5/"
}

// BUILD ON TO HERE FOR APP AND RENDERING
function App() {
  //SET STATES AND WEATHER
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
  
  const todayDate = (weather) => {
    
    let date = weather.getDate();
    let forToday = day[weather.getDay()];
    let forMonth = month[weather.getMonth()]
    let forYear = weather.getFullYear();

    return `${forToday}, ${forMonth} ${date} ${forYear}`
  }


  // THIS ALLOWS ME TO SEARCH WEATHER BASED ON LOCATION WITH API KEY
  let search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(r => r.json())
      .then(weatherObj => {
        setWeather(weatherObj);
        setQuery('');
      });
    }
  }


  // HTML AND JSX. 
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App nice' : 'App') : 'App'}>
      <main>
        <div className="search">
          <input type="text" className="search-bar" placeholder="Search" onChange={
            e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="information">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{todayDate(new Date())}</div>
          </div>
            <div className="weather">
              <div className="temperature">{Math.round(weather.main.temp * 1.8 + 32)}° F</div>
              <div className="today-weather">{weather.weather[0].main}</div>
            </div> 
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
