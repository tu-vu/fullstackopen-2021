import React from "react";
import Person from "./Person";

const Persons = ({ filterPersons }) => {
  return (
    <div>
      {filterPersons.map((person) => (
        <Person key={person.name} info={person} />
      ))}
    </div>
  );
};

export default Persons;
