const express = require("express");
const app = express();
const port = process.env.NOTES_APP_PORT || 8080;

app.use(express.json());

let notes = [
    {
        id: 1,
        note: "Learn JavaScript",
        autor: "John Doe",
        date: "2025-01-15",
        completed: false
    },

  {
    id: 2,
    note: "Learn Express",
    autor: "Jane Doe",
    date: "2025-01-15",
    completed: false,
  },
];

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/notes", (request, response) => {
  response.json(notes);
});

app.get("/notes/:id", (request, response) => {
  const noteId = parseInt(request.params.id);
  const note = notes.find((note) => note.id === noteId);
  if (!note) {
    return response.status(404).send({ message: "Note not found" });
  }

  response.status(200).json(note);
});

app.put("/notes/:id", (request, response) => {
  const noteId = parseInt(request.params.id);
  const { note, autor, date, completed } = request.body;
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex === -1) {
    return response.status(404).send({ message: "Note not found" });
  }
  notes[noteIndex] = {
    id: noteId,
    note: note,
    autor: autor,
    date: date,
    completed: completed,
  };
  response.status(200).json(notes[noteIndex]);
});

app.post("/notes", (request, response) => {
  const { note, autor, date } = request.body;
  const completed = false;
  const newNote = {
    id: notes.length + 1,
    note: note,
    autor: autor,
    date: date,
    completed: completed,
  };
  notes.push(newNote);
  response.status(201).json(newNote);
});

app.delete("/notes/:id", (request, response) => {
  const noteId = parseInt(request.params.id);
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex === -1) {
    return response.status(404).send({ message: "Note not found" });
  }
  notes.splice(noteIndex, 1);
  response.status(200).send({ message: "Note deleted successfully" });
});
