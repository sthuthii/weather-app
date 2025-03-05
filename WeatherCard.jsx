import React from "react";
import Lottie from "lottie-react";
import clearAnimation from "./assets/clear_sky.json";
import cloudsAnimation from "./assets/cloudy.json";
import rainAnimation from "./assets/rain.json";
import snowAnimation from "./assets/snow.json";
import thunderstormAnimation from "./assets/thunder.json";
import defaultAnimation from "./assets/clear_sky.json";

const WeatherCard = ({ city, temp, weather, humidity, wind }) => {
  const getAnimation = (weatherType) => {
    switch (weatherType.toLowerCase()) {
      case "clear":
        return clearAnimation;
      case "clouds":
        return cloudsAnimation;
      case "rain":
        return rainAnimation;
      case "snow":
        return snowAnimation;
      case "thunderstorm":
        return thunderstormAnimation;
      default:
        return defaultAnimation;
    }
  };

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <Lottie className= "icon"
        animationData={getAnimation(weather)} 
        style={{ height: 150, width: 150, justifyContent :"center"}} 
      />
      <h1>{temp}°C</h1>
      <h3>{weather}</h3>
      <p>Humidity: {humidity}% | Wind: {wind} km/h</p>
    </div>
  );
};

export default WeatherCard;
