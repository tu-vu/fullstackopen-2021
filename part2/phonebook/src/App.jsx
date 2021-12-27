import React, { useState } from "react";
import Person from "./Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson) alert(`${newName} is already added to numberbook`);
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
    setNewName("");
  };

  return (
    <div>
      <h2>Numberbook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person info={person} />
      ))}
    </div>
  );
};

export default App;
