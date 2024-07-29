import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import tasksRoute from "./routes/tasks.js";
import rootRoute from "./routes/root.js";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";

const PORT = process.env.PORT;

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser("a-very-very-strong-and-super-secret-secret"))

app.use("/images", express.static('uploads'))

app.use("/", rootRoute);
app.use("/tasks", tasksRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);

app.use(function (req, res, next) {
  console.log(`Incoming HTTP request from ${req.ip}`);
  next();
});

app.use((err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode);
  } else {
    res.status(500);
  }

  res.send(`Err: ${err.message}`);
});

app.listen(PORT, () => {
  console.log(`the server is now running and listening for requests on PORT ${PORT}.
  
GO TO http://localhost:${PORT}`);
});
