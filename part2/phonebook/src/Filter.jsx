import React, { useState, useEffect } from "react";

const Filter = ({ persons, setFilterPersons }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search.length > 0) {
      setFilterPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilterPersons(persons);
    }
  }, [search, setFilterPersons, persons]);

  return (
    <div>
      <label htmlFor="filter">filter shown with: </label>
      <input id="filter" value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
