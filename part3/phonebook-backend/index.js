const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
  return String(maxId + 1);
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`
    <p> Phonebook has info for ${persons.length} people </p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const person = persons.find((person) => person.id === id);

  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const names = persons.map((person) => person.name);

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number missing" });
  } else if (names.includes(body.name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
