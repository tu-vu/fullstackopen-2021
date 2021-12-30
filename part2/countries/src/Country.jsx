import React, { useState, useEffect } from "react";
import CountryInfo from "./CountryInfo";
import axios from "axios";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState({});

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [show, country.capital]);

  return (
    <div>
      <p>
        {country.name.common}{" "}
        <button onClick={() => handleClick()}>show</button>
      </p>
      {show && <CountryInfo country={country} weather={weather} />}
    </div>
  );
};

export default Country;
