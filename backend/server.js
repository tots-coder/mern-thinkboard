import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
  // get the notes
  res.status(200).send("you got 5 notes");
});

app.post("/api/note", (req, res) => {
  // create a note
  res.status(201).send("your note has been created successfully");
});

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
