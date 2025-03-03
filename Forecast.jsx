import React from "react";

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{day.weather[0].main}</p>
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
