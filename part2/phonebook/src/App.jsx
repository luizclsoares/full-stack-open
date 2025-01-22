import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const personsNames = persons.map((person) => person.name);

    const personObject = { name: newName };

    if (personsNames.includes(personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }

    setNewName("");
  };

  const handleNewName = (e) => setNewName(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
