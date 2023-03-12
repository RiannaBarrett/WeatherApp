import React, { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import Descriptions from "./components/Descriptions";
// import SunCycle from "./components/SunCycle";
import "./index.css";

function getWeatherClass(description) {
  switch (description) {
    case "clear sky":
      return "weather-sunny";
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
    case "overcast clouds":
      return "weather-cloudy";
    case "shower rain":
    case "rain":
      return "weather-rainy";
    case "thunderstorm":
      return "weather-thunderstorm";
    case "snow":
      return "weather-snowy";
    case "mist":
      return "weather-misty";
    default:
      return "";
  }
}

function App() {
  const [city, setCity] = useState("York");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [mode, setMode] = useState(
    new Date().getHours() >= 19 || new Date().getHours() < 6 ? "dark" : "light"
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <div className={`app ${getWeatherClass(weather?.description)}`}>
      <div className="background"></div>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="navbar">
             <h3> Weather App</h3>
        </div>
        <br>
             </br>
             <br>
             </br>
             <br></br>
             
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className={`section__temperature `}>
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <div className="section__descriptions">
              <Descriptions weather={weather} units={units} />
            </div>

            {/* <div className="section__sunCycle">
              <SunCycle
                sunrise={weather.sunrise}
                sunset={weather.sunset}
                timezone={weather.timezone}
              />
            </div> */}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
