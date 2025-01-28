import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
      );

  const addPerson = (e) => {
    e.preventDefault();

    const personsNames = persons.map((person) =>
      person.name.toLowerCase().trim()
    );

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (personsNames.includes(personObject.name.toLowerCase().trim())) {
      const confirm = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        const person = persons.find((p) => p.name === personObject.name);
        const changedPerson = { ...person, number: personObject.number };

        personService
          .update(changedPerson, changedPerson.id)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== changedPerson.id ? p : updatedPerson
              )
            );

            setNotificationMessage(
              `The number of ${updatedPerson.name} was changed successfully`
            );
            setNotificationClass("success");

            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationClass(null);
            }, 5000);
          })
          .catch((error) => {
            setPersons(persons.filter((p) => p.name !== personObject.name));

            setNotificationMessage(
              `Information of ${personObject.name} has already been removed from server`
            );
            setNotificationClass("error");

            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationClass(null);
            }, 5000);
          });
      }
    } else {
      personService.create(personObject).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));

        setNotificationMessage(`Added ${createdPerson.name}`);
        setNotificationClass("success");

        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationClass(null);
        }, 5000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    const confirm = window.confirm(`Delete ${person.name} ?`);

    if (confirm) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const handleNewName = (e) => setNewName(e.target.value);

  const handleNewNumber = (e) => setNewNumber(e.target.value);

  const handleFilter = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        className={notificationClass}
      />
      <Filter value={filter} handleChange={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        handleName={handleNewName}
        number={newNumber}
        handleNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
