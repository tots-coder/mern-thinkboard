import mongoose from "mongoose";

// 1st step: create a schema
// 2nd step: create model based off of the schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // mongoDB by default will create createdAt, updatedAt
  }
);

const Note = moongose.model("Note", noteSchema);

export default Note;
