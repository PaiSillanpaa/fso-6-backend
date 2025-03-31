const express = require("express");
const app = express();

app.use(express.json());

let notes = [
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

app.get("/", (request, response) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("fi-FI", {
    timeZone: "Europe/Helsinki",
    dateStyle: "full",
    timeStyle: "long",
  });
  response.send(`
    <p>Phonebook has info for ${notes.length} people</p>
    <p>${formattedDate}</p>
  `);
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const note = {
    id: Math.floor(Math.random() * 10000).toString(), //Satunnainen ID
    name: body.name,
    number: body.number,
  };

  notes = notes.concat(note); // Lisätään uusi muistiinpano taulukkoon
  console.log(note);
  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
