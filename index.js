import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startTimer } from "./routes/set.start.time.route.js";
import { endTimer } from "./routes/set.end.time.route.js";
import { login } from "./routes/login.route.js";
import { logout } from "./routes/logout.routes.js";
import { add } from "./routes/add.employee.routes.js";
import { getTime } from "./routes/time.stamp.routers.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/start", startTimer);
app.use("/end", endTimer);
app.use("/login", login);
app.use("/logout", logout);
app.use("/add", add);
app.use("/get", getTime);

app.all("*", (req, res, next) => {
  res.status(404).json({
    data: "Not Found this Route",
  });
});

app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    answer: {
      code: err.code || 500,
      data: err.message || "Server error",
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Connected on Port: ${process.env.PORT}`);
});
