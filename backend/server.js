import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
  // get the notes
  res.status(200).send("you got 5 notes");
});

app.post("/api/notes", (req, res) => {
  res.status(201).json({ message: "Note created succesfully!" });
});

app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "Note updated succesfully!" });
});

app.delete("/api/notes", (req, res) => {
  res.status(201).json({ message: "Note deleted succesfully!" });
});

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
