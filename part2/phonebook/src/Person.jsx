import React from "react";

const Person = ({ handleDeleteClick, person }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeleteClick(person)}>delete</button>
    </p>
  );
};

export default Person;
