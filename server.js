// importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tasksRoutes from './routes/tasks/tasks.js'
import authRoutes from './routes/auth/auth.js'

// add app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});


// DB config
const connection_url =
  "this_should_be_your_own_db_string";

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    // console.log(res);
  })
  .catch((err) => {
    // console.log("err ----===>", err);
  });

const db = mongoose.connection;

// API routes
app.get("/", (req, res) =>
  res.status(200).send("Server & service is up using NodeJs, express & mongo")
);

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/tasks", tasksRoutes);

// listen
app.listen(port, () => {
  console.log(`Hi Server running on localhost:${port}`);
});
