import React from "react";

const CountryInfo = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>Spoken languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />

      <h3>Weather in {country.capital}</h3>
      <h4>{`temperatures: ${weather.main.temp} Celcius`}</h4>

      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`${country.capital} weather`}
      />
      <h4>{`wind: ${weather.wind.speed} meter/sec ${weather.wind.deg}`}</h4>
    </div>
  );
};

export default CountryInfo;
