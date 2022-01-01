import React from "react";
import Person from "./Person";

const Persons = ({ handleDeleteClick, filterPersons }) => {
  return (
    <div>
      {filterPersons.map((person) => (
        <Person
          handleDeleteClick={handleDeleteClick}
          key={person.id}
          person={person}
        />
      ))}
    </div>
  );
};

export default Persons;
