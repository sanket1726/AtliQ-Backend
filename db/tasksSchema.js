import mongoose from "mongoose";

// defining schema
const tasksSchema = mongoose.Schema({
  title: String,
  id: String,
  description: String,
  duedate: String,
  userid: String,
  creationdate: String,
  iscompleted: false,
});

export default mongoose.model("tasks", tasksSchema);
