import React, { useState } from "react";

const PersonForm = ({
  personsService,
  persons,
  setPersons,
  showNotification,
}) => {
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
    const newPerson = { ...duplicatePerson, name: newName, number: newNumber };

    if (duplicatePerson) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService.update(newPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.name === returnedPerson ? returnedPerson : person
            )
          );
        });
      }
    } else {
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showNotification({
            status: "success",
            message: `Added ${returnedPerson.name}`,
          });
        })
        .catch((error) => {
          showNotification({
            status: "error",
            message: error.response.data.error,
          });
        });
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input id="name" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input id="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
