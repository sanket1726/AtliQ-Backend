import { check, validationResult } from "express-validator";
import Users from "../db/userSchema.js";

export const login = (req, res) => {
  const errors = validationResult(req);

  console.log("REQ BODY", req.body);
  console.log(req.body.emailId);

  Users.findOne({ emailId: req.body.emailId }, function (err, userData) {
    if (err) {
      console.log("err");
      console.log(err);
      return res.status(401).json({
        errorMessage: "User not registered",
      });
    } else {
      if (userData !== null && req.body.password === userData.password) {
        console.log("Result : ", userData);
        console.log(userData);
        return res.status(200).json({
          userId: userData.id,
          name: userData.name,
          emailId: userData.emailId,
          role: userData.role,
        });
      } else if (userData !== null && req.body.password !== userData.password) {
        return res.status(401).json({
          errorMessage: "Invalid Creds",
        });
      } else {
        return res.status(401).json({
          errorMessage: "User not registered",
        });
      }
    }
  });
};

export const register = (req, res) => {
  const dbUser = req.body;
  console.log("reeeeeqqqq==>", dbUser);
  Users.create(dbUser, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(data);
    }
  });
};
