import React, { useState, useEffect } from "react";
import Search from "./Search";
import Countries from "./Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Search countries={countries} setFilterCountries={setFilterCountries} />
      <Countries countries={filterCountries} />
    </div>
  );
};

export default App;
