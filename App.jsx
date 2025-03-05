import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import { FaSun, FaMoon, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "./assets/loading.json";
import "./style.css";



const API_KEY = "ba79bcdab27db624d4e9893715874056"




const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    console.log("API Key Loaded:", API_KEY);
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
          fetchForecast(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported");
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon) => {
    if (!API_KEY) {
      console.error("API Key is missing. Check your .env file.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeatherData({
        city: response.data.name,
        temp: Math.round(response.data.main.temp),
        weather: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
      });
      setCity(response.data.name);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
    setLoading(false);
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setForecast(response.data.list.filter((_, index) => index % 8 === 0));
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  const handleCitySearch = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      fetchWeather(response.data.coord.lat, response.data.coord.lon);
      fetchForecast(response.data.coord.lat, response.data.coord.lon);
    } catch (error) {
      console.error("City not found", error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("light-theme");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <button className="theme-toggle btn" onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
      <button className="location-button btn" onClick={getLocation}>
        <FaMapMarkerAlt /> Use My Location
      </button>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="icon-button" onClick={handleCitySearch}>
          <FaSearch />
        </button>
      </div>
      {loading ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: "200px", width: "200px" }}
        />
      ) : (
        <>
          {weatherData && <WeatherCard {...weatherData} />}
          <Forecast forecast={forecast} />
        </>
      )}
    </div>
  );
};

export default App;
