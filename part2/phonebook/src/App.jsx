import React, { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPersons, setFilterPersons] = useState(persons);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleDeleteClick = (removedPerson) => {
    if (window.confirm(`Delete ${removedPerson.name} ?`)) {
      personService.remove(removedPerson).then(() => {
        setPersons(
          persons.filter((person) => person.name !== removedPerson.name)
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilterPersons={setFilterPersons} />

      <h2>Add a new</h2>
      <PersonForm
        personsService={personService}
        persons={persons}
        setPersons={setPersons}
      />

      <h2>Numbers</h2>
      <Persons
        handleDeleteClick={handleDeleteClick}
        filterPersons={filterPersons}
      />
    </div>
  );
};

export default App;
