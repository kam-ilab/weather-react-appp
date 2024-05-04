import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a city" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      <footer>
        This project was coded by Kamila Baas and is{" "}
        <a
          href="https://github.com/kam-ilab/weather-react-appp"
          target="_blank"
          rel="noreferrer"
        >
          open-sourced on GitHub
        </a>
      </footer>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C </li>
          <li>Description: {weather.description}</li>
          <li>Wind: {weather.wind} km/h </li>
          <li>Humidity: {weather.humidity}% </li>
        </ul>
        <img src={weather.icon} alt={weather.description} />
      </div>
    );
  } else {
    return form;
  }
}
