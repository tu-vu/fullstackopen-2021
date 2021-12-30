import React, { useState, useEffect } from "react";

const Search = ({ countries, setFilterCountries }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (name) {
      setFilterCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(name.toLowerCase())
        )
      );
    } else {
      setFilterCountries([]);
    }
  }, [name, countries, setFilterCountries]);

  return (
    <div>
      <label htmlFor="name">find countries </label>
      <input id="name" value={name} onChange={handleChange} />
    </div>
  );
};
export default Search;
