import express from "express";
import {check} from 'express-validator'
// const { check } = require("express-validator");
import {createTask,getTasks,deleteTask,editTask} from "../../controllers/tasksController.js";
var router = express.Router();

router.post(
  "/new",
  [
    check("title")
      .isLength({ min: 3 })
      .withMessage("Pass should be min 3 in length"),
  ],
  createTask
);

router.post(
  "/getTasks",
  getTasks
)

router.delete(
  "/deleteTask",
  deleteTask
)

router.put(
  "/edit",
  editTask
)


export default router;