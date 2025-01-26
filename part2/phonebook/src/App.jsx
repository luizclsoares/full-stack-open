import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
      alert(`${personObject.name} is already added to phonebook`);
    } else {
      personService.create(personObject).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
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
