import { check, validationResult } from "express-validator";
import Tasks from "../db/tasksSchema.js";

export const createTask = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  console.log("REQ BODY", req.body);
  const task = new Tasks(req.body);
  task.save((err, task) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "NOT ABLE TO SAVE TASK IN DB",
      });
    }
    return res.json({
      title: task.title,
      description: task.description,
      userid: task.userid,
    });
  });
};

export const getTasks = (req, res) => {
  console.log("REQ BODY", req.body);
  if (req.body.role === "admin") {
    Tasks.find(function (err, tasks) {
      if (err) {
        console.log(tasks);
        return res.send(err);
      }
      console.log(tasks);
      return res.status(200).json(tasks);
    });
  } else {
    Tasks.find({ userid: req.body.userid }, function (err, tasks) {
      if (err) {
        console.log(tasks);
        return res.send(err);
      }
      console.log(tasks);
      return res.status(200).json(tasks);
    });
  }
};

export const deleteTask = (req, res) => {
  console.log("45");
  console.log(req);
  Tasks.findOneAndDelete({ id: req.body.id }, function (err, deletedTask) {
    if (err) {
      console.log("47err");
      console.log(err);
    } else {
      console.log("51err");
      console.log("Deleted Task : ", deletedTask);
      if (deletedTask !== null) {
        console.log("54err");
        return res.status(200).json({
          message: "Task deleted",
        });
      } else {
        console.log("59err");
        return res.json({
          errorMessage: "No task found for given id",
        });
      }
    }
  });
};

export const editTask = (req, res) => {
  console.log(req.body);
  Tasks.findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        title: req.body.newTaskContent,
        // desciption: req.body.description,
      },
    },
    { new: true },
    (err, updatedTask) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(updatedTask);
      return res.json({
        message: "Task updated",
        updatedtask: { updatedTask },
      });
    }
  );
};
