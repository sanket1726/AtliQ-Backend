import express from "express";
import {check} from 'express-validator'
import {login,register} from "../../controllers/auth.js";
var router = express.Router();

router.post(
  "/login",
  login
);

router.post(
  "/register",
  register
)

export default router;