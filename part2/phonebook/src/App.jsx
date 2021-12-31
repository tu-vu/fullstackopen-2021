import React, { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPersons, setFilterPersons] = useState(persons);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (notification) => {
    setNotification({
      status: notification.status,
      message: notification.message,
    });
    setTimeout(() => {
      setNotification({});
    }, 3000);
  };

  const handleDeleteClick = (removedPerson) => {
    if (window.confirm(`Delete ${removedPerson.name} ?`)) {
      personService
        .remove(removedPerson)
        .then(() => {
          setPersons(
            persons.filter((person) => person.name !== removedPerson.name)
          );
          showNotification({
            status: "success",
            message: `Deleted ${removedPerson.name}`,
          });
        })
        .catch((error) => {
          showNotification({
            status: "error",
            message: `Information of ${removedPerson.name} has already been removed from server`,
          });
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />

      <Filter persons={persons} setFilterPersons={setFilterPersons} />

      <h2>Add a new</h2>
      <PersonForm
        personsService={personService}
        persons={persons}
        setPersons={setPersons}
        showNotification={showNotification}
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
