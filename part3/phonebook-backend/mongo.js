const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://luizclsoares:${password}@phonebook.kett8.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("Phonebook:");

    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  person.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`);

    mongoose.connection.close();
  });
}
